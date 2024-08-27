<template>
  <div class="ui-checkbox">
    <input
      :id="props.id"
      ref="refCheckbox"
      type="checkbox"
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
import _ from 'lodash';
import { computed, ref } from 'vue';

const refCheckbox = ref(null);
const props = defineProps({
  modelValue: {
    type: Array,
    default: () => [],
  },
  id: String,
  type: String,
  label: String,
  value: [String, Number, Object, Array],
});
const emit = defineEmits(['input', 'update:modelValue', 'click']);

const checked = computed(() => {
  if (props.type === 'all') {
    return isSameValues(props.modelValue, props.value);
  }

  return props.modelValue?.includes(props.value);
});

function isSameValues(a, b) {
  if (a === b) {
    return true;
  }
  if (a == null || b == null) {
    return false;
  }
  if (a.length !== b.length) {
    return false;
  }

  let sameCounting = 0;

  for (let i = 0; i < a.length; ++i) {
    if (b.includes(a[i])) {
      sameCounting = sameCounting + 1;
    }
  }
  return sameCounting === b.length;
}

function updateModelValue() {
  const isChecked = refCheckbox.value?.checked;
  const newModelValue = [...props.modelValue];

  if (props.type === 'all') {
    if (!isChecked) {
      _.forEach(props.value as any[], item => {
        _.remove(props.modelValue, item);
      });
    } else {
      _.forEach(props.value as any[], item => {
        if (!props.modelValue?.includes(item)) {
          // props.modelValue?.push(item);
          newModelValue.push(item);
        }
      });
    }
  } else if (!props.modelValue?.includes(props.value)) {
    // props.modelValue?.push(props.value);
    newModelValue.push(props.value);
  } else if (!isChecked) {
    _.remove(newModelValue, n => n === props.value);
  }

  emit('update:modelValue', newModelValue);
}

function onInput(e) {
  console.log('onInput', props.value);

  emit('input', props.value);

  updateModelValue();
}
</script>

<style lang="scss">
.ui-checkbox {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;

  font-size: 1em;

  input[type='checkbox'] {
    display: block;
    font-size: 1em;
    width: 1.2em;
    height: 1.2em;
    background-color: $color-white;
    line-height: 1.2em;
    border-radius: 25%;
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
