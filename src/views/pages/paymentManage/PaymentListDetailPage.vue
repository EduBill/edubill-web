<template>
  <div class="container">
    <PayManageNav :title="paymentDetailData?.depositorName" :plus-btn="false" />
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
          <div
            v-else-if="isClickMemo"
            class="memo_text__color"
            @click="editMemo"
          >
            저장
          </div>
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
import { formatFullDate } from '@/utils/formatDate';
const router = useRouter();
const id = router.currentRoute.value.query.id as string;
const paymentListApi = new PaymentApi();

//수납 내역 데이터를 저장하는 변수
const paymentDetailData = ref<PaymentDetail>();
//메모 클릭 상태
const isClickMemo = ref(false);

//상세 정보 받아오는 함수
const getPaymentDetail = async () => {
  const res = await paymentListApi.getPaymentDetail(id);
  res.data.depositDate = formatFullDate(new Date(res.data.depositDate));
  paymentDetailData.value = { ...res.data };
};

//메모 수정
const editMemo = async () => {
  if (paymentDetailData.value?.memo) {
    console.log('메모가 수정됨', id, paymentDetailData.value.memo);
    await paymentListApi.putMemo(Number(id), paymentDetailData.value.memo);
  } else {
    alert('수정된 내용이 없습니다.');
  }
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
  padding: unit(20);
  //justify-content: space-between;
}
.payment_detail_container {
  display: flex;
  flex-direction: column;
  padding: 0 unit(42);
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
  box-sizing: border-box;
  position: absolute;
  bottom: unit(19);
  left: 0;
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
