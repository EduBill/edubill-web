<template>
  <!-- <page-header
    :title="`${newClassInfo.groupName} / ${newClassInfo.schoolType}`"
    :back="true"
  /> -->
  <ul>
    <li>
      <div>수업명</div>
      <!-- <div>{{ newClassInfo.groupName }}</div> -->
    </li>

    <li>
      <div>수업 대상</div>
      <!-- <div>{{ newClassInfo.groupName }}</div> -->
    </li>
    <li>
      <div>수업 시간</div>
      <!-- <div>{{ newClassInfo.groupName }}</div> -->
    </li>
    <li>
      <div>수업료</div>
      <!-- <div>{{ newClassInfo.groupName }}</div> -->
    </li>
    <li>
      <div>메모</div>
      <!-- <div>{{ newClassInfo.groupName }}</div> -->
    </li>
  </ul>
  <div class="button-area"></div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import PageHeader from '@/components/commons/headers/PageHeader.vue';
import { GroupApi } from '@/api/GroupApi';

const route = useRoute();

onMounted(() => {
  const groupId = route.query.groupId;
  console.log('groupId:', groupId);
});
</script>

<style lang="scss" scoped></style>
