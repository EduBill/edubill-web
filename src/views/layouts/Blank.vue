<template>
  <router-view />
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';

const key = computed(() => useRoute().fullPath);
</script>
