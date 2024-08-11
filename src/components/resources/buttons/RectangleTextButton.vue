<template>
  <div
    class="rectangleMenu"
    :style="{ backgroundColor: backColor, width: isFull ? '100%' : '' }"
  >
    <p class="rectangleMenu_text">{{ text }}</p>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';

const props = defineProps({
  text: String,
  backColor: String,
  isFull: Boolean,
});
</script>

<style lang="scss">
.rectangleMenu {
  border-radius: unit(6);
  padding: unit(9) !important;

  &_text {
    color: #fff;
    text-align: center;
    font-size: unit(15);
    font-style: normal;
    font-weight: 600;
    line-height: normal;
  }
}
</style>
