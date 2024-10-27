<!--  사용법
  <Buttons variants="short" text="안녕" :disabled="false" />
  <Buttons variants="fit" text="월" :disabled="false" />
  <Buttons variants="fit" text="글자수에따라 늘어나요" :disabled="false" />
  <Buttons variants="long" text="안녕" :disabled="false" /> 
-->
<template>
  <button
    :class="`button ${props.variants} ${props.color}`"
    :disabled="props.disabled"
    @click="props.click"
  >
    {{ props.text }}
  </button>
</template>

<script lang="ts" setup>
import { defineProps } from 'vue';

const props = defineProps<{
  variants: 'short' | 'long' | 'fit';
  text: string;
  color: 'selected' | 'disabled';
  disabled?: boolean;
  click?: () => void | Function;
}>();
</script>

<style lang="scss" scoped>
.button {
  padding: unit(10);
  font-family: Pretendard;
  font-size: 15px;
  font-style: normal;
  font-weight: 600;
  border-radius: unit(8);
}

.short {
  width: unit(106);
}
.long {
  width: 100%;
}
.fit {
  width: fit-content;
}
.selected {
  background: #7535ff;
  color: white;
}
.disabled {
  background: #f1f1f1;
  color: #737373;
}
</style>
