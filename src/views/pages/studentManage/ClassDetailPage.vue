<template>
  <page-header
    :title="'기초반 / 영어 유치원'"
    :back="true"
    :right-items="'삭제'"
  />
  <ul class="classdetail-container">
    <li>
      <h3>수업명</h3>
      <h2>기초반</h2>
    </li>

    <li>
      <h3>수업 대상</h3>
      <h2>기타/영어 유치원</h2>
    </li>
    <li class="classdetail-classtime">
      <h3>수업 시간</h3>
      <ul>
        <li>
          <h2>월 <span> | 14:00 ~ 18:00</span></h2>
        </li>

        <li>
          <h2>월 <span> | 14:00 ~ 18:00</span></h2>
        </li>
      </ul>
    </li>
    <li>
      <h3>수업료</h3>
      <h2>170,000 원</h2>
    </li>
    <li>
      <h3>메모</h3>
      <h2>화목 수업</h2>
    </li>
  </ul>
  <div class="button-area">
    <Buttons
      class="btn-text"
      variants="long"
      :disabled="false"
      :color="'disabled'"
      :text="'수정'"
    />
    <Buttons
      class="btn-text"
      variants="long"
      :disabled="false"
      :color="'selected'"
      :text="'확인'"
    />
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import PageHeader from '@/components/commons/headers/PageHeader.vue';
import Buttons from '@/components/resources/buttons/Buttons.vue';
import { GroupApi } from '@/api/GroupApi';

const route = useRoute();

onMounted(() => {
  const groupId = route.query.groupId;
  console.log('groupId:', groupId);
});
</script>

<style lang="scss" scoped>
.classdetail-container {
  padding: unit(34) + $page-header-height unit(20) 0 unit(20);
  display: flex;
  flex-direction: column;
  gap: unit(8);

  .classdetail-classtime {
    display: flex;
    align-items: start;
    :deep() {
      li {
        background-color: none;
        padding: 0 0;
      }
      ul {
        display: flex;
        flex-direction: column;
        gap: unit(4);
      }
    }
  }

  :deep() {
    li {
      background-color: #fafafa;
      padding: unit(24) unit(34);
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    h3 {
      font-size: unit(15);
      line-height: unit(21);
      font-weight: 400;
      color: #737373;
    }
    span {
      font-size: unit(15);
      line-height: unit(21);
      font-weight: 400;
      color: #2f2f2f;
    }
    h2 {
      font-size: unit(15);
      line-height: unit(21);
      font-weight: 600;
      color: #2f2f2f;
    }
  }
}
.button-area {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: unit(8);
  margin-top: unit(12);
  .btn-text {
    height: unit(40);
    width: unit(335);
  }

  .btn-text:disabled {
    color: #9f9f9f;
    font-weight: 600;
    background-color: $color-gray-200;
    border: none;
  }
  .selected {
    color: white;
  }
}
</style>
