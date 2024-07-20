<template>
  <div class="container">
    <PayManageNav
      :title="paymentDetailData?.depositorName"
      :plus-btn="false"
      :click-back-btn="'/payManage'"
    />
    <div class="payment_detail_container">
      <input
        v-if="paymentDetailData"
        v-model="paymentDetailData.memo"
        class="memo_box"
        placeholder="메모입력(최대 20글자)"
      />
      <div class="payment_info_container">
        <div class="row_container">
          <div class="category">일시</div>
          <div class="content">{{ paymentDetailData?.depositDate }}</div>
        </div>
        <div class="row_container">
          <div class="category">거래유형</div>
          <div class="content">
            {{ paymentDetailData?.paymentTypeDescription }}
          </div>
        </div>
        <div class="row_container">
          <div class="category">거래금액</div>
          <div class="content paid_amount">
            {{ paymentDetailData?.paidAmount }}원
          </div>
        </div>
      </div>
      <div class="search_container">
        <div>'{{ paymentDetailData?.depositorName }}' 검색하기</div>
        <svg-icon name="chevronRight"></svg-icon>
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

//상세 정보 받아오는 함수
const getPaymentDetail = async () => {
  try {
    const res = await paymentListApi.getPaymentDetail(id);
    res.data.depositDate = formatFullDate(new Date(res.data.depositDate));
    paymentDetailData.value = { ...res.data };
  } catch {
    paymentDetailData.value = {
      depositorName: 'dummyuser',
      paidAmount: 20000,
      paymentTypeDescription: 'payment type',
      memo: 'memo',
      depositDate: '2024-07-08',
    };
  }
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
  padding: unit(20) unit(20);
  font-size: unit(15);
  font-weight: 600;
  gap: unit(18);
}

.payment_info_container {
  display: flex;
  flex-direction: column;
  gap: unit(8);
  border-top: unit(1) solid #f1f1f1;
  border-bottom: unit(1) solid #f1f1f1;
  padding: unit(16) 0;
  font-size: 15px;
  font-weight: 400;

  .category {
    color: #737373;
  }
  .content {
    color: #000;
  }
  .paid_amount {
    color: #7535ff;
    font-weight: 600;
  }
}
.row_container {
  display: flex;
  justify-content: space-between;
}

.search_container {
  display: flex;
  justify-content: space-between;
  text-decoration: underline;
  color: #737373;
  font-weight: 400;
}

.button {
  width: 100%;
  padding: 0 unit(20);
  box-sizing: border-box;
  position: absolute;
  bottom: unit(19);
  left: 0;
}

.chevron {
  color: #737373;
}
.memo_box {
  width: 100%;
  border-radius: unit(10);
  border: unit(1) solid #f1f1f1;
  padding: unit(15) unit(20);
  font-size: unit(15);
  font-weight: 600;
  textarea {
    width: 100%;
  }
}
</style>
