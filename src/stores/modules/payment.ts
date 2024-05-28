import { defineStore } from 'pinia';
import { computed, reactive } from 'vue';

export const usePaymentDateStore = defineStore('paymentDate', () => {
  const date = new Date();

  const state = reactive({
    currentYear: computed(() => date.getFullYear()),
    currentMonth: computed(() => date.getMonth() + 1),
    year: 0,
    month: 0,
  });

  return {
    ...state,
  };
});

export const usePaymentStatusStore = defineStore('paymentStatus', () => {
  const state = reactive({
    paidCount: 0,
    unpaidCount: 0,
    totalPaidAmount: 0,
    totalUnpaidAmount: 0,
    isExcelUploaded: false,
    firstExcelUploaded: false,
  });

  return {
    ...state,
  };
});
