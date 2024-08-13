<template>
  <Modal :use-modal="props.useModal" @close="handleClose">
    <div class="modal_frame_container">
      <div class="modal_content_container">
        <div class="title">학적 정보 선택 및 입력</div>
        <div class="category_container">
          <div class="subtitle">학교급</div>
          <div class="select_container">
            <div
              v-for="item in schoolList.filter(school => school.id > 0)"
              :key="item.id"
              :value="item.value"
            >
              <Buttons
                variants="short"
                :color="item.selected ? 'selected' : 'disabled'"
                :text="item.value"
                @click="() => handleSelectBox(schoolList, item.id, 'school')"
              />
            </div>
          </div>
          <div class="ui-checkbox">
            <input
              id="school"
              v-model="schoolList[0].selected"
              type="checkbox"
              @click="() => handleSelectBox(schoolList, 0, 'school')"
              @change="handleInit"
            />
            <label for="school">
              <div>기타/해당사항 없음</div>
            </label>
          </div>
        </div>
        <div class="category_container">
          <div class="subtitle">학년</div>
          <div class="select_container">
            <div
              v-for="item in gradeList.filter(grade => grade.id > 0)"
              :key="item.id"
              :value="item.value"
            >
              <Buttons
                variants="short"
                :color="item.selected ? 'selected' : 'disabled'"
                :text="item.value"
                @click="() => handleSelectBox(gradeList, item.id, 'grade')"
              />
            </div>
          </div>
          <div class="ui-checkbox">
            <input
              id="grade"
              v-model="gradeList[0].selected"
              type="checkbox"
              @click="() => handleSelectBox(gradeList, 0, 'grade')"
              @change="handleInit"
            />
            <label for="grade">
              <div>기타/해당사항 없음</div>
            </label>
          </div>
        </div>
        <div class="category_container">
          <div class="subtitle">계열</div>
          <div class="select_container">
            <div
              v-for="item in fieldList.filter(field => field.id > 0)"
              :key="item.id"
              :value="item.value"
            >
              <Buttons
                variants="short"
                :color="item.selected ? 'selected' : 'disabled'"
                :text="item.value"
                @click="() => handleSelectBox(fieldList, item.id, 'field')"
              />
            </div>
          </div>
          <div class="ui-checkbox">
            <input
              id="field"
              v-model="fieldList[0].selected"
              type="checkbox"
              @click="() => handleSelectBox(fieldList, 0, 'field')"
              @change="handleInit"
            />
            <label for="field">
              <div>기타/해당사항 없음</div>
            </label>
          </div>
        </div>
        <div class="category_container">
          <div class="subtitle">학교명</div>
          <div class="select_container">
            <input
              v-model="schoolName"
              class="school_input"
              type="text"
              placeholder="예) 서울고등학교"
            />
          </div>
          <div class="ui-checkbox">
            <input
              id="school-name"
              type="checkbox"
              :checked="isSchoolNameChecked"
              @change="handleSchoolNameInput"
            />
            <label for="school-name">
              <div>기타/해당사항 없음</div>
            </label>
          </div>
        </div>
      </div>
      <Buttons
        class="submit_button"
        variants="long"
        color="selected"
        text="선택"
        :onclick="handleSubmit"
      />
    </div>
  </Modal>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import Buttons from '../buttons/Buttons.vue';
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
const schoolName = ref('');
const isSchoolNameChecked = ref(false);
const schoolList = ref([
  { id: 0, value: '해당사항 없음', selected: false },
  { id: 1, value: '초등학교', selected: false },
  { id: 2, value: '중학교', selected: false },
  { id: 3, value: '고등학교', selected: false },
]);

const gradeList = ref([
  { id: 0, value: '해당사항 없음', selected: false },
  { id: 1, value: '1학년', selected: false },
  { id: 2, value: '2학년', selected: false },
  { id: 3, value: '3학년', selected: false },
  { id: 4, value: '4학년', selected: false },
  { id: 5, value: '5학년', selected: false },
  { id: 6, value: '6학년', selected: false },
]);
const fieldList = ref([
  { id: 0, value: '해당사항 없음', selected: false },
  { id: 1, value: '문과', selected: false },
  { id: 2, value: '이과', selected: false },
  { id: 3, value: '예체능', selected: false },
  { id: 4, value: '기타', selected: false },
]);

const selectedValue = {
  school: '',
  grade: '',
  field: '',
  schoolName: '',
};
const emit = defineEmits(['selectedValue']);
function handleSelectBox(list, id: number, key: string) {
  list.forEach(item => {
    item.selected = item.id === id;
    if (item.selected) {
      selectedValue[key] = item.value;
    }
  });
}
function handleInit(event: Event) {
  const target = event.target as HTMLInputElement;
  const isChecked = target.checked;
  const id = target.id;
  if (!isChecked) {
    selectedValue[id] = '';
  }
}
function handleSchoolNameInput(event: Event) {
  //입력안함 체크할 경우 input 값 지우기
  const target = event.target as HTMLInputElement;
  isSchoolNameChecked.value = target.checked;
  if (isSchoolNameChecked.value) {
    schoolName.value = '';
  }
}

watch(schoolName, newValue => {
  //인풋에 입력을 할 때 체크 해제
  if (newValue !== '') {
    isSchoolNameChecked.value = false;
  }
});

function handleSubmit() {
  selectedValue.schoolName =
    schoolName.value === '' ? '해당사항없음' : schoolName.value;
  for (const key in selectedValue) {
    if (selectedValue.hasOwnProperty(key) && selectedValue[key] === '') {
      alert(`입력을 완료해주세요`);
      return;
    }
  }

  emit('selectedValue', selectedValue);
  props.handleModalClick();
}

function handleClose(value) {
  if (value) {
    props.handleModalClick();
  }
}
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
  overflow: scroll;
}
.modal_content_container {
  display: flex;
  flex-direction: column;
  gap: unit(20);
  height: auto;
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
  margin-top: unit(36);
}
.school_input {
  width: 100%;
  padding: 10px 20px;
  border-radius: 8px;
  border: 1px solid var(--Gray-Gray-200, #f1f1f1);
}
</style>
