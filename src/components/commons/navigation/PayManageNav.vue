<template>
  <div class="payManageNav">
    <svg-icon class="chevronLeft" name="largeChevronLeft" />
    <p>납부 관리</p>
    <svg-icon class="plus" name="plusOutline" />
  </div>
</template>

<script lang="ts" setup>
import SvgIcon from '@/plugins/svg-icon/lib/SvgIcon.vue';
</script>

<style lang="scss" scoped>
.payManageNav {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  position: relative;

  p {
    // 다른 요소에 관계없이 중앙에 배치
    position: absolute;
    width: 100%;
    display: flex;
    justify-content: center;

    color: var(--Gray99, #1a1a1a);
    font-size: 18px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
  }
}

.chevronLeft {
  width: unit(32);
  height: unit(32);
}

.plus {
  width: unit(24);
  height: unit(24);
}
</style>
