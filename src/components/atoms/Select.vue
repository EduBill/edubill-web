<template>
  <div
    class="ui-select"
    :class="{ disabled: disabled, fill: fill, border: border }"
  >
    <div v-if="props.label" class="label">{{ props.label }}</div>
    <div class="body">
      <select
        ref="input"
        :value="modelValue"
        :disabled="disabled"
        @change="onChangeSelect"
      >
        <option v-if="placeholder" value="" disabled>
          {{ placeholder }}
        </option>
        <option
          v-for="(item, index) in props.items"
          :key="index"
          :value="item.value"
        >
          {{ item.label }}
        </option>
      </select>
    </div>
    <div v-if="error" class="error">{{ error }}</div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';

const props = defineProps([
  'modelValue',
  'type',
  'placeholder',
  'label',
  'error',
  'disabled',
  'maxlength',
  'items',
  'border',
]);
const emit = defineEmits(['update:modelValue', 'change']);
const fill = computed(() => {
  return !!props.modelValue;
});

function onChangeSelect(e) {
  emit('update:modelValue', e.target.value);
  emit('change', e.target.value);
}
</script>

<style lang="scss" scoped>
.ui-select {
  font-size: 1rem;
  cursor: text;

  > .label {
  }

  > .body {
    position: relative;
    padding: 0;
    margin: 0;

    &::before {
      position: absolute;
      content: '⌃';
      display: block;
      transform: rotate(180deg);
      font-size: 1.5em;
      color: var(--color_text);
      right: 0;
      top: 0;
      line-height: 2.25em;
      width: 2em;
      height: 2em;
      text-align: center;
      margin: 0;
      padding: 0;
      pointer-events: none;
      z-index: 1;
    }

    select {
      width: 100%;
      border: none;
      color: var(--color_text);
      font-size: 1em;
      line-height: 2em;
      padding: 0.5em 4em 0.5em 1.1em;
      margin: 0;
      transition: all 0.2s;

      -webkit-appearance: none;
      -moz-appearance: none;
      appearance: none;

      background-color: transparent;
    }
  }

  > .error {
    font-size: unit(12);
    /* color: $color-error; */
  }

  &.border {
    > .body {
      overflow: hidden;
      border: solid 1px #101010;
      border-radius: unit(8);
    }
  }

  &.disabled {
    opacity: 0.5;
    cursor: not-allowed;
    > .label {

    }

    > .body {
      &::before {
        opacity: 0.5;
      }

      /* background-color: $color-gray-16; */
      border-color: $color-gray-120;
    }
  }

  &.readonly {
    opacity: 0.8;
    > .label {
      /* color: $color-gray-200; */
    }

    > .body {
      background-color: $color-black;
      border-color: $color-gray-120;
    }
  }

  &.fill {
    color: $color-black;

    > .label {
      opacity: 1;
    }
  }
}
</style>
