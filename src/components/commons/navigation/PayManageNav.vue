<template>
  <div class="payManageNav">
    <svg-icon
      class="chevronLeft"
      name="largeChevronLeft"
      @click="router.go(-1)"
    />
    <p>{{ title }}</p>
    <div class="tooltip_container">
      <svg-icon class="plus" name="plusOutline" />
      <BottomTooltip
        v-if="showTooltip"
        class="plus_tooltip"
        content="언제든 데이터를 업데이트할 수 있습니다"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, onUnmounted, ref, watch } from 'vue';
import SvgIcon from '@/plugins/svg-icon/lib/SvgIcon.vue';
import router from '@/router';
import BottomTooltip from '@/components/molecules/BottomTooltip.vue';

const props = defineProps({
  firstExcelUploaded: {
    type: Boolean,
    default: false,
  },
  title: {
    type: String,
    default: '납부관리',
  },
});

const showTooltip = ref(false);

const hideTooltip = () => {
  showTooltip.value = false;
};

watch(
  () => props.firstExcelUploaded,
  newVal => {
    if (newVal) {
      showTooltip.value = true;
    }
  },
  { immediate: true }
);

onMounted(() => {
  // 컴포넌트가 마운트될 때 'mousedown' 이벤트 리스너를 추가
  // tooltip이 나타났을 때 화면을 터치하면 툴팁 제거
  window.addEventListener('mousedown', hideTooltip);
});

onUnmounted(() => {
  // 컴포넌트가 언마운트될 때 'mousedown' 이벤트 리스너를 제거
  window.removeEventListener('mousedown', hideTooltip);
});
</script>

<style lang="scss" scoped>
.payManageNav {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  position: relative;

  p {
    // 다른 요소에 관계없이 중앙에 배치
    position: absolute;
    width: 100%;
    display: flex;
    justify-content: center;

    color: var(--Gray99, #1a1a1a);
    font-size: 18px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
  }
}

.chevronLeft {
  width: unit(32);
  height: unit(32);
  z-index: 10;
}

.tooltip_container {
  // tooltip을 + 아이콘 밑에 배치하기 위함.
  position: relative;
}

.plus {
  width: unit(24);
  height: unit(24);
  z-index: 10;
  position: relative;

  &_tooltip {
    position: absolute;
    right: unit(-9);
  }
}
</style>
