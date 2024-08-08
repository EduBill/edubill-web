<template>
  <div class="list" @click?="props.handleClick">
    <div class="row_container">
      <div>{{ props.studentName }}</div>
      <div>+{{ props.paidAmount }}</div>
    </div>
    <div class="timestamp">{{ formatTime(new Date(props.paidDateTime)) }}</div>
  </div>
</template>

<script setup lang="ts">
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
  handleClick: {
    type: MouseEvent,
    default: null,
  },
});
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
