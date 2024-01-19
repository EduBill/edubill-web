<template>
  <div class="resource launch-need-login">
    <div class="resource-content">
      <div class="logo">
      </div>
      <div class="slogan">
        
      </div>
      <div class="loader">
        <ui-loader type="cube" :size="0.75" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import UiLoader from '@/plugins/vue-ui-components/index';
</script>

<style lang="scss" scoped>
.resource.launch-need-login {
  min-height: 100%;

  .logo {
    position: absolute;
    left: 50%;
    top: 50%;
    margin-left: -140px;
    margin-top: -104px;
    width: 280px;
    height: 104px;

    img {
      width: 100%;
      height: 100%;
    }
  }

  .slogan {
    position: absolute;
    left: 0;
    top: 50%;
    margin-top: unit(16);
    width: 100%;
    height: unit(26);

    p {
      text-align: center;
      font-size: unit(18);
      font-weight: 600;
    }
  }

  .loader {
    position: absolute;
    left: 0;
    bottom: unit(48);
    margin-top: unit(160);
    width: 100%;

    p {
      margin-top: unit(60);
      text-align: center;
      color: #999;
      font-weight: 400;
      font-size: unit(14);
    }
  }
}
</style>
