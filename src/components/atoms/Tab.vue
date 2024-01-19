<template>
  <div class="ui-tab">
    <div
      v-for="(item, i) in items"
      :key="i"
      class="ui-tab-item"
      :class="{ selected: data.tabIndex === i }"
      @click="onClickSelectTabItem(i, $event)"
    >
      <slot name="item" class="ui-tab-item" v-bind="item"></slot>
    </div>

    <div class="bar" :style="barStyles"></div>
  </div>
</template>

<script lang="ts" setup>
import _ from 'lodash';
import { computed, onMounted, reactive } from 'vue';

const props = defineProps(['items', 'selectedIndex', 'selectedValue']);
const emit = defineEmits([
  'update:selectedIndex',
  'update:selectedValue',
  'select',
]);
const data = reactive({
  tabIndex:
    props.selectedIndex ??
    _.findIndex(
      props.items as any[],
      item => item.value === props.selectedValue
    ) ??
    0,
});

const barStyles = computed(() => {
  const items = props.items;
  const barWidth = (items.length > 0 ? 1 / items.length : 1) * 100;

  return {
    width: barWidth + '%',
    left: barWidth * data.tabIndex + '%',
  };
});

function onClickSelectTabItem(i, e) {
  const items = props.items;

  data.tabIndex = i;
  emit('update:selectedIndex', i);
  emit('update:selectedValue', items[data.tabIndex].value);
  emit('select', { index: data.tabIndex, ...items[data.tabIndex] });
}
</script>

<style lang="scss">
.ui-tab {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  position: relative;

  border-bottom: 1px solid #ccc;

  .ui-tab-item {
    flex: 1;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: unit(8);
    padding: unit(16) 0;
    cursor: pointer;

    font-size: unit(16);
    font-weight: 400;

    .label {
      font-size: unit(16);
      font-weight: 600;
    }

    &.selected {
      font-weight: 600;

      .label {
        color: #e4b0e3;
      }
    }
  }

  > .bar {
    content: ' ';

    position: absolute;
    bottom: 0;

    width: 33.3%;
    height: unit(2);
    background-color: $color-black;

    transition: left ease-in-out 150ms;
  }
}
</style>
