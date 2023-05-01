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

import { PbVerifyEmailResponse, RpcStatus } from './data-contracts';
import { HttpClient, RequestParams } from './http-client';

export class Verify<SecurityDataType = unknown> {
  http: HttpClient<SecurityDataType>;

  constructor(http: HttpClient<SecurityDataType>) {
    this.http = http;
  }

  /**
   * @description Verify user email
   *
   * @tags Talebound
   * @name TaleboundVerifyEmail
   * @summary Verify email
   * @request GET:/verify
   * @response `200` `PbVerifyEmailResponse` A successful response.
   * @response `default` `RpcStatus` An unexpected error response.
   */
  taleboundVerifyEmail = (
    query?: {
      /** @format int64 */
      emailId?: string;
      secretCode?: string;
    },
    params: RequestParams = {},
  ) =>
    this.http.request<PbVerifyEmailResponse, RpcStatus>({
      path: `/verify`,
      method: 'GET',
      query: query,
      format: 'json',
      ...params,
    });
}
