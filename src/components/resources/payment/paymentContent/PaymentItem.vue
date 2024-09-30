<template>
  <div
    class="list"
    @click="
      isClickDetail
        ? router.push(`/payManage/payDetail?id=${props.paymentHistoryId}`)
        : ''
    "
  >
    <div class="row_container">
      <div>{{ props.studentName }}</div>
      <div>+{{ props.paidAmount }}</div>
    </div>
    <div class="timestamp">{{ formatTime(new Date(props.paidDateTime)) }}</div>
  </div>
</template>

<script setup lang="ts">
import router from '@/router';
import { formatTime } from '@/utils/formatDate';
const props = defineProps({
  studentName: {
    type: String,
    default: '',
  },
  paymentHistoryId: {
    type: Number,
    default: 0,
  },
  paidAmount: {
    type: Number,
    default: 0,
  },
  paidDateTime: {
    type: String,
    default: '',
  },
  isClickDetail: {
    type: Boolean,
    default: false,
  },
});

function handleItemClick() {
  console.log('상세페이지로 넘어갑니다');
  router.push(`/payManage/payDetail?id=${props.paymentHistoryId}`);
}
</script>

<style scoped lang="scss">
.list {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: unit(4);
}
.row_container {
  display: flex;
  justify-content: space-between;
  font-size: unit(18);
  font-weight: 600;
}
.timestamp {
  font-size: unit(14);
  font-weight: 500;
}
</style>
