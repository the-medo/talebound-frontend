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

import { PbVerifyEmailRequest, PbVerifyEmailResponse, RpcStatus } from './data-contracts';
import { ContentType, HttpClient, RequestParams } from './http-client';

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
   * @request POST:/verify
   * @response `200` `PbVerifyEmailResponse` A successful response.
   * @response `default` `RpcStatus` An unexpected error response.
   */
  taleboundVerifyEmail = (body: PbVerifyEmailRequest, params: RequestParams = {}) =>
    this.http.request<PbVerifyEmailResponse, RpcStatus>({
      path: `/verify`,
      method: 'POST',
      body: body,
      type: ContentType.Json,
      format: 'json',
      ...params,
    });
}
