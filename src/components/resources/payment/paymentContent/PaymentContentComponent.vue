<template>
  <div class="payManage_listContainer">
    <div v-if="!paymentStatus.isExcelUploaded">
      <FileUpload
        :date="formatYearMonthDate(paymentDate.year, paymentDate.month)"
      />
    </div>
    <div v-else-if="paymentStatus.isExcelUploaded">
      <div>
        <div v-if="props.isClickCheckedPaymentList">
          <PaymentListItem
            :key="props.listKey"
            :year="paymentDate.year"
            :month="paymentDate.month"
          />
        </div>
        <div v-else>
          <UnknownPaymentListItem :click="props.isClickCheckedPaymentList" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import PaymentListItem from './PaymentListItem.vue';
import UnknownPaymentListItem from './unknownPaymentListItem.vue';
import FileUpload from './FileUpload.vue';
import {
  usePaymentDateStore,
  usePaymentStatusStore,
} from '@/stores/modules/payment';
import { formatYearMonthDate } from '@/utils/formatDate';
const paymentDate = usePaymentDateStore();
const paymentStatus = usePaymentStatusStore();

const props = defineProps({
  isClickCheckedPaymentList: {
    type: Boolean,
    default: true,
  },
  listKey: {
    type: Number,
    default: 10,
  },
});
</script>

<style lang="scss" scoped>
.payManage {
  &_listContainer {
    height: unit(338);
    overflow: scroll;
    margin-top: unit(10);
  }
}
</style>
