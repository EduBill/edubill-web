<template>
  <div id="wrapper" ref="wrapper">
    <h1>Layout</h1>
    <router-view />
  </div>
</template>

<script lang="ts" setup></script>

<style lang="scss">
#wrapper {
  height: -webkit-fill-available;
}
</style>
