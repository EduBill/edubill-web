<template>
  <div class="container">
    <PayManageNav
      :title="'미확인입금내역'"
      :plus-btn="false"
      :click-back-btn="'/payManage'"
    />
    <div class="payment_list_container">
      <div class="payment_detail_container">
        <div
          v-for="(paymentListData, index) in paymentList"
          :key="index"
          class="list_item_container"
        >
          <div class="list-item">
            <div v-if="index === 0" class="date">
              {{
                formatDate(new Date(paymentListData.paidDateTime), 'monthDay')
              }}
            </div>
            <div
              v-else-if="
                index !== 0 &&
                hasDateChanged(
                  paymentListData.paidDateTime,
                  paymentList[index - 1].paidDateTime
                )
              "
              class="date"
            >
              {{
                formatDate(new Date(paymentListData.paidDateTime), 'monthDay')
              }}
            </div>
            <input
              :id="'check-' + index"
              v-model="checkedNames"
              type="checkbox"
              :name="'user' + index"
              :value="'user-' + index"
            />
            <label :for="'check-' + index" class="label">
              <div v-if="checkedNames.includes(('user-' + index) as never)">
                <svg-icon name="checkCircle" />
              </div>
              <div v-else><svg-icon name="circle" /></div>
              <PaymentItem
                :payment-history-id="paymentListData.paymentHistoryId"
                :student-name="paymentListData.studentName"
                :paid-amount="paymentListData.paidAmount"
                :paid-date-time="paymentListData.paidDateTime"
                :handle-click="handleListClick"
              />
            </label>
          </div>
        </div>
      </div>
      <div id="target" className="targetRef"></div>
    </div>

    <div class="button">
      <RectangleTextButton
        text="완납연결"
        is-fulls="true"
        :back-color="checkedNames.length === 0 ? '#D1D3D9' : '#7535FF'"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { PaymentApi, PaymentData } from '@/api/PaymentApi';
import PayManageNav from '@/components/commons/navigation/PayManageNav.vue';
import RectangleTextButton from '@/components/resources/buttons/RectangleTextButton.vue';
import {
  formatYearMonthDate,
  formatTime,
  formatDate,
} from '@/utils/formatDate';
import PaymentItem from '@/components/resources/payment/PaymentItem.vue';
import SvgIcon from '@/plugins/svg-icon/lib/SvgIcon.vue';
import { intersectionObserver } from '@/utils/intersectionObserver';
import { hasDateChanged } from '@/utils/hasDateChanged';

const paymentList = ref<PaymentData[]>([]);
const checkedNames = ref([]);
const router = useRouter();
const yearMonth = router.currentRoute.value.query.yearMonth as string;
const page = ref(0);
const hasMoreData = ref(true);
const paymentListApi = new PaymentApi();

//미확인내역 데이터 불러오기
const fetchData = async () => {
  try {
    const date = yearMonth;
    // const res = await paymentListApi.getUnpaidList({
    //   yearMonth: date,
    //   page: page.value,
    //   size: 10,
    // });
    const res = await paymentListApi.getUnpaidStudents(date);
    console.log('미확인 데이터 확인', res.data.content);
    if (Array.isArray(res.data.content)) {
      if (res.data.content.length === 0) {
        hasMoreData.value = false;
      } else {
        paymentList.value = [...paymentList.value, ...res.data.content];
        page.value++;
      }
    }
  } catch (error) {
    hasMoreData.value = false;
  }
};

//무한스크롤
const observer = intersectionObserver(hasMoreData, page, fetchData);

onMounted(async () => {
  await fetchData();
  const targetElement = document.getElementById('target');
  if (targetElement) {
    observer.observe(targetElement);
  }
});
onUnmounted(() => {
  observer.disconnect();
});

function handleListClick() {}
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100%;
  position: relative;
  padding: unit(20) unit(42);
  font-size: unit(15);
  font-weight: 600;
  gap: unit(20);
}
.date {
  margin: unit(21) 0;
}
.button {
  width: 100%;
  padding: 0 unit(20);
  box-sizing: border-box;
  position: absolute;
  bottom: unit(19);
  left: 0;
  cursor: pointer;
}
.payment_detail_container {
  display: flex;
  flex-direction: column;
  gap: unit(16);
}

.payment_list_container {
  height: calc(100vh - 140px);
  overflow-y: auto;
}
.label {
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  gap: unit(10);
}

input[type='checkbox'] {
  display: none;
  width: unit(20);
  height: unit(20);
  border: unit(1) solid black;
  border-radius: 50%;
}

.checked {
  background-color: lightblue; /* 체크되었을 때 배경색 */
}

.targetRef {
  height: 10px;
}
</style>
