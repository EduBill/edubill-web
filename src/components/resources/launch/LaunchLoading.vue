<template>
  <div class="resource launch-loading">
    <div class="resource-content">
      <div class="logo"></div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, onBeforeUnmount, onMounted, reactive } from 'vue';

const state: any = reactive({
  _timeout: null,
  loading: false,
  messages: [
    '데이터를 불러오는 중입니다.',
    '데이터를 불러오는 중입니다..',
    '데이터를 불러오는 중입니다...',
    '데이터를 불러오는 중입니다....',
    '데이터를 불러오는 중입니다.....',
    '데이터를 불러오는 중입니다......',
    '데이터를 불러오는 중입니다.......',
    '데이터를 불러오는 중입니다........',
    '데이터를 불러오는 중입니다.........',
    '데이터를 불러오는 중입니다..........',
    '데이터를 불러오는 중입니다...........',
    '데이터를 불러오는 중입니다............',
    '데이터를 불러오는 중입니다.............',
    '데이터를 불러오는 중입니다..............',
    '데이터를 불러오는 중입니다...............',
    '데이터를 불러오는 중입니다................',
    '데이터를 불러오는 중입니다.................',
    '데이터를 불러오는 중입니다..................',
    '데이터를 불러오는 중입니다...................',
    '데이터를 불러오는 중입니다....................',
    '데이터를 불러오는 중입니다.....................',
    '데이터를 불러오는 중입니다......................',
    '데이터를 불러오는 중입니다.......................',
    '데이터를 불러오는 중입니다........................',
    '데이터를 불러오는 중입니다.........................',
    '데이터를 불러오는 중입니다..........................',
    '데이터를 불러오는 중입니다...........................',
    '데이터를 불러오는 중입니다............................',
    '데이터를 불러오는 중입니다.............................',
    '데이터를 불러오는 중입니다..............................',
    '데이터를 불러오는 중입니다...............................',
    '데이터를 불러오는 중입니다................................',
    '데이터를 불러오는 중입니다.................................',
    '데이터를 불러오는 중입니다..................................',
  ],
  messageIndex: -1,
});

const message = computed(() => {
  if (state.messageIndex >= 0) {
    return state.messages[state.messageIndex];
  }
  return '';
});

function startToShowRandomMessages({ delay = 500 }) {
  state.messages.sort(() => Math.random() > 0.5);

  state._timeout = setTimeout(() => {
    state.loading = true;
    nextMessage();
  }, delay);
}

function nextMessage() {
  let messageIndex = state.messageIndex + 1;
  if (messageIndex >= state.messages.length) {
    messageIndex = 0;
  }
  state.messageIndex = messageIndex;

  if (state._timeout) {
    clearTimeout(state._timeout);
    state._timeout = null;
  }

  state._timeout = setTimeout(
    () => {
      state.loading = true;
      nextMessage();
    },
    Math.max(Math.random() * 3000, 1000)
  );
}

onMounted(() => {
  startToShowRandomMessages({ delay: 500 });
});

onBeforeUnmount(() => {
  if (state._timeout) {
    clearTimeout(state._timeout);
    state._timeout = null;
  }
});
</script>

<style lang="scss" scoped>
.resource.launch-loading {
  min-height: 100%;

  .resource-content {
    // width: 100vw;
    height: 100vh;
    // padding-bottom: $safe-area-bottom;
    padding-top: $safe-area-top;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .logo {
    width: unit(229);
    transform: translateY(-100%);

    // @MEMO: 시작시 로고의 크기는 해상도에 영향을 받지 않게 고정
    // margin-left: -140px;
    // margin-top: -104px;
    // width: 280px;
    // height: 104px;

    img {
      width: 100%;
    }
  }

  // .slogan {
  //   position: absolute;
  //   left: 0;
  //   top: 50%;
  //   margin-top: unit(16);
  //   width: 100%;
  //   height: unit(26);

  //   p {
  //     text-align: center;
  //     font-size: unit(18);
  //     font-weight: 600;
  //   }
  // }

  // .loader {
  //   position: absolute;
  //   left: 0;
  //   bottom: unit(48);
  //   margin-top: unit(160);
  //   width: 100%;

  //   p {
  //     margin-top: unit(60);
  //     text-align: center;
  //     color: #999;
  //     font-weight: 400;
  //     font-size: unit(14);
  //   }
  // }
}
</style>
