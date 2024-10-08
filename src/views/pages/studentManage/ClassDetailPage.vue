<template>
  <page-header
    :title="'기초반 / 영어 유치원'"
    :back="true"
    :right-items="'삭제'"
    :on-delete="() => handleModalClick()"
  />
  <ul class="classdetail-container">
    <li>
      <h3>수업명</h3>
      <h2>{{ state.groupName }}</h2>
    </li>

    <li>
      <h3>수업 대상</h3>
      <h2>{{ state.schoolType }}/ {{ state.schoolLevel }}</h2>
    </li>
    <li class="classdetail-classtime">
      <h3>수업 시간</h3>
      <ul>
        <li v-for="time in state.schoolTime" :key="time.id">
          <h2>
            {{ time.dayOfWeek
            }}<span> | {{ time.startTime }} ~ {{ time.endTime }}</span>
          </h2>
        </li>
      </ul>
    </li>
    <li>
      <h3>수업료</h3>
      <h2>{{ state.tuition }} 원</h2>
    </li>
    <li>
      <h3>메모</h3>
      <h2>{{ state.memo }}</h2>
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
  <ClassDeleteModal
    :use-modal="useModal"
    :handle-modal-click="handleModalClick"
    :delete="onDelete"
    :group-id="Number(route.query.groupId)"
  />
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, reactive, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import PageHeader from '@/components/commons/headers/PageHeader.vue';
import Buttons from '@/components/resources/buttons/Buttons.vue';
import ClassDeleteModal from '@/components/resources/class/ClassDeleteModal.vue';
import { GroupApi } from '@/api/GroupApi';
import { State } from '@/stores/typings/types.addNewClass';

const router = useRouter();
const useModal = ref(false);
const state = reactive<State>({
  groupName: '',
  schoolType: '',
  schoolLevel: '',
  schoolTime: [],
  day: '월',
  forwardTime: '',
  backwardTime: '',
  tuition: '',
  memo: '',
  check: false,
  groupId: 0,
});

const route = useRoute();

const groupApi = new GroupApi();

function handleModalClick() {
  useModal.value = !useModal.value;
  useModal.value
    ? (document.body.style.overflowY = 'hidden')
    : (document.body.style.overflowY = 'auto');
}

async function onDelete(id: number) {
  try {
    console.log(id);
    const res = await groupApi.deleteGroup(id);
    return res;
  } catch {
    console.log('반 삭제 실패');
  } finally {
    handleModalClick();
  }
}

async function onCheckGroup(id: number) {
  try {
    const res = await groupApi.getGroupListDetail(id);
    return res;
  } catch {
    console.log('반 조회 실패');
    router.back();
  }
}

onMounted(async () => {
  state.groupId = Number(route.query.groupId);
  const groupData = (await onCheckGroup(state.groupId))?.data;

  if (groupData) {
    state.groupName = groupData.groupName;
    state.schoolType = groupData.schoolType;
    state.schoolLevel = groupData.gradeLevel;
    state.schoolTime = groupData.classTimeResponseDtos;
    state.tuition = groupData.tuition;
    state.memo = groupData.groupMemo;
  }
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
