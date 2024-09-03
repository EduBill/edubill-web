<template>
  <page-header :title="'수강 관리'" :back="true" />
  <div class="page-container">
    <header class="header-section">
      <div
        :class="`select-btn ${useClassInfoModal ? 'select-active' : ''}`"
        @click="handleSelectClass"
      >
        <div>반 선택하기</div>
        <svg-icon
          name="chevronRight"
          :class="`${useClassInfoModal ? 'select-active icon' : ''}`"
        ></svg-icon>
      </div>
      <SelectClassModal
        :use-modal="useClassInfoModal"
        :handle-modal-click="handleSelectClass"
        @selected-class="handleClassInfo"
      />
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
    <main class="content-container">
      <div v-for="studentInfo in studentsInfo" :key="studentInfo.studentId">
        <StudentInfoItem :student-info="studentInfo" />
      </div>
      <div id="target" class="targetRef"></div>
    </main>
    <div class="add-student-button" @click="handleClickAddStudent">
      <svg-icon name="plusOutline" class="icon"></svg-icon>
      <div>새로운 원생 추가</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { onMounted, onUnmounted, ref } from 'vue';
import PageHeader from '@/components/commons/headers/PageHeader.vue';
import StudentInfoItem from '@/components/resources/student/StudentInfoItem.vue';
import {
  classInfoDataType,
  StudentApi,
  studentInfoContentType,
} from '@/api/StudentApi';
import { intersectionObserver } from '@/utils/intersectionObserver';
import SelectClassModal from '@/components/resources/student/SelectClassModal.vue';

const studentApi = new StudentApi();
const studentsInfo = ref<studentInfoContentType[]>([]);
const router = useRouter();
const observer = ref<IntersectionObserver | null>(null);
const page = ref(0);
const hasMoreData = ref(true);
const useClassInfoModal = ref(false);
const classInfoData = ref<classInfoDataType[]>([]);

onMounted(async () => {
  resetState();
  await getStudentInfo();
  setupObserver();
});

onUnmounted(() => {
  if (observer.value) {
    observer.value.disconnect();
  }
});
function handleSelectClass() {
  console.log(useClassInfoModal.value);
  useClassInfoModal.value = !useClassInfoModal.value;
}
function handleClassInfo(value) {
  if (value) {
    classInfoData.value = value;
  }
  // console.log('classinfo data', classInfoData.value);
}

function handleClickAddStudent() {
  router.push({ name: 'addNewStudent' });
}

async function getStudentInfo() {
  const res = await studentApi.getAllStudentInfo(page.value, 6);
  if (Array.isArray(res.data.content)) {
    if (res.data.content.length === 0) {
      hasMoreData.value = false;
    } else {
      studentsInfo.value = [...studentsInfo.value, ...res.data.content];
      page.value++;
    }
  }
}

// 무한스크롤
function setupObserver() {
  if (observer.value) {
    observer.value.disconnect();
  }
  observer.value = intersectionObserver(hasMoreData, page, getStudentInfo);
  const targetElement = document.getElementById('target');
  if (targetElement && observer.value) {
    observer.value.observe(targetElement);
  }
}

function resetState() {
  page.value = 0;
  hasMoreData.value = true;
  studentsInfo.value = [];
}
</script>

<style lang="scss" scoped>
.page-container {
  padding-top: unit(20) + $page-header-height;
  height: 100vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;

  .modal-content {
    width: 200px;
    height: 200px;
    background-color: white;
  }

  .header-section {
    padding: 0 unit(20);
    display: flex;
    flex-direction: column;
    gap: unit(12);
    margin: unit(12) 0;
    margin-bottom: unit(20);

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
    .select-active {
      border-color: $color-primary;
      color: $color-primary;
      .icon {
        transform: rotate(90deg);
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

  .content-container {
    overflow: scroll;
  }

  .add-student-button {
    position: fixed;
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
