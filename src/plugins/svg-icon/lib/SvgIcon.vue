<template>
  <svg class="icon svg-icon" :class="name" aria-hidden="true">
    <use :xlink:href="iconName" />
  </svg>
</template>

<script lang="ts">
export default {
  props: {
    name: {
      type: String,
      required: true,
    },
  },
  computed: {
    iconName(): string {
      return `#icon-${this.name}`;
    },
  },
};
</script>

<style scoped>
.svg-icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>
