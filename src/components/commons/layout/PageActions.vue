<template>
  <div class="page-actions safe-area-inset-bottom" :class="classNames">
    <div class="page-actions-content">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  props: {
    float: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    classNames() {
      return [this.$props.float && 'floating', this.$props.tint];
    },
  },
};
</script>

<style lang="scss" scoped>
.page-actions {
  position: fixed;
  left: 0;
  bottom: 0;
  right: 0;
  width: 100%;
  z-index: $page-actions-index;
  background-image: linear-gradient(180deg, rgba($color-page-background, 0) 1.56%, $color-page-background 13.28%);

  &.floating {
    position: static;
  }

  .page-actions-content {
    max-width: $max-content-width;
    margin: 0 auto;
    // padding: unit(28) $page-side-margin; // original
    padding: $page-side-margin; // new
  }

  button {
    &:disabled {
      cursor: default;
      background-color: $color-disabled;
    }
  }
}
</style>
