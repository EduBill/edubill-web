<template>
  <div class="payManageNav">
    <svg-icon
      class="chevronLeft"
      name="largeChevronLeft"
      @click="clickBackBtn ? router.push(props.clickBackBtn) : router.go(-1)"
    />
    <p>{{ title }}</p>
    <div v-if="plusBtn" class="tooltip_container">
      <input
        id="excelData"
        type="file"
        class="input_file"
        @change="handleFileUpload"
      />
      <label for="excelData" class="label_file">
        <svg-icon class="plus" name="plusOutline" />
      </label>
      <BottomTooltip
        v-if="showTooltip"
        class="plus_tooltip"
        content="언제든 데이터를 업데이트할 수 있습니다"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, onUnmounted, ref, watch } from 'vue';
import SvgIcon from '@/plugins/svg-icon/lib/SvgIcon.vue';
import router from '@/router';
import BottomTooltip from '@/components/molecules/BottomTooltip.vue';
import { ExcelApi } from '@/api/ExcelApi';

import { usePaymentStatusStore } from '@/stores/modules/payment';
const paymentStatusStore = usePaymentStatusStore();

const props = defineProps({
  title: {
    type: String,
    default: '납부관리',
  },
  plusBtn: {
    type: Boolean,
    default: true,
  },
  yearMonth: {
    type: String,
    default: '',
  },
  clickBackBtn: {
    type: String || Number,
    default: -1,
  },
});

const showTooltip = ref(false);

const hideTooltip = () => {
  paymentStatusStore.firstExcelUploaded = false;
  showTooltip.value = false;
};

watch(
  () => paymentStatusStore.firstExcelUploaded,
  newVal => {
    if (newVal) {
      showTooltip.value = true;
    }
  },
  { immediate: true }
);
const emit = defineEmits(['update:excelUploaded']);
const excelUploadApi = new ExcelApi();
onMounted(() => {
  // 컴포넌트가 마운트될 때 'mousedown' 이벤트 리스너를 추가
  // tooltip이 나타났을 때 화면을 터치하면 툴팁 제거
  window.addEventListener('mousedown', hideTooltip);
});

onUnmounted(() => {
  // 컴포넌트가 언마운트될 때 'mousedown' 이벤트 리스너를 제거
  window.removeEventListener('mousedown', hideTooltip);
});

const handleFileUpload = (event: any) => {
  const file = event.target.files[0];
  if (!file) {
    return;
  }
  const ExcelUploadFormData = new FormData();
  ExcelUploadFormData.append('file', file);
  ExcelUploadFormData.append('bankCode', '004');
  console.log('파일업로드합니다');
  try {
    excelUploadApi.postExcelData(ExcelUploadFormData, props.yearMonth);
    paymentStatusStore.setExcelUploaded(true);
    excelUploadApi.updateIsExcelUploaded(props.yearMonth);

    emit('update:excelUploaded');
  } catch (error) {
    console.log(error);
  }
};
</script>

<style lang="scss" scoped>
.payManageNav {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  position: relative;

  p {
    // 다른 요소에 관계없이 중앙에 배치
    position: absolute;
    width: 100%;
    display: flex;
    justify-content: center;

    color: var(--Gray99, #1a1a1a);
    font-size: 18px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
  }
}

.chevronLeft {
  width: unit(32);
  height: unit(32);
  z-index: 10;
}

.tooltip_container {
  // tooltip을 + 아이콘 밑에 배치하기 위함.
  position: relative;
}

.plus {
  width: unit(24);
  height: unit(24);
  z-index: 10;
  position: relative;
  cursor: pointer;

  &_tooltip {
    position: absolute;
    right: unit(-9);
  }
}

.input_file {
  display: none;
}
</style>
