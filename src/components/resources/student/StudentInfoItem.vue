<template>
  <div class="content-box">
    <div class="student-info-container">
      <div class="group-container">
        <div
          v-for="(className, index) in props.studentInfo.classNames"
          :key="index"
        >
          <div
            :class="`group-item ${props.selectedClass.includes(className) ? 'selected-class' : ''}`"
          >
            {{ className }}
          </div>
        </div>
      </div>
      <div class="student-container">
        <span class="student-name">
          {{ props.studentInfo.studentName }}
        </span>
        <span class="parents-name">
          ( {{ props.studentInfo.parentName }} )
        </span>
      </div>
    </div>
    <svg-icon name="DotsThreeVertical" class="menu-icon"></svg-icon>
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
  selectedClass: {
    type: Array as () => string[], // Make sure to specify it's an array of strings
    default: () => [],
  },
});
</script>

<style lang="scss" scoped>
.content-box {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 unit(20);
}
.student-info-container {
  display: flex;
  flex-direction: column;
  gap: unit(8);
  padding: unit(16) 0;
  border-bottom: unit(1) solid $color-gray-200;
  width: 100%;
  .group-container {
    display: flex;
    flex-direction: row;
    gap: unit(8);
    .group-item {
      padding: unit(4) unit(12);
      border-radius: unit(12);
      border: unit(1) solid $color-gray-300;
    }
    .selected-class {
      border: 1px solid $color-primary;
      color: $color-primary;
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

  .menu-icon {
    cursor: pointer;
  }
}
</style>
