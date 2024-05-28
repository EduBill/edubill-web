<template>
  <div class="upload_full_container">
    <div class="upload_container">
      <div class="icon">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="40"
          height="40"
          viewBox="0 0 40 40"
          fill="none"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M36 20C36 24.2435 34.3143 28.3131 31.3137 31.3137C28.3131 34.3143 24.2435 36 20 36C15.7565 36 11.6869 34.3143 8.68629 31.3137C5.68571 28.3131 4 24.2435 4 20C4 15.7565 5.68571 11.6869 8.68629 8.68629C11.6869 5.68571 15.7565 4 20 4C24.2435 4 28.3131 5.68571 31.3137 8.68629C34.3143 11.6869 36 15.7565 36 20ZM22 28C22 28.5304 21.7893 29.0391 21.4142 29.4142C21.0391 29.7893 20.5304 30 20 30C19.4696 30 18.9609 29.7893 18.5858 29.4142C18.2107 29.0391 18 28.5304 18 28C18 27.4696 18.2107 26.9609 18.5858 26.5858C18.9609 26.2107 19.4696 26 20 26C20.5304 26 21.0391 26.2107 21.4142 26.5858C21.7893 26.9609 22 27.4696 22 28ZM20 10C19.4696 10 18.9609 10.2107 18.5858 10.5858C18.2107 10.9609 18 11.4696 18 12V20C18 20.5304 18.2107 21.0391 18.5858 21.4142C18.9609 21.7893 19.4696 22 20 22C20.5304 22 21.0391 21.7893 21.4142 21.4142C21.7893 21.0391 22 20.5304 22 20V12C22 11.4696 21.7893 10.9609 21.4142 10.5858C21.0391 10.2107 20.5304 10 20 10Z"
            fill="black"
          />
        </svg>
      </div>
      <div class="text">
        계좌의 월별 데이터를 첨부해야 <br />서비스 제공이 가능합니다.
      </div>
      <input
        id="excelData"
        type="file"
        class="input_file"
        @change="handleFileUpload"
      />
      <label for="excelData" class="label_file">계좌 엑셀데이터 첨부하기</label>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ExcelApi } from '@/api/ExcelApi';

import { usePaymentStatusStore } from '@/stores/modules/payment';
const paymentStatusStore = usePaymentStatusStore();

const excelApi = new ExcelApi();

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
    excelApi.postExcelData(ExcelUploadFormData);
    paymentStatusStore.firstExcelUploaded = true;
  } catch (error) {
    console.log(error);
  }
};
</script>

<style lang="scss" scoped>
.upload_full_container {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  //padding: 60px 53px;
}
.upload_container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  gap: unit(15);
}
.text {
  text-align: center;
}
.input_file {
  display: none;
}
.label_file {
  background-color: #7535ff;
  color: white;
  padding: unit(8) unit(30);
  border-radius: unit(6);
}
</style>
