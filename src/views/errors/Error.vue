<template>
  <div class="page error">
    <div class="page-header">
      <h1>{{ state.title }}</h1>
    </div>

    <div class="page-content">
      <p class="message">{{ state.messaage }}</p>
      <button type="button" @click="onClickRetry">{{ '다시 시도' }}</button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, reactive } from 'vue';
import { useRoute } from 'vue-router';

const serverErrors = [
  {
    title: '앗! 서버를 깨우고 있어요',
    message: '다시 시작해주시면 정상적으로 접속 됩니다 :)',
  },
  {
    title: '앗! 서버를 배송중이에요',
    message: '다시 시작해주시면 정상적으로 접속 됩니다 :)',
  },
  {
    title: '앗! 서버가 신호에 걸렸어요',
    message: '다시 시작해주시면 정상적으로 접속 됩니다 :)',
  },
  {
    title: '앗! 서버가 더 많은 공간을 찾고 있어요',
    message: '다시 시작해주시면 정상적으로 접속 됩니다 :)',
  },
  {
    title: '앗! 서버를 조리중이에요',
    message: '다시 시작해주시면 정상적으로 접속 됩니다 :)',
  },
  {
    title: '앗! 서버를 수확중이에요',
    message: '다시 시작해주시면 정상적으로 접속 됩니다 :)',
  },
  {
    title: '앗! 서버가 목욕중이에요',
    message: '다시 시작해주시면 정상적으로 접속 됩니다 :)',
  },
  {
    title: '앗! 서버가 휴가중이에요',
    message: '다시 시작해주시면 정상적으로 접속 됩니다 :)',
  },
];

const state = reactive({ errorIndex: 0, title: '', messaage: '' });
const route = useRoute();

onMounted(() => {
  state.errorIndex = Math.floor(Math.random() * serverErrors.length);
  state.title = displayTitle(route.query?.error ?? '404');
  state.messaage = displayMessage(route.query?.error ?? '404');
});

function displayTitle(title) {
  if (title === '404') {
    return '';
  } else if (title === 'Network Error') {
    return serverErrors[state.errorIndex].title;
  }

  return '';
}

function displayMessage(message) {
  if (message === '404') {
    return '페이지를 찾을 수 없어요';
  } else if (message === 'Network Error') {
    return serverErrors[state.errorIndex].message;
  }

  return message;
}

function onClickRetry(e) {
  window.location.reload();
}
</script>

<style lang="scss" scoped>
#wrapper > .page.error {
  .page-content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    /* min-height: unit(300); */

    .message {
      /* font-size: unit(16); */
      font-weight: 500;
    }

    button {
      /* margin-top: unit(32);
      padding: unit(16);
      min-width: unit(200);
      font-size: unit(16);
      font-weight: unit(600);
      border-radius: unit(8); */
    }
  }
}
</style>
