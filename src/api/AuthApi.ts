import { ContentType, HttpClient, RequestParams } from './http-client';
import axios, { AxiosResponse } from 'axios';
import { UserProfile } from '@/stores/typings/types.userProfile';

export class AuthApi<
  SecurityDataType = unknown,
> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags auth-api
   * @name AppControllerInitialize
   * @summary 인증번호 요청
   * @request POST:/v1/auth/phone
   * @secure
   */
  authPhoneVerifySend = (data: any, params: RequestParams = {}) =>
    this.request<void, void>({
      path: `/v1/auth/phone`,
      method: 'POST',
      body: data,
      type: ContentType.TextPlain,
    });

  /**
   * No description
   *
   * @tags auth-api
   * @name AppControllerInitialize
   * @summary 인증번호 확인
   * @request POST:/v1/auth/verify
   * @secure
   */
  authPhoneVerify = (data: any, params: RequestParams = {}) =>
    this.request<void, void>({
      path: `/v1/auth/verify`,
      method: 'POST',
      body: data,
      type: ContentType.Json,
    });

  /**
   * No description
   *
   * @tags auth-api
   * @name AppControllerInitialize
   * @summary 유저 유무 확인
   * @request POST:/v1/auth/verify
   * @secure
   */
  authCheckUser = (data: any, params: RequestParams = {}) =>
    this.request<void, void>({
      path: `/v1/auth/exists/user`,
      method: 'POST',
      body: data,
      type: ContentType.Json,
    });

  /**
   * No description
   *
   * @tags auth-api
   * @name AppControllerInitialize
   * @summary 유저 회원가입
   * @request POST:/v1/auth/signup
   * @secure
   */
  authSignUp = (data: any, params: RequestParams = {}) =>
    this.request<void, void>({
      path: `/v1/auth/signup`,
      method: 'POST',
      body: data,
      type: ContentType.Json,
    });

  /**
   * No description
   *
   * @tags auth-api
   * @name AppControllerInitialize
   * @summary 유저 로그인
   * @request POST:/v1/auth/login
   * @secure
   */
  authLogin = (data: any, params: RequestParams = {}) =>
    this.request<void, void>({
      path: `/v1/auth/login`,
      method: 'POST',
      body: data,
      type: ContentType.Json,
    });
  
  /**
   * No description
   *
   * @tags auth-api
   * @name 
   * @summary 유저 프로필
   * @request GET:/v1/user/my-profile
   * @secure
   */
  public async getUserProfile(): Promise<AxiosResponse<UserProfile>> {
    return this.request({
      path: `/v1/user/my-profile`,
      method: 'GET',
      headers: { Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdXRoIjoiQUNBREVNWSIsInN1YiI6IjAxMDI3ODkyMTY1IiwiaWF0IjoxNzEyMTU2NzIxLCJleHAiOjQ4NjU3NTY3MjF9.p0vjwBv25irPuk0Cbd4iGTRoHbIsN1QJ3W2KC5Dcoaw` },
    });
  }
    

}
