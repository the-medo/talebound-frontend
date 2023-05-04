/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

import { PbLoginUserRequest, PbLoginUserResponse, RpcStatus } from './data-contracts';
import { ContentType, HttpClient, RequestParams } from './http-client';

export class Login<SecurityDataType = unknown> {
  http: HttpClient<SecurityDataType>;

  constructor(http: HttpClient<SecurityDataType>) {
    this.http = http;
  }

  /**
   * @description Use this API to login user and get access + refresh user
   *
   * @tags Talebound
   * @name TaleboundLoginUser
   * @summary Login user
   * @request POST:/login
   * @response `200` `PbLoginUserResponse` A successful response.
   * @response `default` `RpcStatus` An unexpected error response.
   */
  taleboundLoginUser = (body: PbLoginUserRequest, params: RequestParams = {}) =>
    this.http.request<PbLoginUserResponse, RpcStatus>({
      path: `/login`,
      method: 'POST',
      body: body,
      type: ContentType.Json,
      format: 'json',
      ...params,
    });
}
