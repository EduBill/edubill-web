<!-- eslint-disable vue/no-parsing-error -->
<template>
  <section class="payManage">
    <PayManageNav
      :key="state.navKey"
      :plus-btn="true"
      :year-month="formatYearMonthDate(paymentDate.year, paymentDate.month)"
      :click-back-btn="'Home'"
    />
    <CalendarChartComponent
      :payment-date="paymentDate"
      :payment-status="paymentStatus"
      :chart-key="state.chartKey"
    />
    <!-- 수납내역/미확인내역 리스트 -->
    <section class="payManage_list">
      <header class="payManage_listHeader">
        <ToggleMenu
          :is-click-left="isClickCheckedPaymentList"
          @update:is-click-left="handleToggle"
        />
      </header>
      <article class="payManage_listContent">
        <div class="date">
          {{ paymentDate.year }}년 {{ paymentDate.month }}월
        </div>
        <PaymentContentComponent
          :is-click-checked-payment-list="isClickCheckedPaymentList"
          :list-key="state.listKey"
        />
      </article>
    </section>
  </section>
</template>

<script lang="ts" setup>
import { onMounted, reactive, ref, watch } from 'vue';
import {
  usePaymentDateStore,
  usePaymentStatusStore,
} from '@/stores/modules/payment';
import CalendarChartComponent from '@/components/resources/payment/calendarChart/CalendarChartComponent.vue';
import { PaymentApi } from '@/api/PaymentApi';
import { ExcelApi } from '@/api/ExcelApi';
import PayManageNav from '@/components/commons/navigation/PayManageNav.vue';
import ToggleMenu from '@/components/resources/payment/ToggleMenu.vue';
import { formatYearMonthDate } from '@/utils/formatDate';
import PaymentContentComponent from '@/components/resources/payment/paymentContent/PaymentContentComponent.vue';

const paymentDate = usePaymentDateStore();
const paymentStatus = usePaymentStatusStore();
const excelApi = new ExcelApi();
const state = reactive({
  chartKey: 0,
  listKey: 0,
  // 처음으로 엑셀 Upload시 PayManageNav의 + 아이콘에
  // 툴팁을 띄울 수 있도록 하는 navKey
  navKey: 0,
  formattedDate: '',
});

const paymentApi = new PaymentApi();
//토글의 상태값 컨트롤
const isClickCheckedPaymentList = ref(true);
onMounted(() => {
  setFormattedDate();
  getPaymentStatus();
  checkFirstUploadedState();
});

function setFormattedDate() {
  state.formattedDate = formatYearMonthDate(
    paymentDate.year,
    paymentDate.month
  );
}
function setFirstExcelUploaded(state) {
  paymentStatus.setFirstExcelUploaded(state);
}
async function checkFirstUploadedState() {
  const firstUploadedState = await excelApi.getFirstExcelUploadedState();
  console.log('first', firstUploadedState);
  setFirstExcelUploaded(firstUploadedState);
  //firstUploadedState값을 받아서 paymentStatus.setFirstExcelUploaded(firstUploadedState);
}
async function getPaymentStatus() {
  // 현재 날짜 전달하여 납부 현황 가져오기
  if (state.formattedDate !== '') {
    const res = await paymentApi.getPaymentStatus(state.formattedDate);
    paymentStatus.isExcelUploaded = res.data.isExcelUploaded;
    paymentStatus.paidCount = res.data.paidCount;
    paymentStatus.unpaidCount = res.data.unpaidCount;
    paymentStatus.totalPaidAmount = res.data.totalPaidAmount;
    paymentStatus.totalUnpaidAmount = res.data.totalUnpaidAmount;
    // chart 리렌더링
    state.chartKey += 1;
  }
  // list 리렌더링
  state.listKey++;
}

watch(
  () => [paymentDate.year, paymentDate.month], // paymentDate의 year, month 값을 감시
  async (newValue, oldValue) => {
    if (newValue !== oldValue) {
      setFormattedDate();
      await getPaymentStatus(); // paymentDate 변경 시 getPaymentStatus 호출
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

  &_list {
    margin-top: unit(20);
  }
  &_listContent {
    padding: unit(17);
    gap: unit(4);
    margin: unit(16) 0;
  }
}

.date {
  font-size: unit(14);
  font-weight: 500;
}
</style>
