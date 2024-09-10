import { ExcelApi } from '@/api/ExcelApi';
import { usePaymentStatusStore } from '@/stores/modules/payment';

export const handleFileUpload = async (event: any, date) => {
  const paymentStatusStore = usePaymentStatusStore();
  const excelApi = new ExcelApi();

  const file = event.target.files[0];
  if (!file) {
    return;
  }
  const ExcelUploadFormData = new FormData();
  ExcelUploadFormData.append('file', file);
  ExcelUploadFormData.append('bankCode', '004');
  try {
    console.log('파일 업로드 중');
    const res = await excelApi.postExcelData(ExcelUploadFormData, date);
    // 응답 상태 코드나 데이터를 체크
    if (res.status === 200) {
      console.log('파일 업로드 성공');
      //엑셀 업로드를 처음 진행할 경우, firstExcelUploaded 상태를 바꿔줌
      if (paymentStatusStore.firstExcelUploaded !== true) {
        paymentStatusStore.setFirstExcelUploaded(true);
      }
      paymentStatusStore.setExcelUploaded(true);
      excelApi.updateIsExcelUploaded(date);
    } else {
      console.log('postExcelData 실패, 상태 코드:', res.status);
    }
  } catch (error) {
    console.log('오류 발생:', error);
  }
};
