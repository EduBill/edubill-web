<template>
  <div class="toggle_container">
    <button
      class="toggle_button"
      :class="[isClickLeft ? 'active' : '']"
      @click="toggle('left')"
    >
      수납내역
    </button>
    <button
      class="toggle_button"
      :class="[isClickLeft ? '' : 'active']"
      @click="toggle('right')"
    >
      미확인내역
    </button>
  </div>
</template>

<script lang="ts" setup>
import { ref, defineEmits } from 'vue';

type ClickDirection = 'left' | 'right';
const isClickLeft = ref(true);

//상위 컴포넌트에 업데이트된 상태값 전달을 위한 emit
const emit = defineEmits<{
  (event: 'update:isClickLeft', value: boolean): void;
}>();

//토글의 상태값 변경하는 함수
const toggle = (key: ClickDirection): void => {
  if (key === 'left') {
    isClickLeft.value = true;
    emit('update:isClickLeft', true);
  } else if (key === 'right') {
    isClickLeft.value = false;
    emit('update:isClickLeft', false);
  }
};
</script>

<style lang="scss">
.toggle {
  &_container {
    border-radius: unit(6);
    background-color: #f1f1f1;
    width: 100%;
    padding: unit(4) unit(4);
    display: flex;
    font-size: unit(14);
    font-style: normal;
    font-weight: 500;
    color: #9f9f9f;
  }
  &_button {
    width: 50%;
    padding: unit(6) unit(59);
    border-radius: unit(6);
    text-align: center;
    cursor: pointer;
  }
}
.active {
  background-color: #fff;
  color: #19171a;
}
</style>
