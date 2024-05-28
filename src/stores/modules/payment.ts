import { defineStore } from 'pinia';
import { reactive } from 'vue';

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
