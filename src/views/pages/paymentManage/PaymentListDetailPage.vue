<template>
  <div class="container">
    <PayManageNav />
    <div class="payment_detail_container">
      <div class="amount">+{{ paymentDetailData?.paidAmount }}원</div>
      <div class="row_container">
        <div>거래유형</div>
        <div>{{ paymentDetailData?.paymentTypeDescription }}</div>
      </div>
      <div class="row_container">
        <div>메모</div>
        <div class="memo_button" @click="writeMemo">
          <div
            v-if="paymentDetailData?.memo !== '' && !isClickMemo"
            class="memo_text"
          >
            {{ paymentDetailData?.memo }}
          </div>
          <div v-else-if="!isClickMemo" class="memo_text__color">
            메모 남기기
          </div>
          <div v-else-if="isClickMemo" class="memo_text__color">저장</div>
          <svg-icon class="chevron" name="chevronRight" />
        </div>
      </div>
      <div v-if="paymentDetailData && isClickMemo" class="memo_box">
        <textarea
          v-model="paymentDetailData.memo"
          placeholder="메모를 남겨주세요"
        />
      </div>
      <div class="row_container">
        <div>일시</div>
        <div>{{ paymentDetailData?.depositDate }}</div>
      </div>
    </div>
    <div class="button">
      <RectangleTextButton text="확인" is-fulls="true" back-color="#7535FF" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { onMounted, ref } from 'vue';
import PayManageNav from '@/components/commons/navigation/PayManageNav.vue';
import RectangleTextButton from '@/components/resources/buttons/RectangleTextButton.vue';
import { PaymentDetail, PaymentApi } from '@/api/PaymentApi';
const router = useRouter();
const id = router.currentRoute.value.query.id as string;
const paymentListApi = new PaymentApi();

//수납 내역 데이터를 저장하는 변수
const paymentDetailData = ref<PaymentDetail>();
//메모 클릭 상태
const isClickMemo = ref(false);

const formatDate = originalDate => {
  const year = originalDate?.getFullYear();
  const month = ('0' + (originalDate.getMonth() + 1)).slice(-2);
  const day = ('0' + originalDate.getDate()).slice(-2);
  const hours = ('0' + originalDate.getHours()).slice(-2);
  const minutes = ('0' + originalDate.getMinutes()).slice(-2);

  return `${year}년 ${month}월 ${day}일 ${hours}:${minutes}`;
};
const getPaymentDetail = async () => {
  const res = await paymentListApi.getPaymentDetail(id);
  res.data.depositDate = formatDate(new Date(res.data.depositDate));
  paymentDetailData.value = { ...res.data };
};
onMounted(async () => {
  await getPaymentDetail();
});

const writeMemo = () => {
  isClickMemo.value = !isClickMemo.value;
};
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100%;
  position: relative;
  //justify-content: space-between;
}
.payment_detail_container {
  display: flex;
  flex-direction: column;
  padding: unit(38) unit(42);
  font-size: unit(15);
  font-weight: 600;
  gap: unit(18);
}
.row_container {
  display: flex;
  justify-content: space-between;
}
.amount {
  font-size: unit(26);
  font-weight: 600;
  margin: unit(14) 0;
}
.button {
  width: 100%;
  padding: 0 unit(20);
  position: absolute;
  bottom: unit(19);
}

.memo_button {
  display: flex;
  justify-content: space-between;
  gap: unit(3);
  color: black;
  cursor: pointer;
}
.memo_text {
  max-height: unit(42);
  max-width: unit(134);
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  &__color {
    color: $color-primary;
  }
}

.chevron {
  color: $color-primary;
}
.memo_box {
  width: 100%;
  height: unit(123);
  border-radius: 8px;
  border: 0.5px solid #666;
  padding: unit(12);
  font-size: unit(26);
  font-weight: 600;
  textarea {
    width: 100%;
  }
}
</style>
