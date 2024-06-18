<template>
  <div class="list_container">
    <div class="list_content_container" @click="handleToggle">
      <div>이름</div>
      <svg-icon class="chevron" name="chevronRight" />
    </div>
    <div v-if="isToggleOpen" class="list_toggle_box">
      <div class="button">완납 처리</div>
      <div class="button">청구서 재발송</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { formatYearMonthDate } from '@/utils/formatDate';
import { PaymentApi } from '@/api/PaymentApi';
const props = defineProps({
  year: {
    type: Number,
    default: 0,
  },
  month: {
    type: Number,
    default: 0,
  },
});

const paymentListApi = new PaymentApi();

const isToggleOpen = ref(false);

const handleToggle = () => {
  isToggleOpen.value = !isToggleOpen.value;
};
const page = 0;
const fetchData = async () => {
  const date = formatYearMonthDate(props.year, props.month);
  const res = await paymentListApi.getUnpaidList({
    yearMonth: '2023-04',
    page,
    size: 10,
  });

  console.log(res);
};

onMounted(async () => {
  await fetchData();
});
</script>

<style scoped lang="scss">
.list_container {
  display: flex;
  flex-direction: column;

  width: 100%;
  padding: unit(4) unit(14);
  gap: unit(4);
  margin: unit(16) 0;
  font-weight: 600;
  cursor: pointer;
}

.list_container:hover {
  border-radius: 6px;
  background: var(--Gray-Gray-200, #f1f1f1);
}

.list_content_container {
  display: flex;
  flex-direction: row;
}
.list_toggle_box {
  display: flex;
  flex-direction: row;
  gap: unit(11);
  width: 100%;
  justify-content: center;
  padding: unit(7) unit(18);
}
.button {
  width: unit(130);
  height: unit(32);
  border-radius: unit(6);
  background: var(--Primary-Primary, #7535ff);
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-weight: 500;
}
</style>
