import { ContentType, HttpClient, RequestParams } from './http-client';

// PaymentData 인터페이스 정의
export interface PaymentData {
  paymentHistoryId: number;
  studentName: string;
  paidAmount: number;
  paidDateTime: string;
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

export interface PaymentDetail {
  depositorName: string;
  paidAmount: number;
  paymentTypeDescription: string;
  memo: string;
  depositDate: string;
}

export interface unknownPaymentList {
  studentId: number;
  studentName: string;
}
export interface completedPaymentType {
  studentId: number;
  paymentHistoryId: number;
  yearMonth: string;
}

export interface postCompletedTypes {
  code: string;
  errors: [];
  message: string;
  status: number;
}
export class PaymentApi<
  SecurityDataType = unknown,
> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags payment-api
   * @name
   * @summary 납부 현황
   * @request GET:/v1/payment/status/{yearMonth}
   * @secure
   */

  getPaymentStatus = (date: any, params: RequestParams = {}) => {
    return this.request({
      path: `/v1/payment/status/${date}`,
      method: 'GET',
      type: ContentType.Json,
    });
  };

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

  /**
   * No description
   *
   * @tags payment-list-detail-api
   * @name
   * @summary 수납내역
   * @request GET:/v1/payment/paidHistoryDetails/{paymentHistoryId}
   * @secure
   */

  getPaymentDetail = (paymentHistoryId: string) => {
    return this.request({
      path: `/v1/payment/paidHistoryDetails/${paymentHistoryId}`,
      method: 'GET',
      type: ContentType.Json,
    });
  };

  putMemo = (id: number, memo: string) => {
    return this.request({
      path: `/v1/payment/memo`,
      method: 'PUT',
      type: ContentType.Json,
      body: {
        paymentHistoryId: id,
        memoDescription: memo,
      },
    });
  };

  getUnpaidList = (
    props: PaymentListProps
  ): Promise<PaymentListApiResponse> => {
    return this.request({
      path: `/v1/payment/unpaidHistories/${props.yearMonth}?page=${props.page}&size=${props.size}`,
      method: 'GET',
      type: ContentType.Json,
    });
  };
  getUnpaidStudents = (date: string) => {
    return this.request({
      path: `/v1/payment/unpaidStudents/${date}`,
      method: 'GET',
      type: ContentType.Json,
    });
  };

  putManualInput = (data: FormData) => {
    return this.request({
      path: `/v1/payment/manualProcessing/input`,
      method: 'PUT',
      body: data,
    });
  };

  //완납내역 연결
  postCompletedPayments = (data: completedPaymentType) => {
    return this.request({
      path: `/v1/payment/manualProcessing`,
      method: 'POST',
      body: data,
    }).then(response => response.data);
  };
}
