<template>
  <div class="container">
    <PayManageNav :title="'미확인입금내역'" :plus-btn="false" />
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
                isDifferentDate(
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
              <!-- 라벨 안에 텍스트를 div로 감싸서 정리 -->
              <div v-if="checkedNames.includes(('user-' + index) as never)">
                <svg-icon name="checkCircle" />
              </div>
              <div v-else><svg-icon name="circle" /></div>
              <PaymentItem
                :payment-history-id="paymentListData.paymentHistoryId"
                :student-name="paymentListData.studentName"
                :paid-amount="paymentListData.paidAmount"
                :paid-date-time="
                  formatTime(new Date(paymentListData.paidDateTime))
                "
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
import InfiniteScroll from 'infinite-loading-vue3-ts';
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

const paymentList = ref<PaymentData[]>([]);
const checkedNames = ref([]);

//무한스크롤
const page = ref(0);
const hasMoreData = ref(true);
const paymentListApi = new PaymentApi();
const fetchData = async () => {
  try {
    console.log('fetchData', page.value);
    const date = formatYearMonthDate('2024', '3');
    const res = await paymentListApi.getUnpaidList({
      yearMonth: date,
      page: page.value,
      size: 5,
    });
    if (Array.isArray(res.data.content)) {
      console.log(page.value, '데이터 들어옴');
      if (res.data.content.length === 0) {
        console.log('데이터가없습니다.');
        hasMoreData.value = false;
      } else {
        console.log('데이터 있음 ');
        paymentList.value = [...paymentList.value, ...res.data.content];
        page.value++;
      }
    }
  } catch (error) {
    console.error('데이터 불러오는 중 오류 발생', error);
    hasMoreData.value = false;
  }
};
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
function isDifferentDate(
  currentDate: string,
  prevDate: string | null
): boolean {
  if (prevDate === null) {
    return false;
  }
  const current = formatDate(new Date(currentDate), 'monthDay');
  const prev = formatDate(new Date(prevDate), 'monthDay');
  if (current === prev) {
    return false;
  } else {
    return true;
  }
}
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
