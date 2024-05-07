<template>
  <div id="homenav" class="homenav">
    <svg-icon class="logo" name="homeLogo" />
    <div>
      <svg-icon class="icon" name="alarm" />
      <svg-icon class="icon" name="menu" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import SvgIcon from '@/plugins/svg-icon/lib/SvgIcon.vue';
</script>

<style lang="scss" scoped>
#homenav {
  width: 100%;
  height: unit(44);
  padding: unit(0) unit(20);

  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  .logo {
    width: unit(85);
    height: unit(23.5);
    flex-shrink: 0;
  }
  div {
    display: flex;
    align-items: flex-end;
    .icon {
      width: unit(32);
      height: unit(32);
      flex-shrink: 0;
    }
  }
}
</style>
