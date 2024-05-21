<template>
  <div class="list_container">
    <div>이름</div>
    <svg-icon class="chevron" name="chevronRight" />
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.list_container {
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: unit(7) unit(30);
  gap: unit(4);
  margin: unit(16) 0;
  font-weight: 600;
}

.list_container:hover {
  border-radius: 6px;
  background: var(--Gray-Gray-200, #f1f1f1);
}
</style>
