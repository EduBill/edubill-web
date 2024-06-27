<template>
  <div class="list_container">
    <div
      v-for="(paymentListData, index) in paymentList"
      :key="index"
      className="list_item_container"
    >
      <div class="list_content_box" @click="handleToggle(index)">
        <div>{{ paymentListData.studentName }}</div>
        <svg-icon class="chevron" name="chevronRight" />
      </div>
      <div v-if="isToggleOpen[index]" class="list_toggle_box">
        <div class="button" @click="navigateToUnknownList">완납 처리</div>
        <div class="button">청구서 재발송</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import { formatYearMonthDate } from '@/utils/formatDate';
import { PaymentApi, PaymentData } from '@/api/PaymentApi';
import router from '@/router';
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
const paymentList = ref<PaymentData[]>([]);
const isToggleOpen = ref<boolean[]>([]);

const handleToggle = index => {
  isToggleOpen.value[index] = !isToggleOpen.value[index];
};
const page = 0;
const date = formatYearMonthDate(props.year, props.month);
const fetchData = async () => {
  const res = await paymentListApi.getUnpaidList({
    yearMonth: date,
    page,
    size: 10,
  });

  if (Array.isArray(res.data.content)) {
    if (res.data.content.length === 0) {
      console.log('데이터가없습니다.');
    }
    paymentList.value = [...res.data.content];
  }
  isToggleOpen.value = new Array(paymentList.value.length).fill(false);
  console.log(res);
};

onMounted(async () => {
  await fetchData();
});

function navigateToUnknownList() {
  router.push(`/payManage/unknownList?yearMonth=${date}`);
}
</script>

<style scoped lang="scss">
.list_container {
  display: flex;
  flex-direction: column;
  //margin: unit(16) 0;
  gap: unit(16);
  height: 100%;
}
.list_item_container {
  width: 100%;
  padding: unit(4) unit(14);
  gap: unit(4);

  font-weight: 600;
  cursor: pointer;
}
.list_item_container:hover {
  border-radius: 6px;
  background: var(--Gray-Gray-200, #f1f1f1);
}

.list_content_box {
  display: flex;
  flex-direction: row;
}
.list_toggle_box {
  display: flex;
  flex-direction: row;
  gap: unit(11);
  width: 100%;
  justify-content: center;
  padding-top: unit(16);
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
