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
  };
});
