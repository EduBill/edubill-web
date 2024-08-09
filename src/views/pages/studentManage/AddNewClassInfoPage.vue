<template>
  <page-header
    :title="`${newClassInfo.groupName} / ${newClassInfo.schoolType}`"
    :back="true"
  />
  <ul>
    <li>
      <div>수업명</div>
      <div>{{ newClassInfo.groupName }}</div>
    </li>

    <li>
      <div>수업 대상</div>
      <div>{{ newClassInfo.groupName }}</div>
    </li>
    <li>
      <div>수업 시간</div>
      <div>{{ newClassInfo.groupName }}</div>
    </li>
    <li>
      <div>수업료</div>
      <div>{{ newClassInfo.groupName }}</div>
    </li>
    <li>
      <div>메모</div>
      <div>{{ newClassInfo.groupName }}</div>
    </li>
  </ul>
  <div class="button-area"></div>
</template>

<script setup lang="ts">
import PageHeader from '@/components/commons/headers/PageHeader.vue';
import { useAddNewClassInfo } from '@/stores/modules/addNewClass';
const newClassInfo = useAddNewClassInfo();
</script>

<style lang="scss" scoped></style>
