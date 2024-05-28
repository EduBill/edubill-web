<template>
  <div class="rectangleMenu" :style="{ backgroundColor: backColor }">
    <p class="rectangleMenu_title">{{ title }}</p>
    <p class="rectangleMenu_content">{{ content }}</p>
    <div class="rectangleMenu_img">
      <svg-icon v-if="iconName" class="icon" :name="iconName" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, defineProps } from 'vue';
import SvgIcon from '@/plugins/svg-icon/lib/SvgIcon.vue';

const props = defineProps({
  title: String,
  content: String,
  iconName: {
    type: String,
    default: null,
  }, // iconImg는 optional임.
  backColor: String,
});

const iconImgSrc = computed(() => {
  if (props.iconName != null) {
    // 이미지가 존재하는 경우에만 이미지 경로를 생성하여 반환
    return new URL(
      `/src/assets/icons/svg/${props.iconName}.svg`,
      import.meta.url
    ).href;
  } else {
    // 이미지가 없는 경우 빈 문자열 반환
    return '';
  }
});
</script>

<style lang="scss">
.rectangleMenu {
  border-radius: unit(10);
  padding: unit(20) !important;

  &_title {
    color: #1a1a1a;
    padding: unit(5) 0;
    font-size: unit(18);
    font-style: normal;
    font-weight: 700;
    line-height: normal;
  }
  &_content {
    color: #929292;
    margin-bottom: unit(22);
    font-size: unit(12);
    font-style: normal;
    font-weight: 500;
    line-height: normal;
  }
  &_img {
    display: flex;
    justify-content: right;
    margin-bottom: unit(-5);
    .icon {
      // 피그마에서 납부관리, 원생관리 icon width가 서로 다름
      // 우선 51로 통일하여 처리
      width: unit(51);
      height: unit(59);
    }
  }
}
</style>
