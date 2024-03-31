<template>
  <div class="container_rectangleMenu" :style="{ backgroundColor: backColor }">
    <p class="title_rectangleMenu">{{ title }}</p>
    <p class="content_rectangleMenu">{{ content }}</p>
    <div class="img_rectangleMenu">
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
.container_rectangleMenu {
  border-radius: 10px;
  padding: 20px !important;
}
.title_rectangleMenu {
  color: #1a1a1a;
  padding: 5px 0;
  font-size: 18px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
}
.content_rectangleMenu {
  color: #929292;
  margin-bottom: 22px;
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
}
.img_rectangleMenu {
  display: flex;
  justify-content: right;
  margin-bottom: -5px;
}
.img_rectangleMenu img {
  height: 59px;
}
</style>
