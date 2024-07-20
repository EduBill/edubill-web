<template>
  <div class="payManage">
    <PayManageNav
      :key="state.navKey"
      :plus-btn="true"
      :year-month="formatYearMonthDate(paymentDate.year, paymentDate.month)"
      :click-back-btn="'/home'"
    />
    <!-- payManage_calendarChart class를 기본 적용,
    isExcelUploaded false이면 blur 추가 적용 -->
    <div
      :class="{
        payManage_calendarChart: true,
        blur: !paymentStatus.isExcelUploaded,
      }"
    >
      <div class="payManage_calendarHeader">
        <PaymentCalendarHeader
          v-if="paymentDate.year != 0"
          @update:calendar-date="changeChart"
        />
      </div>
      <SemiCirclePaymentChart :key="state.chartKey" />
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
        <div class="date">
          {{ paymentDate.year }}년 {{ paymentDate.month }}월
        </div>
        <div class="payManage_listContainer">
          {{ paymentStatus.isExcelUploaded }}
          <!-- <div v-if="!paymentStatus.isExcelUploaded">
            <FileUpload
              :date="formatYearMonthDate(paymentDate.year, paymentDate.month)"
              @update:excel-uploaded="excelUploaded"
            />
          </div> -->
          <!-- <div v-else-if="paymentStatus.isExcelUploaded"> -->
          <div>
            <div v-if="isClickCheckedPaymentList">
              <PaymentListItem
                :key="state.listKey"
                :year="paymentDate.year"
                :month="paymentDate.month"
                :is-excel-uploaded="paymentStatus.isExcelUploaded"
                @update:excel-uploaded="excelUploaded"
              />
            </div>
            <div v-else>
              <UnknownPaymentListItem
                :year="paymentDate.year"
                :month="paymentDate.month"
                :click="isClickCheckedPaymentList"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, reactive, ref, watch } from 'vue';
import PaymentCalendarHeader from '@/components/resources/payment/PaymentCalendarHeader.vue';
import SemiCirclePaymentChart from '@/components/resources/payment/SemiCirclePaymentChart.vue';
import { PaymentApi } from '@/api/PaymentApi';
import { ExcelApi } from '@/api/ExcelApi';
import PayManageNav from '@/components/commons/navigation/PayManageNav.vue';
import ToggleMenu from '@/components/resources/payment/ToggleMenu.vue';
import PaymentListItem from '@/components/resources/payment/PaymentListItem.vue';
import UnknownPaymentListItem from '@/components/resources/payment/unknownPaymentListItem.vue';
import { formatYearMonthDate } from '@/utils/formatDate';
import FileUpload from '@/components/resources/payment/FileUpload.vue';
import {
  usePaymentDateStore,
  usePaymentStatusStore,
} from '@/stores/modules/payment';
const paymentDate = usePaymentDateStore();
const paymentStatus = usePaymentStatusStore();

const state = reactive({
  chartKey: 0,
  listKey: 0,
  // 처음으로 엑셀 Upload시 PayManageNav의 + 아이콘에
  // 툴팁을 띄울 수 있도록 하는 navKey
  navKey: 0,
  paidCount: 28,
  unpaidCount: 12,
  totalPaidAmount: 0,
  totalUnpaidAmount: 0,
  formattedDate: '',
});

// API 호출로 얻은 데이터를 저장할 const
const savedPaymentStatusData = new Map();

const excelApi = new ExcelApi();
const paymentApi = new PaymentApi();
//토글의 상태값 컨트롤
const isClickCheckedPaymentList = ref(true);
onMounted(() => {
  getPaymentStatus();
});

async function getPaymentStatus() {
  // 현재 날짜 전달하여 납부 현황 가져오기
  if (state.formattedDate !== '') {
    const res = await paymentApi.getPaymentStatus(state.formattedDate);
    paymentStatus.isExcelUploaded = res.data.isExcelUploaded;
    if (paymentStatus.isExcelUploaded) {
      state.paidCount = res.data.paidCount;
      state.unpaidCount = res.data.unpaidCount;
      state.totalPaidAmount = res.data.totalPaidAmount;
      state.totalUnpaidAmount = res.data.totalUnpaidAmount;

      // chart 리렌더링
      state.chartKey += 1;

      // 데이터 저장
      savePaymentStatusData(state.formattedDate);
    }
  }
  // list 리렌더링
  state.listKey++;
}

function changeChart({ year, month }) {
  console.log('chart change 시작');

  paymentDate.year = year;
  paymentDate.month = month;
  state.formattedDate = formatYearMonthDate(
    paymentDate.year,
    paymentDate.month
  );
  // 저장된 데이터가 있는지 찾기
  const savedData = savedPaymentStatusData.get(state.formattedDate);
  if (savedData) {
    console.log('저장된 차트 데이터 출력');
    state.paidCount = savedData.paidCount;
    state.unpaidCount = savedData.unpaidCount;
    state.totalPaidAmount = savedData.totalPaidAmount;
    state.totalUnpaidAmount = savedData.totalUnpaidAmount;
    paymentStatus.isExcelUploaded = savedData.isExcelUploaded;

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
    paidCount: state.paidCount,
    unpaidCount: state.unpaidCount,
    totalPaidAmount: state.totalPaidAmount,
    totalUnpaidAmount: state.totalUnpaidAmount,
    isExcelUploaded: paymentStatus.isExcelUploaded,
  });
}

async function excelUploaded() {
  await excelApi.updateIsExcelUploaded(state.formattedDate);
  // isExcelUploaded = true 코드는 getPaymentStatus 내부에 존재
  state.navKey++;
  getPaymentStatus(); // 납부 현황 가져와서 chart, list 리렌더링
}

// firstExcelUploaded 상태 변화를 감지
watch(
  () => paymentStatus.firstExcelUploaded,
  async newValue => {
    if (newValue) {
      await excelUploaded();
    }
  }
);

const handleToggle = (value: boolean) => {
  isClickCheckedPaymentList.value = value;
};
</script>

<style lang="scss" scoped>
.payManage {
  padding: unit(20);
  height: 100vh;

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
  &_listContainer {
    height: unit(338);
    overflow: scroll;
    margin-top: unit(10);
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
