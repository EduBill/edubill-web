import { HttpClient } from './http-client';
import { AxiosResponse } from 'axios';
import { PaymentStatus } from '@/stores/typings/types.paymentStatus';

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
  public async getPaymentStatus(
    date: any
  ): Promise<AxiosResponse<PaymentStatus>> {
    return this.request({
      path: `/v1/payment/status/${date}`,
      method: 'GET',
      headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdXRoIjoiQUNBREVNWSIsInN1YiI6IjAxMDI3ODkyMTY1IiwiaWF0IjoxNzEyMTU2NzIxLCJleHAiOjQ4NjU3NTY3MjF9.p0vjwBv25irPuk0Cbd4iGTRoHbIsN1QJ3W2KC5Dcoaw`,
      },
    });
  }
}
