<template>
  <router-view />
</template>

<script lang="ts" setup>
import { computed } from '@vue/reactivity';
import { useRoute } from 'vue-router';

const key = computed(() => useRoute().fullPath);
</script>
