import { ContentType, HttpClient, RequestParams } from './http-client';
import { setAccessToken } from '@/modules/axios/index';

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

  postExcelData = (data: FormData, date: String) => {
    return this.request({
      path: `/v1/excel/upload?yearMonth=${date}`,
      method: 'post',
      body: data,
    });
  };
}
