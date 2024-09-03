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
              v-model="addStudentData.studentName"
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
              v-model="studentPhoneNumber[0]"
              class="phone-input"
              type="text"
              placeholder="000"
            />
            <input
              id="student-phone"
              v-model="studentPhoneNumber[1]"
              class="phone-input"
              type="text"
              placeholder="0000"
            />
            <input
              id="student-phone"
              v-model="studentPhoneNumber[2]"
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
              v-model="addStudentData.parentName"
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
              v-model="parentsPhoneNumber[0]"
              class="phone-input"
              type="text"
              placeholder="000"
            />
            <input
              id="parents-phone"
              v-model="parentsPhoneNumber[1]"
              class="phone-input"
              type="text"
              placeholder="0000"
            />
            <input
              id="parents-phone"
              v-model="parentsPhoneNumber[2]"
              class="phone-input"
              type="text"
              placeholder="0000"
            />
          </div>
        </div>
      </ul>
      <ul class="category-container" @click="handleAcademicInfo">
        <div class="subtitle">학적 정보</div>
        <div class="input-container">
          <div :class="`input-btn ${isSelected ? 'selected' : ''}`">
            <div>{{ studentInfoData.school }}</div>
            <svg-icon class="icon-chevronRight" name="chevronRight"></svg-icon>
          </div>
          <div :class="`input-btn ${isSelected ? 'selected' : ''}`">
            <div>{{ studentInfoData.grade }}</div>
            <svg-icon class="icon-chevronRight" name="chevronRight"></svg-icon>
          </div>
          <div :class="`input-btn ${isSelected ? 'selected' : ''}`">
            <div>{{ studentInfoData.field }}</div>
            <svg-icon class="icon-chevronRight" name="chevronRight"></svg-icon>
          </div>
        </div>
        <div class="input-container">
          <div
            :class="`input-btn school-name ${isSelected ? 'selected' : ''} `"
          >
            <div>{{ studentInfoData.schoolName }}</div>
          </div>
        </div>
      </ul>
      <StudentInfoModal
        :use-modal="useStudentInfoModal"
        :handle-modal-click="handleAcademicInfo"
        @selected-value="handleStudentInfo"
      ></StudentInfoModal>
      <ul class="category-container">
        <div class="subtitle">참여하는 수업</div>
        <div class="input-container" @click="handleSelectClass">
          <div class="input-btn">
            <div>선택해주세요</div>
            <svg-icon name="chevronRight"></svg-icon>
          </div>
        </div>
        <div v-for="classInfo in classInfoData" :key="classInfo.id">
          <div class="selected-class-item">
            <span>{{ classInfo.className }}</span>
            <!-- 시간 표시 어떻게 할건지 정해야함 -->
            <span
              >{{ classInfo.classTime[0].startTime }}~{{
                classInfo.classTime[0].endTime
              }}</span
            >
            <svg-icon
              name="purpleClose"
              @click="deleteSelectedClass(classInfo.id)"
            />
          </div>
        </div>
      </ul>
      <SelectParticipatingClass
        :use-modal="useClassInfoModal"
        :handle-modal-click="handleSelectClass"
        @selected-class="handleClassInfo"
      />
      <ul class="category-container">
        <div class="subtitle">메모</div>
        <div class="input-container">
          <input
            id="student-name"
            v-model="addStudentData.memo"
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
        @click="handleSubmit"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import StudentInfoModal from '../../../components/resources/student/StudentInfoModal.vue';
import Buttons from '@/components/resources/buttons/Buttons.vue';
import PageHeader from '@/components/commons/headers/PageHeader.vue';
import UiForm from '@/components/molecules/forms/Form.vue';
import { classInfoDataType, StudentApi } from '@/api/StudentApi';
import SelectParticipatingClass from '@/components/resources/student/SelectParticipatingClass.vue';

const router = useRouter();
const studentApi = new StudentApi();
const useStudentInfoModal = ref(false);
const useClassInfoModal = ref(false);
const studentInfoData = ref({
  school: '학교급',
  grade: '학년',
  field: '계열',
  schoolName: '학교 명 입력',
});
const classInfoData = ref<classInfoDataType[]>([]);
const studentPhoneNumber = ref(['010', '', '']);
const parentsPhoneNumber = ref(['010', '', '']);
const addStudentData = ref({
  studentName: '',
  studentPhoneNumber: '',
  parentName: '',
  parentPhoneNumber: '',
  groupIds: [] as number[],
  schoolType: '',
  gradeLevel: '',
  departmentType: '',
  schoolName: '',
  memo: '',
});
const isSelected = ref(false);
function handleAcademicInfo() {
  useStudentInfoModal.value = !useStudentInfoModal.value;
}

function handleStudentInfo(value) {
  if (value) {
    isSelected.value = true;
    studentInfoData.value = value;
  }
}

function handleSelectClass() {
  console.log(useClassInfoModal);
  useClassInfoModal.value = !useClassInfoModal.value;
}
function handleClassInfo(value) {
  if (value) {
    classInfoData.value = value;
  }
  // console.log('classinfo data', classInfoData.value);
}
function handleSubmit() {
  const groupIdArray = classInfoData.value.map(item => item.id);
  addStudentData.value = {
    ...addStudentData.value,
    groupIds: groupIdArray,
    schoolType: studentInfoData.value.school,
    gradeLevel: studentInfoData.value.grade,
    departmentType: studentInfoData.value.field,
    schoolName: studentInfoData.value.schoolName,
    studentPhoneNumber: `${studentPhoneNumber.value[0]}${studentPhoneNumber.value[1]}${studentPhoneNumber.value[2]}`,
    parentPhoneNumber: `${parentsPhoneNumber.value[0]}${parentsPhoneNumber.value[1]}${parentsPhoneNumber.value[2]}`,
  };
  console.log(JSON.parse(JSON.stringify(addStudentData.value)));
  const data = JSON.parse(JSON.stringify(addStudentData.value));
  postStudentInfo(data);
}

function deleteSelectedClass(id: number) {
  const index = classInfoData.value.findIndex(element => element.id === id);
  if (index !== -1) {
    classInfoData.value.splice(index, 1);
  }
}

async function postStudentInfo(data) {
  await studentApi.addStudent(data).then(() => router.push('/studentManage'));
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
    margin-bottom: unit(20);
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

    .selected {
      color: black;
      justify-content: center;
      .icon-chevronRight {
        display: none;
      }
    }
    .school-name {
      justify-content: flex-start;
    }
  }
}
.selected-class-item {
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: unit(10) unit(20);
  border-radius: unit(8);
  border: unit(1) solid $color-primary;
  background: #fbf9ff;
  font-size: 15px;
  color: $color-primary;
  font-weight: 600;
}
</style>
