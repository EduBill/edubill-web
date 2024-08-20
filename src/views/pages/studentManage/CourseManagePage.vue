<template>
  <page-header :title="'수강 관리'" :back="true" />

  <div className="page-container">
    <header class="header-section">
      <div class="select-btn">
        <div>반 선택하기</div>

        <svg-icon name="chevronRight"></svg-icon>
      </div>

      <div class="search-btn">
        <input
          class="search-input"
          type="text"
          placeholder="이름/전화번호를 검색해보세요"
        />

        <svg-icon name="chevronRight"></svg-icon>
      </div>

      <div class="filter-container">
        <div class="filter">
          <svg-icon name="circle"></svg-icon>

          <div>미납입자만 보기</div>
        </div>

        <div class="sort">ㄱㄴㄷ순</div>
      </div>
    </header>

    <main></main>

    <div class="add-student-button" @click="handleClickAddStudent">
      <svg-icon name="plusOutline" class="icon"></svg-icon>

      <div>새로운 원생 추가</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';

import PageHeader from '@/components/commons/headers/PageHeader.vue';

const router = useRouter();

function handleClickAddStudent() {
  router.push({
    name: 'addNewStudent',
  });
}
</script>

<style lang="scss" scoped>
.page-container {
  padding: unit(20);

  padding-top: unit(20) + $page-header-height;

  height: 100vh;

  position: relative;

  .modal-content {
    width: 200px;

    height: 200px;

    background-color: white;
  }

  .header-section {
    display: flex;

    flex-direction: column;

    gap: unit(12);

    margin: unit(12) 0;

    .select-btn,
    .search-btn {
      font-size: 15px;

      font-weight: 600;

      width: 100%;

      padding: 10px 20px;

      border-radius: 8px;

      border: 1px solid $color-gray-300;

      display: flex;

      justify-content: space-between;

      align-items: center;

      color: $color-gray-500;

      font-weight: 400;

      line-height: 140%;

      input::placeholder {
        font-size: 15px;

        color: $color-gray-500;
      }
    }

    .filter-container {
      display: flex;

      color: $color-gray-500;

      justify-content: space-between;

      .filter {
        display: flex;

        gap: unit(8);
      }
    }
  }

  .add-student-button {
    position: absolute;

    bottom: unit(20);

    right: unit(20);

    display: flex;

    height: 48px;

    padding: 0px 20px 0px 16px;

    align-items: center;

    gap: 12px;

    border-radius: 24px;

    background: $color-primary;

    color: white;

    box-shadow: 0px 0px 12px 0px rgba(0, 0, 0, 0.2);

    cursor: pointer;

    .icon {
      color: white;
    }
  }
}
</style>
