<template>
  <teleport to="#teleport-area">
    <div v-if="useModal" class="drawer-bg" @click="closeDrawer"></div>
    <div class="drawer-container">
      <ul>
        <drawer-item
          v-for="(item, i) in items"
          :ref="item.ref"
          :key="item.id"
          :payload="item"
        />
      </ul>
    </div>
  </teleport>
</template>

<script lang="ts" setup>
import { computed, onMounted, watch, onUnmounted } from 'vue';
import { useDrawerModule } from '..';
import DrawerItem from './DrawerItem.vue';

const props = defineProps({
  observerHandler: Function,
});

const emits = defineEmits(['close']);

const drawerModule = useDrawerModule();

onMounted(() => {
  if (props.observerHandler) {
    drawerModule.addObserver(props.observerHandler);
  }
});

const items = computed(() => drawerModule.items);

const useModal = computed(() => {
  const modalItems = items.value.filter(item => item.useModal !== false);
  return modalItems.length > 0;
});

function closeDrawer() {
  setTimeout(() => {
    emits('close');
  }, 10);
}
</script>

<style lang="scss" scoped>
.drawer-bg {
  position: fixed;
  overflow: hidden;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000;
}
.drawer-item {
  z-index: 900;
}
.drawer-item:last-child {
  z-index: 1200;
}
</style>
