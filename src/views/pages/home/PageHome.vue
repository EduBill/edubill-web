<template>
  <div class="page">
    <!-- <slot></slot> -->
    <ToggleMenu/>
    <PaymentListItem/>
  </div>
</template>

<script lang="ts" setup>
import PaymentListItem from '@/components/resources/payment/PaymentListItem.vue';
import ToggleMenu from '@/components/resources/payment/ToggleMenu.vue';
</script>

<style lang="scss">

</style>
