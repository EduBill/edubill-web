<template>
  <div class="rectangleMenu" :style="{ backgroundColor: backColor }">
    <p class="rectangleMenu_title">{{ title }}</p>
    <p class="rectangleMenu_content">{{ content }}</p>
    <div class="rectangleMenu_img">
      <img v-if="iconImg != null" :src="iconImgSrc" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, defineProps } from 'vue';

interface Props {
  title: string;
  content: string;
  iconImg?: string | null; // iconImg는 optional임.
  backColor: string;
}

const props = defineProps<Props>();

console.log(props.title);
console.log(props.iconImg);

const iconImgSrc = computed(() => {
  if (props.iconImg != null) {
    // 이미지가 존재하는 경우에만 이미지 경로를 생성하여 반환
    return new URL(
      `/src/assets/icons/png/${props.iconImg}.png`,
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
    img {
      height: 59px;
    }
  }
}
</style>
