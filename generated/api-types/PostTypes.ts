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

import { PbGetPostTypesResponse, RpcStatus } from './data-contracts';
import { HttpClient, RequestParams } from './http-client';

export class PostTypes<SecurityDataType = unknown> {
  http: HttpClient<SecurityDataType>;

  constructor(http: HttpClient<SecurityDataType>) {
    this.http = http;
  }

  /**
   * @description get post types with info (draftable, privatable)
   *
   * @tags PostTypes
   * @name PostTypesGetPostTypes
   * @summary Get post types
   * @request GET:/post_types
   * @response `200` `PbGetPostTypesResponse` A successful response.
   * @response `default` `RpcStatus` An unexpected error response.
   */
  postTypesGetPostTypes = (params: RequestParams = {}) =>
    this.http.request<PbGetPostTypesResponse, RpcStatus>({
      path: `/post_types`,
      method: 'GET',
      format: 'json',
      ...params,
    });
}
