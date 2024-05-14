<template>
  <div class="bottomTooltip">{{ content }}</div>
</template>

<script lang="ts" setup>
const props = defineProps({
  content: String,
});
</script>

<style lang="scss" scoped>
.bottomTooltip {
  z-index: 20;
  text-align: center;
  color: #fff;
  font-family: Pretendard;
  font-size: 15px;
  font-style: normal;
  font-weight: 600;
  line-height: 140%;
  border-radius: 6px;
  background: var(--Primary-Primary, #7535ff);
  padding: unit(9) unit(14);
  width: max-content;
  position: relative;
}
// 화살표 모양을 만드는 코드
.bottomTooltip::after {
  content: '';
  position: absolute;
  border-bottom: unit(7) solid var(--Primary-Primary, #7535ff);
  border-left: unit(5) solid transparent;
  border-right: unit(5) solid transparent;
  top: unit(-5);
  // (+)아이콘의 width/2 + tooltip의 right 값/2 ?
  right: unit(16.5);
}
</style>
