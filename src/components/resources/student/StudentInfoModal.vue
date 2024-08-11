<template>
  <div>하이</div>
  <Modal :use-modal="props.useModal" @close="props.handleModalClick">
    <div class="modal_frame_container">
      <div class="modal_content_container">
        <div class="title">학적 정보 선택 및 입력</div>
        <div class="category_container">
          <div class="subtitle">학교급</div>
          <div class="select_container">
            <div v-for="item in schoolList" :key="item.id" :value="item.value">
              <Buttons
                variants="short"
                :color="item.selected ? 'selected' : 'disabled'"
                :text="item.value"
                :onclick="() => handleSelectBox(schoolList, item.id)"
              />
            </div>
          </div>
          <Checkbox label="기타/해당사항 없음" />
        </div>
        <div class="category_container">
          <div class="subtitle">학년</div>
          <div class="select_container">
            <div v-for="item in gradeList" :key="item.id" :value="item.value">
              <Buttons
                variants="short"
                :color="item.selected ? 'selected' : 'disabled'"
                :text="item.value"
                :onclick="() => handleSelectBox(gradeList, item.id)"
              />
            </div>
          </div>
          <Checkbox label="기타/해당사항 없음" />
        </div>
        <div class="category_container">
          <div class="subtitle">계열</div>
          <div class="select_container">
            <div v-for="item in fieldList" :key="item.id" :value="item.value">
              <Buttons
                variants="short"
                :color="item.selected ? 'selected' : 'disabled'"
                :text="item.value"
                :onclick="() => handleSelectBox(fieldList, item.id)"
              />
            </div>
          </div>
          <Checkbox label="기타/해당사항 없음" />
        </div>
        <div class="category_container">
          <div class="subtitle">학교명</div>
          <div class="select_container">
            <input
              class="school_input"
              type="text"
              placeholder="예) 서울고등학교"
            />
          </div>
          <Checkbox label="입력안함" />
        </div>
        <Buttons
          class="submit_button"
          variants="long"
          color="selected"
          text="선택"
          :onclick="handleSubmit"
        />
      </div>
    </div>
  </Modal>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import Buttons from '../buttons/Buttons.vue';
import TextCheckbox from '../student/TextCheckbox.vue';
import Checkbox from '@/components/atoms/Checkbox.vue';
import Modal from '@/components/modules/modal/Modal.vue';
const props = defineProps({
  useModal: {
    type: Boolean,
    required: true,
  },
  handleModalClick: {
    type: Function,
    required: true,
  },
});

const schoolList = ref([
  { id: 0, value: '초등학교', selected: true },
  { id: 1, value: '중학교', selected: false },
  { id: 2, value: '고등학교', selected: false },
]);

const gradeList = ref([
  { id: 0, value: '1학년', selected: true },
  { id: 1, value: '2학년', selected: false },
  { id: 2, value: '3학년', selected: false },
  { id: 3, value: '4학년', selected: false },
  { id: 4, value: '5학년', selected: false },
  { id: 5, value: '6학년', selected: false },
]);
const fieldList = ref([
  { id: 0, value: '문과', selected: true },
  { id: 1, value: '이과', selected: false },
  { id: 2, value: '예체능', selected: false },
  { id: 3, value: '기타', selected: false },
]);
function handleSelectBox(list, id: number) {
  list.forEach(item => {
    item.selected = item.id === id;
  });
}
function handleSubmit() {}
</script>

<style lang="scss" scoped>
.modal_frame_container {
  width: 100%;
  border-radius: 20px 20px 0px 0px;
  background: #fff;
  position: absolute;
  bottom: 0;
  left: 0;
  height: 80%;
  padding: unit(40) unit(20);
}
.modal_content_container {
  display: flex;
  flex-direction: column;
  gap: unit(20);
  height: 100%;
  position: relative;
}
.title {
  font-size: 18px;
  font-weight: 600;
}
.category_container {
  display: flex;
  flex-direction: column;
  gap: unit(8);
}
.subtitle {
  font-size: 15px;
  font-weight: 600;
}
.select_container {
  display: flex;
  width: 100%;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: unit(8);
}
.submit_button {
  position: absolute;
  bottom: unit(0);
}
.school_input {
  width: 100%;
  padding: 10px 20px;
  border-radius: 8px;
  border: 1px solid var(--Gray-Gray-200, #f1f1f1);
}
</style>
