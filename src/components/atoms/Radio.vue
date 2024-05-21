<template>
  <div class="ui-radio" @click="onClick">
    <input
      :id="props.id"
      type="radio"
      :value="props.value"
      :checked="checked"
      @input="onInput"
    />
    <label :for="props.id">
      {{ props.label }}
      <slot name="label"></slot>
    </label>
  </div>
</template>

<script lang="ts" setup>
import { computed, reactive, watch } from 'vue';

const props = defineProps({
  modelValue: {
    type: [String, Number, Object],
    default: '',
  },
  id: String,
  label: String,
  value: [String, Number, Object],
});
const emit = defineEmits(['input', 'update:modelValue', 'click']);

const checked = computed(() => {
  return props.modelValue === props.value;
});

function onInput(e) {
  console.log('onInput', e);
  emit('input', props.value);
  emit('update:modelValue', props.value);
}

function onClick(e) {
  console.log('onClick', e);
  emit('input', props.value);
  emit('update:modelValue', props.value);
  emit('click', e);
}
</script>

<style lang="scss">
.ui-radio {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;

  font-size: 1em;

  input[type='radio'] {
    display: block;
    font-size: 1em;
    width: 1.2em;
    height: 1.2em;
    background-color: $color-white;
    line-height: 1.2em;
    border-radius: 50%;
    border: 1px solid #ced3d6;
    cursor: pointer;

    position: relative;

    &::before {
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      width: 100%;
      height: 100%;
      content: '✓';
      color: #fff;
      font-size: 1em;
      line-height: 1.1em;
      text-align: center;
      display: none;
    }

    &:checked {
      background-color: #e4b0e3;
      border: 1px solid transparent;

      & + i {
        display: block;
      }

      &::before {
        display: block;
      }
    }
  }

  label {
    margin-left: unit(8);
    padding-top: unit(2);

    font-size: 1em;
    line-height: 1em;
    display: block;
    color: $color-black;
    cursor: pointer;
  }

  &.transition {
    input[type='radio'] {
      transition: all 0.2s;
    }
  }
}
</style>
