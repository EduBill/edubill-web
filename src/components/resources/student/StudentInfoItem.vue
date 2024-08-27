<template>
  <div class="student-info-container">
    <div
      v-for="(className, index) in props.studentInfo.classNames"
      :key="index"
      class="group-container"
    >
      <div class="group-item">{{ className }}</div>
    </div>
    <div class="student-container">
      <span class="student-name">
        {{ props.studentInfo.studentName }}
      </span>
      <span class="parents-name"> ( {{ props.studentInfo.parentName }} ) </span>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  studentInfo: {
    type: Object as () => {
      studentId: number;
      studentName: string;
      parentName: string;
      classNames: string[];
    },
    default: () => ({}),
  },
});
</script>

<style lang="scss" scoped>
.student-info-container {
  display: flex;
  flex-direction: column;
  gap: unit(8);
  padding: unit(16) unit(20);
  border-bottom: unit(1) solid $color-gray-200;
  width: 100%;
  .group-container {
    display: flex;
    gap: unit(8);
    .group-item {
      padding: unit(4) unit(12);
      border-radius: unit(12);
      border: unit(1) solid $color-gray-300;
    }
  }
  .student-container {
    font-size: unit(18);
    font-weight: 600;
    .student-name {
      color: #2f2f2f;
    }
    .parents-name {
      color: $color-gray-500;
    }
  }
}
</style>
