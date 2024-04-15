import { PaymentStatus } from '@/stores/typings/types.paymentStatus';
import { ContentType, HttpClient, RequestParams } from './http-client';
import { setAccessToken } from '@/modules/axios/index';

setAccessToken(
  'eyJhbGciOiJIUzI1NiJ9.eyJhdXRoIjoiQUNBREVNWSIsInN1YiI6IjAxMDI3ODkyMTY1IiwiaWF0IjoxNzEyMTU2NzIxLCJleHAiOjQ4NjU3NTY3MjF9.p0vjwBv25irPuk0Cbd4iGTRoHbIsN1QJ3W2KC5Dcoaw'
);
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
}
