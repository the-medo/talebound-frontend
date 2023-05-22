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

import { PbUploadImageRequest, PbUploadImageResponse, RpcStatus } from './data-contracts';
import { ContentType, HttpClient, RequestParams } from './http-client';

export class Files<SecurityDataType = unknown> {
  http: HttpClient<SecurityDataType>;

  constructor(http: HttpClient<SecurityDataType>) {
    this.http = http;
  }

  /**
   * @description uploads an image file
   *
   * @tags Talebound
   * @name TaleboundUploadImage
   * @summary Upload image
   * @request POST:/files/upload
   * @response `200` `PbUploadImageResponse` A successful response.
   * @response `default` `RpcStatus` An unexpected error response.
   */
  taleboundUploadImage = (body: PbUploadImageRequest, params: RequestParams = {}) =>
    this.http.request<PbUploadImageResponse, RpcStatus>({
      path: `/files/upload`,
      method: 'POST',
      body: body,
      type: ContentType.Json,
      format: 'json',
      ...params,
    });
}
