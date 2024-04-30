<template>
  <div class="payChartLabel">
    <div class="payChartLabel_header">
      <svg-icon class="icon" :name="ellipseName" />
      <p>{{ title }}({{ dataNum }}건)</p>
    </div>
    <p class="payChartLabel_content">{{ amount.toLocaleString() }}원</p>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps({
  ellipseName: String,
  title: String,
  dataNum: {
    type: Number,
    default: 0,
  },
  amount: {
    type: Number,
    default: 0,
  },
});
</script>

<style lang="scss" scoped>
.payChartLabel {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  font-style: normal;
  font-size: unit(15);
  line-height: 140%;
  color: var(--Gray-Gray-900, #19171a);
  margin-bottom: unit(8);

  &_header {
    display: flex;
    flex-direction: row;
    align-items: center;
    font-weight: 400;

    .icon {
      width: unit(10);
      height: unit(10);
      margin-right: unit(6);
    }
  }

  &_content {
    font-weight: 600;
  }
}
</style>
