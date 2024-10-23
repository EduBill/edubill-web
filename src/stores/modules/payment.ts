import { defineStore } from 'pinia';
import { computed, reactive, ref } from 'vue';

export const usePaymentDateStore = defineStore('paymentDate', () => {
  const date = new Date();
  const state = reactive({
    currentYear: computed(() => date.getFullYear()),
    currentMonth: computed(() => date.getMonth() + 1),
    year: computed(() => date.getFullYear()),
    month: computed(() => date.getMonth() + 1),
  });

  return {
    ...state,
  };
});

export const usePaymentStatusStore = defineStore('paymentStatus', () => {
  const isExcelUploaded = ref();
  const firstExcelUploaded = ref();
  const paidData = reactive({
    paidCount: 0,
    unpaidCount: 0,
    uncheckedCount: 0,
    totalPaidAmount: 0,
    totalUnpaidAmount: 0,
    totalUnCheckedAmount: 0,
    currentUserInfo: { name: '', id: 0 },
  });

  function setExcelUploaded(status: boolean) {
    isExcelUploaded.value = status;
  }

  function setFirstExcelUploaded(status: boolean) {
    firstExcelUploaded.value = status;
  }

  return {
    isExcelUploaded,
    firstExcelUploaded,
    setExcelUploaded,
    setFirstExcelUploaded,
    ...paidData,
  };
});
