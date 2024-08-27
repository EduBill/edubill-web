<template>
  <header class="page-header">
    <div
      v-if="props.title === '로그인' || props.title === '회원가입'"
      class="left-items"
    ></div>
    <div v-else class="left-items">
      <button
        v-if="props.back"
        class="btn-back"
        type="button"
        @click="onClickBack"
      >
        <!-- <img src="/imgs/icon/arrow-back.svg" alt="뒤로 가기" /> -->
        <svg-icon name="arrow-back-page-header" />
      </button>
    </div>

    <h1 class="page-header--title">
      <slot>{{ props.title }}</slot>
    </h1>

    <div class="right-items">
      <button
        v-if="hasRightButtonItem('확인')"
        type="button"
        class="btn-text"
        @click="onCancel"
      ></button>
    </div>
  </header>
</template>

<script lang="ts" setup>
import { onBeforeUnmount, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useWNInterface } from '@/plugins/vue-wni';

const props = defineProps({
  back: {
    type: Boolean,
    default: false,
  },
  title: {
    type: String,
    default: '',
  },
  rightItems: {
    type: [String, Array],
    default: '',
  },
  hotfix: {
    type: Boolean,
    default: false,
  },
  deepLinkBackAction: {
    type: String,
    // eslint-disable-next-line vue/require-valid-default-prop
    default: false,
  },
});

// console.log('@@@ 받았니 : ', props.deepLinkBackAction);

const router = useRouter();
// const route = useRoute();
// const wni = useWNInterface();

function onClickBack() {
  // original ++++++++++++++++++++++++++++++++++++++++
  // const back_action = route.query?.back_action as string;

  // if (!back_action) {
  //   location.replace('/home');
  //   return;
  // }

  // router.back();

  // test 1 ++++++++++++++++++++++++++++++++++++++++
  // const back_action = props.queryBackAction;

  // if (back_action === 'home') {
  //   location.replace('/home');
  //   return;
  // }

  // router.back();

  // test 2 ++++++++++++++++++++++++++++++++++++++++
  const back_action = props.deepLinkBackAction;

  if (back_action === 'home') {
    location.replace('/home');
  } else {
    router.back();
  }

  // test 3 ++++++++++++++++++++++++++++++++++++++++
  // const back_action = props.deepLinkBackAction;

  // if (window.history.length > 1) {
  //   return router.back();
  // } else if (back_action) {
  //   return router.push(back_action);
  // } else {
  //   return router.push('/home');
  // }
}

function hasRightButtonItem(name: string | []) {
  if (typeof props.rightItems === 'string') {
    return props.rightItems === name;
  }

  return props.rightItems === name;
}

function onCancel() {
  router.back();
}
</script>

<style lang="scss" scoped>
.page-header {
  width: 100%;
  max-width: $max-content-width;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px 0 10px;
  height: 56px;

  background-color: #fefefe;

  position: fixed;
  z-index: 100;
  top: 0;
  left: auto;
  right: auto;

  button {
    width: 40px;
    height: 40px;

    .svg-icon {
      font-size: unit(40);
    }
  }

  &--title {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);

    font-size: unit(16);
    line-height: unit(24);
    letter-spacing: unit(-0.4);
    font-weight: 500;
    color: $color-gray-16;
  }

  .btn-text {
    font-size: unit(18);
    font-weight: 400;
    color: #e4b0e3;
    flex-shrink: 0;
  }
}
</style>
