<template>
  <div class="list_container">
    <div class="list_content_container" @click="handleToggle">
      <div>이름</div>
      <svg-icon class="chevron" name="chevronRight" />
    </div>
    <div v-if="isToggleOpen" class="list_toggle_box">
      <div class="button">완납 처리</div>
      <div class="button">청구서 재발송</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const isToggleOpen = ref(false);

const handleToggle = () => {
  isToggleOpen.value = !isToggleOpen.value;
};
</script>

<style scoped lang="scss">
.list_container {
  display: flex;
  flex-direction: column;

  width: 100%;
  padding: unit(4) unit(14);
  gap: unit(4);
  margin: unit(16) 0;
  font-weight: 600;
  cursor: pointer;
}

.list_container:hover {
  border-radius: 6px;
  background: var(--Gray-Gray-200, #f1f1f1);
}

.list_content_container {
  display: flex;
  flex-direction: row;
}
.list_toggle_box {
  display: flex;
  flex-direction: row;
  gap: unit(11);
  width: 100%;
  justify-content: center;
  padding: unit(7) unit(18);
}
.button {
  width: unit(130);
  height: unit(32);
  border-radius: unit(6);
  background: var(--Primary-Primary, #7535ff);
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-weight: 500;
}
</style>
