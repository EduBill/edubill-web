<template>
  <Modal :use-modal="props.useModal" @close="handleClose">
    <div class="modal_frame_container">
      <div class="modal_content_container">
        <header class="modal-header">
          <div class="title">참여하는 수업 선택</div>
          <div class="subtitle">
            입력하신 학적 정보와 일치하는 반 정보만 노출됩니다
          </div>
        </header>
        <main class="modal-main">
          <div v-if="classList.length === 0" class="no-data">
            <div class="alert-icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="100%"
                height="100%"
                viewBox="0 0 40 40"
                fill="none"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M36 20C36 24.2435 34.3143 28.3131 31.3137 31.3137C28.3131 34.3143 24.2435 36 20 36C15.7565 36 11.6869 34.3143 8.68629 31.3137C5.68571 28.3131 4 24.2435 4 20C4 15.7565 5.68571 11.6869 8.68629 8.68629C11.6869 5.68571 15.7565 4 20 4C24.2435 4 28.3131 5.68571 31.3137 8.68629C34.3143 11.6869 36 15.7565 36 20ZM22 28C22 28.5304 21.7893 29.0391 21.4142 29.4142C21.0391 29.7893 20.5304 30 20 30C19.4696 30 18.9609 29.7893 18.5858 29.4142C18.2107 29.0391 18 28.5304 18 28C18 27.4696 18.2107 26.9609 18.5858 26.5858C18.9609 26.2107 19.4696 26 20 26C20.5304 26 21.0391 26.2107 21.4142 26.5858C21.7893 26.9609 22 27.4696 22 28ZM20 10C19.4696 10 18.9609 10.2107 18.5858 10.5858C18.2107 10.9609 18 11.4696 18 12V20C18 20.5304 18.2107 21.0391 18.5858 21.4142C18.9609 21.7893 19.4696 22 20 22C20.5304 22 21.0391 21.7893 21.4142 21.4142C21.7893 21.0391 22 20.5304 22 20V12C22 11.4696 21.7893 10.9609 21.4142 10.5858C21.0391 10.2107 20.5304 10 20 10Z"
                  fill="#f2f2f2"
                />
              </svg>
            </div>
            <div>생성된 반 정보가 없습니다</div>
            <div class="add-class-button" @class="handleAddClassBtn">
              <svg-icon name="plusOutline" class="icon"></svg-icon>
              <div>새로운 반 추가</div>
            </div>
          </div>
          <div v-for="(classItem, index) in classList" :key="index">
            <div class="class-item-container">
              <div class="ui-checkbox">
                <input
                  :id="classItem.groupId.toString()"
                  v-model="selectedClass"
                  type="checkbox"
                  :value="{
                    id: classItem.groupId,
                    className: classItem.groupName,
                    classTime: classItem.classTimeResponseDtos,
                  }"
                />
                <label :for="classItem.groupId.toString()">
                  <div>{{ classItem.groupName }}</div>
                </label>
              </div>
              <button
                class="class-detail-btn"
                @click="handleDetailBtnClick(classItem.groupId)"
              >
                상세보기
              </button>
            </div>
          </div>
          <div id="target" className="targetRef"></div>
        </main>
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
import { onMounted, onUnmounted, ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import Buttons from '../buttons/Buttons.vue';
import SelectClassItem from './SelectClassItem.vue';
import { classData, StudentApi } from '@/api/StudentApi';
import Modal from '@/components/modules/modal/Modal.vue';
import { intersectionObserver } from '@/utils/intersectionObserver';

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

const studentApi = new StudentApi();
const selectedClass = ref<String[]>([]);
const page = ref(0);
const hasMoreData = ref(true);
const classList = ref<classData[]>([]);
const observer = ref<IntersectionObserver | null>(null);
const router = useRouter();
const emit = defineEmits(['selectedClass']);

function resetState() {
  page.value = 0;
  hasMoreData.value = true;
  classList.value = [];
}

function handleSubmit() {
  console.log(selectedClass.value);
  emit('selectedClass', selectedClass.value);
  // selectedClass.value.push();
  props.handleModalClick();
}

function handleClose(value) {
  if (value) {
    props.handleModalClick();
  }
}

function handleDetailBtnClick(id: number) {
  router.push(`/classDetail?id=${id}`);
}

async function getClassInfo() {
  const res = await studentApi.getGroupInfo(page.value, 10);
  if (Array.isArray(res.data.content)) {
    if (res.data.content.length === 0) {
      hasMoreData.value = false;
    } else {
      classList.value = [...classList.value, ...res.data.content];
      page.value++;
    }
  }
}

function setupObserver() {
  if (observer.value) {
    observer.value.disconnect();
  }

  observer.value = intersectionObserver(hasMoreData, page, getClassInfo);
  const targetElement = document.getElementById('target');
  if (targetElement && observer.value) {
    observer.value.observe(targetElement);
  }
}

onMounted(async () => {
  if (props.useModal) {
    resetState();
    await getClassInfo();
    setupObserver();
  }
});

onUnmounted(() => {
  if (observer.value) {
    observer.value.disconnect();
  }
});

//modal open 상태가 바뀌면 -> reset하고, 다시 data fetch, observer 세팅
watch(
  () => props.useModal,
  newVal => {
    if (newVal) {
      resetState();
      getClassInfo().then(() => {
        setupObserver();
      });
    } else if (observer.value) {
      observer.value.disconnect();
    }
  }
);

function handleAddClassBtn() {
  router.push('/studentManage/newClass');
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
  height: 60%;
  padding: unit(40) unit(20);
  overflow: hidden;
}
.modal_content_container {
  display: flex;
  flex-direction: column;
  gap: unit(20);
  height: 100%;
  position: relative;

  .modal-header {
    display: flex;
    flex-direction: column;
    gap: unit(4);
    .title {
      font-size: 18px;
      font-weight: 600;
    }
    .subtitle {
      font-size: 12px;
      font-weight: 400;
      color: $color-gray-500;
    }
  }

  .modal-main {
    height: 100%;
    overflow: scroll;

    .no-data {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      gap: unit(20);
      color: $color-gray-500;
      font-size: unit(15);
      font-weight: 600;
      .alert-icon {
        width: unit(80);
        height: unit(80);
      }

      .add-class-button {
        display: inline-flex;
        height: unit(48);
        padding: 0px 20px 0px 16px;
        align-items: center;
        gap: unit(12);
        border-radius: unit(24);
        background: #f3edff;
        color: $color-primary;
        cursor: pointer;

        .icon {
          color: white;
        }
      }
    }
    .class-item-container {
      display: flex;
      width: 100%;
      align-items: center;
      justify-content: space-between;
      gap: unit(16);
      padding: unit(8) 0;

      .class-detail-btn {
        padding: 6px 12px;
        border-radius: 8px;
        background: $color-gray-200;
      }
    }
  }
}

.targetRef {
  height: unit(10);
  width: 100%;
}
.submit_button {
  margin-top: unit(36);
}
</style>
