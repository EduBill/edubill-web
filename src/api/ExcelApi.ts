import { ContentType, HttpClient, RequestParams } from './http-client';
import { setAccessToken } from '@/modules/axios/index';

setAccessToken(
  'eyJhbGciOiJIUzI1NiJ9.eyJhdXRoIjoiQUNBREVNWSIsInN1YiI6IjAxMDI3ODkyMTY1IiwiaWF0IjoxNzEyMTU2NzIxLCJleHAiOjQ4NjU3NTY3MjF9.p0vjwBv25irPuk0Cbd4iGTRoHbIsN1QJ3W2KC5Dcoaw'
);
export class ExcelApi<
  SecurityDataType = unknown,
> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags excel-api
   * @name
   * @summary 엑셀 업로드 상태 수정
   * @request PUT:/v1/excel/status-change/{yearMonth}
   * @secure
   */

  updateIsExcelUploaded = (date: any, params: RequestParams = {}) => {
    return this.request({
      path: `/v1/excel/status-change/${date}`,
      method: 'PUT',
      type: ContentType.Json,
    });
  };

  /**
   * No description
   *
   * @tags excel-upload-api
   * @name
   * @summary 엑셀 업로드
   * @request POST:/v1/excel/upload
   * @secure
   */

  postExcelData = (data: FormData) => {
    return this.request({
      path: `/v1/excel/upload`,
      method: 'post',
      body: data,
    });
  };
}