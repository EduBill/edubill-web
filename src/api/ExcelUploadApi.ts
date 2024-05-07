import { ContentType, HttpClient, RequestParams } from './http-client';
import { setAccessToken } from '@/modules/axios/index';

setAccessToken(
    'eyJhbGciOiJIUzI1NiJ9.eyJhdXRoIjoiQUNBREVNWSIsInN1YiI6IjAxMDI3ODkyMTY1IiwiaWF0IjoxNzEyMTU2NzIxLCJleHAiOjQ4NjU3NTY3MjF9.p0vjwBv25irPuk0Cbd4iGTRoHbIsN1QJ3W2KC5Dcoaw'
);
// PaymentData 인터페이스 정의
export interface postDataProps {
    excelFile: string;
    bankCode: string
}


export class ExcelUploadApi<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
    /**
     * No description
     *
     * @tags excel-upload-api
     * @name
     * @summary 엑셀 업로드
     * @request GET:/v1/excel/upload
     * @secure
     */

    postExcelData = (data: FormData) => {
        return this.request({
            path: `/v1/excel/upload`,
            method: 'post',
            body: data
        });
    };
}