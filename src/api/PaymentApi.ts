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
    });
  };

  //테스트용 원생 등록 api
  addStudents = (name: string) => {
    return this.request({
      path: `v1/student`,
      method: 'POST',
      body: {
        studentName: name,
        studentPhoneNumber: '01012345678',
        parentName: '부모',
        parentPhoneNumber: '01098769876',
        groupIds: [2],
        schoolType: '중학교',
        gradeLevel: '2학년',
        departmentType: '이과',
        schoolName: '에듀빌중학교',
        memo: '메모 내용',
      },
    });
  };

  //테스트용 반 등록 api
  addClass = () => {
    return this.request({
      path: `v1/student/test`,
      method: 'POST',
      body: {
        studentName: '유저1',
        studentPhoneNumber: '01011111111',
        parentName: '부모1',
        parentPhoneNumber: '01011112222',
      },
    });
  };
}
