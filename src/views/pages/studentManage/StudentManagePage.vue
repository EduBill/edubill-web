<template>
  <page-header :title="'새로운 원생 추가'" :back="true" />
  <div class="page-container">
    <ui-form ref="refForm" class="form-container">
      <ul class="category-container">
        <div class="subtitle">학생 기본 정보</div>
        <div class="input-container">
          <label for="student-name">이름</label>
          <div class="input-field">
            <input
              id="student-name"
              class="name-input"
              type="text"
              placeholder="예) 서울고등학교"
            />
          </div>
        </div>
        <div class="input-container">
          <label for="student-phone">휴대번호</label>
          <div class="input-field">
            <input
              id="student-phone"
              class="phone-input"
              type="text"
              placeholder="000"
            />
            <input
              id="student-phone"
              class="phone-input"
              type="text"
              placeholder="0000"
            />
            <input
              id="student-phone"
              class="phone-input"
              type="text"
              placeholder="0000"
            />
          </div>
        </div>
      </ul>
      <ul class="category-container">
        <div class="subtitle">학부모 기본 정보</div>
        <div class="input-container">
          <label for="parents-name">이름</label>
          <div class="input-field">
            <input
              id="parents-name"
              class="name-input"
              type="text"
              placeholder="예) 서울고등학교"
            />
          </div>
        </div>
        <div class="input-container">
          <label for="parents-phone">휴대번호</label>
          <div class="input-field">
            <input
              id="parents-phone"
              class="phone-input"
              type="text"
              placeholder="000"
            />
            <input
              id="parents-phone"
              class="phone-input"
              type="text"
              placeholder="0000"
            />
            <input
              id="parents-phone"
              class="phone-input"
              type="text"
              placeholder="0000"
            />
          </div>
        </div>
      </ul>
      <ul class="category-container" @click="handleModalClick">
        <div class="subtitle">학적 정보</div>
        <div class="input-container">
          <div class="input-btn">
            <div>학교급</div>
            <svg-icon name="chevronRight"></svg-icon>
          </div>
          <div class="input-btn">
            <div>학년</div>
            <svg-icon name="chevronRight"></svg-icon>
          </div>
          <div class="input-btn">
            <div>계열</div>
            <svg-icon name="chevronRight"></svg-icon>
          </div>
        </div>
        <div class="input-container">
          <div class="input-btn">
            <div>학교 명 입력</div>
          </div>
        </div>
      </ul>
      <StudentInfoModal
        :use-modal="useModal"
        :handle-modal-click="handleModalClick"
      ></StudentInfoModal>
      <ul class="category-container">
        <div class="subtitle">참여하는 수업</div>
        <div class="input-container">
          <div class="input-btn">
            <div>선택해주세요</div>
            <svg-icon name="chevronRight"></svg-icon>
          </div>
        </div>
      </ul>
      <ul class="category-container">
        <div class="subtitle">메모</div>
        <div class="input-container">
          <input
            id="student-name"
            class="memo-input"
            type="text"
            placeholder="입력해주세요"
          />
        </div>
      </ul>
    </ui-form>
    <div class="btn-container">
      <Buttons
        class="submit-button"
        variants="long"
        color="selected"
        text="작성완료"
        :onclick="handleSubmit"
      />
    </div>
  </div>
  <!-- <div class="container">
    <div @click="handleModalClick">클릭해봐</div>
    <StudentInfoModal
      :use-modal="useModal"
      :handle-modal-click="handleModalClick"
    ></StudentInfoModal>
  </div> -->
</template>

<script setup lang="ts">
import { ref } from 'vue';
import Modal from '../../../components/modules/modal/Modal.vue';
import StudentInfoModal from '../../../components/resources/student/StudentInfoModal.vue';
import RectangleTextButton from '@/components/resources/buttons/RectangleTextButton.vue';
import Buttons from '@/components/resources/buttons/Buttons.vue';
import PageHeader from '@/components/commons/headers/PageHeader.vue';
import UiForm from '@/components/molecules/forms/Form.vue';

const useModal = ref(false);

function handleModalClick() {
  useModal.value = !useModal.value;
}
</script>

<style lang="scss" scoped>
.page-container {
  padding: unit(20);
  padding-top: unit(20) + $page-header-height;
  height: 100%;
  position: relative;
  .modal-content {
    width: 200px;
    height: 200px;
    background-color: white;
  }

  .btn-container {
    width: 100%;
    padding: 0 unit(20);
    position: absolute;
    bottom: unit(0);
    left: 0;
    .submit-button {
      box-sizing: border-box;
    }
  }
}

.category-container {
  display: flex;
  flex-direction: column;
  gap: unit(10);
  margin-bottom: unit(40);
  .subtitle {
    font-size: 18px;
    font-weight: 600;
  }
  .input-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 12px;
    font-weight: 600;
    gap: unit(8);
    .input-field {
      width: unit(278);
      display: flex;
      gap: unit(8);
    }
    .phone-input,
    .name-input,
    .input-btn,
    .memo-input {
      width: 100%;
      padding: 10px 20px;
      border-radius: 8px;
      border: 1px solid var(--Gray-Gray-200, #f1f1f1);
    }
    .input-btn {
      display: flex;
      justify-content: space-between;
      color: var(--Gray-Gray-500, #9f9f9f);
      font-weight: 400;
    }
  }
}
</style>
