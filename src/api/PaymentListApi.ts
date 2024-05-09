import { ContentType, HttpClient, RequestParams } from './http-client';
import { setAccessToken } from '@/modules/axios/index';

setAccessToken(
  'eyJhbGciOiJIUzI1NiJ9.eyJhdXRoIjoiQUNBREVNWSIsInN1YiI6IjAxMDI3ODkyMTY1IiwiaWF0IjoxNzEyMTU2NzIxLCJleHAiOjQ4NjU3NTY3MjF9.p0vjwBv25irPuk0Cbd4iGTRoHbIsN1QJ3W2KC5Dcoaw'
);
// PaymentData 인터페이스 정의
export interface PaymentData {
  paidAmount: number;
  paidDateTime: string;
  studentName: string;
}
interface PaymentListApiResponse {
  data: {
    content: PaymentData[]; // PaymentData 타입의 배열
  };
}
interface PaymentListProps {
  yearMonth: string;
  page: number;
  size: number;
}

export class PaymentListApi<
  SecurityDataType = unknown,
> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags payment-list-api
   * @name
   * @summary 수납내역
   * @request GET:/v1/payment/paidHistories/{yearMonth}
   * @secure
   */

  getPaymentList = (
    props: PaymentListProps
  ): Promise<PaymentListApiResponse> => {
    return this.request({
      path: `/v1/payment/paidHistories/${props.yearMonth}?page=${props.page}&size=${props.size}`,
      method: 'GET',
      type: ContentType.Json,
    });
  };
}
