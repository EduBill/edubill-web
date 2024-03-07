import { ContentType, HttpClient, RequestParams } from './http-client';

export class AuthApi<
  SecurityDataType = unknown,
> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags auth-api
   * @name AppControllerInitialize
   * @summary 앱 초기화
   * @request POST:/v1/auth/phone
   * @secure
   */
  authPhoneVerifySend = (data: any, params: RequestParams = {}) =>
    this.request<void, void>({
      path: `/v1/auth/phone`,
      method: 'POST',
      body: data,
      type: ContentType.Json,
      ...params,
    });
}
