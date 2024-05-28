<template>
  <div class="payManage">
    <PayManageNav
      :key="state.navKey"
      :first-excel-uploaded="state.firstExcelUploaded"
    />
    <!-- payManage_calendarChart class를 기본 적용,
    isExcelUploaded false이면 blur 추가 적용 -->
    <div
      :class="{
        payManage_calendarChart: true,
        blur: !paymentStatusStore.isExcelUploaded,
      }"
    >
      <div class="payManage_calendarHeader">
        <PaymentCalendarHeader
          v-if="state.year != 0"
          :current-year="state.year"
          :current-month="state.month"
          @update:calendar-date="changeChart"
        />
      </div>
      <SemiCirclePaymentChart
        :key="state.chartKey"
        :paid-count="paymentStatusStore.paidCount"
        :unpaid-count="paymentStatusStore.unpaidCount"
        :total-paid-amount="paymentStatusStore.totalPaidAmount"
        :total-unpaid-amount="paymentStatusStore.totalUnpaidAmount"
      />
    </div>
    <!-- 수납내역/미확인내역 리스트 -->
    <div class="payManage_list">
      <div class="payManage_listHeader">
        <ToggleMenu
          :is-click-left="isClickCheckedPaymentList"
          @update:is-click-left="handleToggle"
        />
      </div>
      <div class="payManage_listContent">
        <div class="date">{{ state.year }}년 {{ state.month }}월</div>
        <div v-if="isClickCheckedPaymentList">
          <PaymentListItem
            :key="state.listKey"
            :year="state.year"
            :month="state.month"
            :is-excel-uploaded="paymentStatusStore.isExcelUploaded"
            @update:excel-uploaded="excelUploaded"
          />
        </div>
        <div v-else>
          <UnknownPaymentListItem />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, reactive, ref } from 'vue';
import PaymentCalendarHeader from '@/components/resources/payment/PaymentCalendarHeader.vue';
import SemiCirclePaymentChart from '@/components/resources/payment/SemiCirclePaymentChart.vue';
import { PaymentApi } from '@/api/PaymentApi';
import { ExcelApi } from '@/api/ExcelApi';
import PayManageNav from '@/components/commons/navigation/PayManageNav.vue';
import ToggleMenu from '@/components/resources/payment/ToggleMenu.vue';
import PaymentListItem from '@/components/resources/payment/PaymentListItem.vue';
import UnknownPaymentListItem from '@/components/resources/payment/unknownPaymentListItem.vue';
import { useFormatDate } from '@/composable/formatDate';

import { usePaymentStatusStore } from '@/stores/modules/payment';
const paymentStatusStore = usePaymentStatusStore();

const state = reactive({
  year: 0,
  month: 0,
  chartKey: 0,
  listKey: 0,
  // 처음으로 엑셀 Upload시 PayManageNav의 + 아이콘에
  // 툴팁을 띄울 수 있도록 하는 navKey, firstExcelUploaded
  navKey: 0,
  firstExcelUploaded: false,
});

// API 호출로 얻은 데이터를 저장할 const
const savedPaymentStatusData = new Map();

const excelApi = new ExcelApi();
const paymentApi = new PaymentApi();

onMounted(() => {
  setCurrentDate();
  getPaymentStatus();
});

const setCurrentDate = () => {
  // 현재 날짜 가져오기
  const date = new Date();
  state.year = date.getFullYear();
  state.month = date.getMonth() + 1;
};

async function getPaymentStatus() {
  // 현재 날짜를 YYYY-MM 형태로 만듦
  const date = useFormatDate(state.year, state.month);

  // 현재 날짜 전달하여 납부 현황 가져오기
  const res = await paymentApi.getPaymentStatus(date);
  paymentStatusStore.isExcelUploaded = res.data.isExcelUploaded;
  if (paymentStatusStore.isExcelUploaded) {
    paymentStatusStore.paidCount = res.data.paidCount;
    paymentStatusStore.unpaidCount = res.data.unpaidCount;
    paymentStatusStore.totalPaidAmount = res.data.totalPaidAmount;
    paymentStatusStore.totalUnpaidAmount = res.data.totalUnpaidAmount;

    // chart 리렌더링
    state.chartKey += 1;

    // 데이터 저장
    savePaymentStatusData(date);
  }
  // list 리렌더링
  state.listKey++;
}

function changeChart({ year, month }) {
  console.log('chart change 시작');

  state.year = year;
  state.month = month;
  const date = useFormatDate(state.year, state.month);
  // 저장된 데이터가 있는지 찾기
  const savedData = savedPaymentStatusData.get(date);
  if (savedData) {
    console.log('저장된 차트 데이터 출력');
    paymentStatusStore.paidCount = savedData.paidCount;
    paymentStatusStore.unpaidCount = savedData.unpaidCount;
    paymentStatusStore.totalPaidAmount = savedData.totalPaidAmount;
    paymentStatusStore.totalUnpaidAmount = savedData.totalUnpaidAmount;
    paymentStatusStore.isExcelUploaded = savedData.isExcelUploaded;

    // chart, list 리렌더링
    state.chartKey += 1;
    state.listKey++;
  } else {
    console.log('저장된 차트 데이터 없음');
    getPaymentStatus();
  }
}

function savePaymentStatusData(date: string) {
  const key = date;
  // date를 key로 하여 payment status 데이터 저장
  savedPaymentStatusData.set(key, {
    paidCount: paymentStatusStore.paidCount,
    unpaidCount: paymentStatusStore.unpaidCount,
    totalPaidAmount: paymentStatusStore.totalPaidAmount,
    totalUnpaidAmount: paymentStatusStore.totalUnpaidAmount,
    isExcelUploaded: paymentStatusStore.isExcelUploaded,
  });
  // 저장된 데이터를 순회하여 콘솔에 출력
  console.log('데이터 저장됨: ');
  savedPaymentStatusData.forEach((value, key) => {
    console.log(`Date: ${key}, 저장된 차트, 수납리스트 데이터:`, value);
  });
}

async function excelUploaded() {
  console.log('pagePayManagement에 반영 - 엑셀 업로드되었습니다.');
  await excelApi.updateIsExcelUploaded(useFormatDate(state.year, state.month));
  // isExcelUploaded = true 코드는 getPaymentStatus 내부에 존재
  state.firstExcelUploaded = true;
  state.navKey++;
  getPaymentStatus(); // 납부 현황 가져와서 chart, list 리렌더링
}

//토글의 상태값 컨트롤
const isClickCheckedPaymentList = ref(true);

const handleToggle = (value: boolean) => {
  isClickCheckedPaymentList.value = value;
};
</script>

<style lang="scss" scoped>
.payManage {
  padding: unit(20);

  &_calendarChart {
    border-radius: 10px;
    background: var(--White, #fff);
    box-shadow: 0px 0px 16px 0px rgba(0, 0, 0, 0.1);
    padding-left: unit(24);
    padding-right: unit(24);
    padding-bottom: unit(16);
    padding-top: unit(23);
    margin-top: unit(16);
  }

  &_calendarHeader {
    margin-bottom: unit(13);
  }

  &_list {
    margin-top: unit(20);
  }
  &_listContent {
    padding: unit(17);
    gap: unit(4);
    margin: unit(16) 0;
  }
}
.blur {
  background: rgba(217, 217, 217, 0.3);
  filter: blur(5px);
  // pointer-events: none;
}

.date {
  font-size: unit(14);
  font-weight: 500;
}
</style>
