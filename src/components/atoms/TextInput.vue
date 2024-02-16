<template>
  <div class="ui-text-input" :class="classNames">
    <label v-if="props.label" class="label">
      {{ props.label }}
      <span v-if="props.required" style="color: $color-red"> * </span>
    </label>
    <div class="input">
      <slot name="input-before" />
      <input
        v-if="mask"
        v-bind="inputProps"
        v-mask="props.mask"
        @focus="onFocus"
        @blur="onBlur"
        @keyup="onKeyUp"
        @input="onInput"
      />
      <input
        v-else
        v-bind="inputProps"
        @focus="onFocus"
        @blur="onBlur"
        @keyup="onKeyUp"
        @input="onInput"
      />
      <!-- <button
          v-show="currentLength"
          v-if="!props.disabled && !props.readonly && props.hasClear"
          type="button"
          class="btn-clear"
          @click="onClearInputValue"
        >
          <svg-icon name="circle-clear" />
        </button> -->
      <slot name="input-after" />
    </div>
    <div v-if="props.error" class="error helper-message">{{ props.error }}</div>
    <slot name="helper" />
  </div>
</template>
<script lang="ts" setup>
import { computed, reactive } from 'vue';
import type { PropType } from 'vue';

type TextInputState = 'success' | 'error';

const props = defineProps({
  id: { type: String, default: '' },
  type: { type: String, default: 'text' },
  value: { type: [String, Number], default: '' },
  variant: {
    type: String as PropType<'outlined' | 'underlined' | ''>,
    default: 'outlined',
  },
  autocomplete: { type: String, default: '' },
  disabled: { type: Boolean, default: false },
  inputmode: { type: String, default: 'text' },
  max: { type: [String, Number], default: null },
  maxlength: { type: [String, Number], default: null },
  min: { type: [String, Number], default: null },
  minlength: { type: [String, Number], default: null },
  name: { type: String, default: null },
  state: { type: String as PropType<TextInputState>, default: null },
  pattern: { type: String, default: null },
  placeholder: { type: String, default: '' },
  readonly: { type: Boolean, default: false },
  required: { type: Boolean, default: false },
  wide: { type: Boolean, default: false },
  mask: { type: String },
  label: { type: String },
  error: { type: String, default: '' },
});

const inputProps = computed(() => {
  return {
    id: props.id,
    type: props.type,
    value: props.value,
    autocomplete: props.autocomplete,
    disabled: props.disabled,
    inputmode: props.inputmode,
    max: props.max,
    maxlength: props.maxlength,
    min: props.min,
    minlength: props.minlength,
    name: props.name,
    pattern: props.pattern,
    placeholder: props.placeholder,
    readonly: props.readonly,
    required: props.required,
  };
});

const emit = defineEmits(['focus', 'blur', 'keyup', 'input', 'update:value']);
const state = reactive({ focused: false });

const classNames = computed(() => {
  return [
    props.type,
    props.state,
    props.variant,
    {
      wide: props.wide,
      readonly: props.readonly,
      focused: state.focused,
      error: props.error.length > 0,
    },
  ];
});

function maxLengthCheck(e) {
  if (e.target.maxLength < 0) {
    return;
  }

  if (e.target.value.length > e.target.maxLength) {
    e.target.value = e.target.value.slice(0, e.target.maxLength);
  }

  if (e.target.min >= '0') {
    e.target.value = Math.abs(e.target.value);
  }
}

function onFocus(e) {
  state.focused = true;
  // useLayoutStore().keyboardHeight = 1;
  emit('focus', e);
}

function onBlur(e) {
  state.focused = false;
  emit('blur', e);
}

function onKeyUp(e) {
  emit('keyup', e);
}

function onInput(e) {
  maxLengthCheck(e);
  emit('update:value', e.target.value);
  emit('input', e);
}
</script>

<style lang="scss" scoped>
.ui-text-input {
  display: inline-block;
  width: 100%;
  font-size: unit(16);

  .label {
    font-weight: 400;
    letter-spacing: normal;
    font-size: unit(16);
    font-weight: 600;
  }

  .input {
    overflow: hidden;
    width: 100%;

    input {
      all: unset;
      display: block;
      flex: 1;
      width: 100%;
      height: unit(48);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      text-indent: unit(16);

      &:disabled {
        background-color: transparent;
        opacity: 1; /* iOS input color */
        -webkit-text-fill-color: $color-gray-160;
      }

      &[type='number'] {
        -moz-appearance: textfield;
        &::-webkit-inner-spin-button,
        &::-webkit-outer-spin-button {
          appearance: none;
          -moz-appearance: none;
          -webkit-appearance: none;
        }
      }
    }

    .svg-icon {
      font-size: unit(20);
    }

    .btn-clear {
      font-size: unit(24);
      color: $color-gray-200;

      .svg-icon {
        display: block;
      }
    }
  }

  .helper-message {
    font-size: unit(12);
    letter-spacing: -0.2px;
    line-height: unit(16);
    color: $color-gray-160;
  }

  &.wide {
    display: flex;
  }

  // variant
  &.outlined {
    display: block;

    .label {
      display: block;
      margin-bottom: unit(4);
    }

    .input {
      display: flex;
      gap: unit(4);
      padding-right: unit(16);
      border: 1px solid $color-gray-224;
      border-radius: $border-radius-medium;
      background-color: $color-gray-254;
      /* padding-right: unit(16); */

      &:focus-within {
        border-color: $color-gray-64;
      }
    }

    .helper-message {
      padding: 0 unit(6);
    }

    &.disabled {
      .input {
        border-color: $color-gray-200;
        background-color: $color-gray-224;
        color: $color-gray-160;
      }
    }
  }

  &.underlined {
    margin-top: unit(32);

    .label {
      font-size: unit(12);
      letter-spacing: -0.2px;
      line-height: unit(16);
      color: $color-gray-160;
    }

    .input {
      border: 1px solid $color-gray-224;
      background-color: transparent;

      input {
        text-indent: 0;
      }
    }

    .helper-message {
      margin-top: unit(6);
    }

    &.disabled {
      .input {
        color: $color-gray-160;

        input {
          color: $color-gray-160;
        }
      }
    }
  }

  // stauts
  &.error {
    .input {
      border-color: red;
    }

    .helper-message {
      color: red;
    }

    .length-counter {
      em {
        color: red;
      }
    }
  }

  &.success {
    .input {
      border-color: #e4b0e3;
    }

    .helper-message {
      color: #e4b0e3;
    }
  }

  &.focused {
    .input {
      border-color: $color-gray-64;
    }
  }

  &.readonly {
    .input {
    }
  }
}

input:-webkit-autofill,
input:-webkit-autofill:hover,
input:-webkit-autofill:focus,
input:-webkit-autofill:active {
  -webkit-text-fill-color: #000;
  -webkit-box-shadow: 0 0 0px 30px #fff inset !important;
  box-shadow: 0 0 0px 30px #fff inset !important;
  transition: background-color 5000s ease-in-out 0s;
}
</style>
