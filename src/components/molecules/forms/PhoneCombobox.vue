<template>
  <div
    class="ui-phone-combobox"
    :class="{
      hover: state.hover,
      focus: state.focus,
      fill: state.fill,
      error: error,
      disabled: disabled,
      readonly: readonly,
    }"
  >
    <label ref="hover">
      <div class="label">
        {{ label }}
        <span v-if="required" class="required">*</span>
      </div>
      <div class="body">
        <select
          ref="select"
          :value="dialCodeValue"
          autocapitalize="off"
          autocomplete="off"
          :maxlength="maxLength"
          disabled
          @focus="onFocus"
          @blur="onBlur"
          @change="dialCodeValue = $event.target.value"
        >
          <option
            v-for="(item, index) in dialCodeItems"
            :key="index"
            :value="item.value"
            :selected="item.label === 'KR'"
          >
            {{ item.label }}
          </option>
        </select>
        <!-- <i class="fa fa-angle-down select-icon"></i> -->
        <input
          ref="input"
          type="text"
          :placeholder="placeholder"
          :value="modelValue"
          :readonly="readonly"
          :disabled="disabled"
          autocapitalize="off"
          autocomplete="off"
          :maxlength="maxLength"
          @input="dialNumberValue = $event.target.value"
          @focus="onFocus"
          @blur="onBlur"
        />
      </div>
    </label>
    <div v-if="error" class="error">{{ error }}</div>
  </div>
</template>

<script>
import CountryDialCode from '@/assets/json/country.dial.code.json';
import { isTouchDevice } from '@/helpers';

export default {
  props: {
    modelValue: String,
    label: String,
    placeholder: String,
    error: String,
    disabled: Boolean,
    readonly: Boolean,
    maxLength: Number,
    required: Boolean,
  },
  emits: ['focus', 'blur', 'update:modelValue'],
  data() {
    const state = { hover: false, focus: false, fill: false, error: false };

    const dialCodeItems = Object.keys(CountryDialCode).map(key => {
      const value = CountryDialCode[key];
      return {
        label: `${key} (${value})`,
        value,
      };
    });

    return {
      state,
      dialCodeItems,
      dialCodeValue: '82',
      dialNumberValue: '',
    };
  },

  computed: {
    combinedPhoneNumber() {
      return this.dialNumberValue;
      // todo 국가번호 대응
      // const dialCode = this.dialCodeValue;
      // const dialNumberValue = this.dialNumberValue;

      // if (dialCode) {
      //   if (dialNumberValue && dialNumberValue[0] === '0') {
      //     return `${dialCode}${dialNumberValue.substring(0)}`;
      //   }

      //   return `${dialCode}${dialNumberValue}`;
      // }

      // return dialNumberValue;
    },
  },
  watch: {
    modelValue: {
      handler(value) {
        // if
        this.state.fill = !!value;
      },
      immediate: true,
    },

    dialCodeValue(value) {
      this.$emit('update:modelValue', this.combinedPhoneNumber);
    },

    dialNumberValue(value) {
      this.$emit('update:modelValue', this.combinedPhoneNumber);
    },
  },
  mounted() {
    if (isTouchDevice()) {
      this.$refs.hover.addEventListener('mouseover', e => {
        this.state.hover = true;
      });
      this.$refs.hover.addEventListener('mouseout', e => {
        this.state.hover = false;
      });
    }
  },

  methods: {
    onFocus(e) {
      if (this.readonly === true) {
        return;
      }
      this.state.focus = true;
      this.$emit('focus', e);
    },

    onBlur(e) {
      if (this.readonly === true) {
        return;
      }
      this.state.focus = false;
      this.$emit('blur', e);
    },

    // splitPhoneNumber(value) {
    // todo 국가번호 대응
    //   const dialCode = this.dialCodeValue;
    //   const dialNumberValue = this.dialNumberValue;

    //   if (dialCode) {
    //     if (dialNumberValue && dialNumberValue[0] === '0') {
    //       return `${dialCode}${dialNumberValue.substring(0)}`;
    //     }

    //     return `${dialCode}${dialNumberValue}`;
    //   }

    //   return dialNumberValue;
    // },
  },
};
</script>

<style lang="scss" scoped>
.ui-phone-combobox {
  font-size: unit(14);
  line-height: 2;
  color: $color-black !important;
  cursor: text;

  .label {
    position: absolute;
    top: 0;
    left: 0;
    // padding: unit(8) 0;
    white-space: nowrap;
    z-index: 1;
    transition: all 0.2s;
    font-size: unit(12);
    line-height: 2;
    padding: 0;
  }

  .required {
    font-size: inherit;
    color: $color-red;
    margin: 0 unit(2);
  }

  .body {
    display: flex;

    &::before {
      content: '';
      position: absolute;
      top: unit(16);
      left: unit(100);
      height: calc(100% - #{unit(24)});
      width: unit(1);
      background: $color-gray-120;
    }

    .select-icon {
      position: absolute;
      top: 50%;
      left: unit(80);
    }

    select {
      flex: 0 0 unit(100);
      padding: unit(22) 0 unit(6) 0;
      font-size: unit(14);
      transition: all 0.2s;
      height: unit(52);
      color: $color-gray-200;
      border-bottom: solid 1px $color-gray-120;

      &:focus {
        border-bottom: solid 1px #0088ff;
      }

      &::placeholder {
        color: #a9afb3;
      }

      option {
        font-size: unit(12);
      }
    }

    input {
      flex: 1;
      height: unit(52);
      padding: unit(22) 0 unit(6) unit(16);
      transition: all 0.2s;
    }
  }

  & > .error {
    font-size: unit(12);
    color: $color-red;
  }
  & {
    .label {
      color: $color-gray-200;
    }
    input {
      border-bottom: solid 1px $color-gray-120;
    }
  }

  &.focus {
    .label {
      color: $color-primary;
    }
    input,
    select {
      border-bottom: solid 1px $color-primary;
    }
  }
  &.disabled {
    opacity: 0.5;
    cursor: not-allowed;
    .label {
      color: $color-gray-200;
    }
    input,
    select {
      background-color: $color-gray-16;
      border-bottom: solid 1px $color-gray-120;
    }
  }
  &.readonly {
    opacity: 0.8;
    .label {
      color: $color-gray-200;
    }
    input,
    select {
      background-color: $color-black;
      border-bottom: solid 1px $color-gray-120;
    }
  }
  &.focus,
  &.fill {
    // .label {
    //   font-size: unit(12);
    //   line-height: 2;
    //   padding: 0;
    // }

    input,
    select {
      color: $color-black;
    }
  }
}
</style>
