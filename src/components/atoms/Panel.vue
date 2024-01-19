<template>
  <div class="ui-panel" :style="styles">
    <slot></slot>
  </div>
</template>

<script lang="ts" setup>
import { computed, reactive, watch } from "vue";

const props = defineProps(["selectedIndex"]);
const data = reactive({
  selectedIndex: props.selectedIndex ?? 0,
});
const styles = computed(() => {
  return {
    transform: `translate(calc(var(--page-width) * ${data.selectedIndex * -1}), 0)`,
  };
});
watch(() => props.selectedIndex, (newValue, oldValue) => {
  data.selectedIndex = newValue;
});
</script>

<style lang="scss">
.ui-panel {
  display: flex;
  flex-direction: row;
  transition: transform ease-in-out 150ms;

  .panel {
    min-width: var(--page-width);
  }
}
</style>
