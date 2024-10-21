<template>
  <page-header :title="'수강 관리'" :back="true" />
  <div class="page-container">
    <header class="header-section">
      <div
        :class="`select-btn ${useClassInfoModal || classInfoData.length !== 0 ? 'select-active' : ''}`"
        @click="handleSelectClass"
      >
        <div v-if="classInfoData.length !== 0" class="selected-class">
          <div v-for="(classItem, i) in classInfoData" :key="i">
            {{ classItem.className }}
            <div v-if="i !== classInfoData.length - 1">,</div>
          </div>
        </div>

        <div v-else>반 선택하기</div>
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
      <section class="search-btn">
        <input
          v-model="searchInputText"
          class="search-input"
          type="text"
          placeholder="이름/전화번호를 검색해보세요"
        />
        <svg-icon name="chevronRight" @click="handleSearchWithText"></svg-icon>
      </section>
      <section class="filter-container">
        <div class="filter" @click="handleClickFilter">
          <svg-icon v-if="isOnlyShowUnpaid === false" name="circle"></svg-icon>
          <svg-icon v-else name="checkCircle"></svg-icon>
          <div>미납입자만 보기</div>
        </div>
        <div class="sort" @click="handleClickSortButton">
          <div v-if="studentSortState === 'studentName'">ㄱㄴㄷ순</div>
          <div v-else>최신순</div>
        </div>
      </section>
    </header>
    <main class="content-container">
      <div v-if="studentsInfo.length === 0">검색결과없음</div>
      <div v-for="studentInfo in studentsInfo" :key="studentInfo.studentId">
        <StudentInfoItem
          :student-info="studentInfo"
          :selected-class="searchClassName"
        />
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
import { onMounted, onUnmounted, ref, watch } from 'vue';
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
const isOnlyShowUnpaid = ref(false);
const studentSortState = ref('id');
const searchInputText = ref('');
const searchClassId = ref<Set<number>>(new Set());
const searchClassName = ref<string[]>([]);
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
  //선택된 반 data를 받아온 후 저장
  if (value) {
    classInfoData.value = value;
  }
  searchClassId.value = new Set(classInfoData.value.map(item => item.id));
  searchClassName.value = classInfoData.value.map(item => item.className);

  getSearchData();
}
function handleSearchWithText() {
  getSearchData();
}
async function getSearchData() {
  page.value = 0;
  console.log(searchInputText);
  const res = await studentApi.getFilteredStudents(
    page.value,
    6,
    isOnlyShowUnpaid.value,
    searchClassId.value,
    searchInputText.value,
    studentSortState.value
  );
  if (Array.isArray(res.data.content)) {
    if (res.data.content.length === 0) {
      hasMoreData.value = false;
    }

    if (page.value === 0) {
      studentsInfo.value = [...res.data.content];
    } else {
      studentsInfo.value = [...studentsInfo.value, ...res.data.content];
    }
    page.value++;
  }
}
function handleClickFilter() {
  //미납입자만 보기 버튼 클릭한 경우
  isOnlyShowUnpaid.value = !isOnlyShowUnpaid.value;
}
function handleClickSortButton() {
  //최신순/ㄱㄴㄷ순 정렬
  if (studentSortState.value === 'id') {
    studentSortState.value = 'studentName';
  } else if (studentSortState.value === 'studentName') {
    studentSortState.value = 'id';
  }
}
function handleClickAddStudent() {
  router.push({ name: 'addNewStudent' });
}

async function getStudentInfo() {
  const res = await studentApi.getAllStudentInfo(
    page.value,
    6,
    isOnlyShowUnpaid.value,
    studentSortState.value
  );
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

watch([isOnlyShowUnpaid, studentSortState], (newValue, oldValue) => {
  resetState();
  getSearchData();
  // getStudentInfo();
});
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
    .selected-class {
      color: $color-primary;
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
