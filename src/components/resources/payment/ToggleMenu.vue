<template>
  <div class="toggle_container">
    <button
      class="toggle_button"
      v-bind:class="[showReceipts ? 'active' : '']"
      @click="toggle"
    >
      수납내역
    </button>
    <button
      class="toggle_button"
      v-bind:class="[showReceipts ? '' : 'active']"
      @click="toggle"
    >
      미확인내역
    </button>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
let showReceipts = ref(true);
const toggle = () => {
  showReceipts.value = !showReceipts.value;
};
</script>

<style lang="scss">
.toggle {
  &_container {
    border-radius: unit(6);
    background-color: #f1f1f1;
    width: 100%;
    height: unit(40);
    padding: unit(4) unit(4);
    display: flex;
    font-size: unit(14);
    font-style: normal;
    font-weight: 500;
    color: #9f9f9f;
  }
  &_button {
    width: 50%;
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
