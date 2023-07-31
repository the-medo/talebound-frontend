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

import { PbGetImagesResponse, PbImage, PbUploadImageRequest, RpcStatus } from './data-contracts';
import { ContentType, HttpClient, RequestParams } from './http-client';

export class Images<SecurityDataType = unknown> {
  http: HttpClient<SecurityDataType>;

  constructor(http: HttpClient<SecurityDataType>) {
    this.http = http;
  }

  /**
   * @description get images - paginated, filterable by user and image type
   *
   * @tags Talebound
   * @name TaleboundGetImages
   * @summary Get images
   * @request GET:/images
   * @response `200` `PbGetImagesResponse` A successful response.
   * @response `default` `RpcStatus` An unexpected error response.
   */
  taleboundGetImages = (
    query?: {
      /** @format int32 */
      userId?: number;
      /** @format int32 */
      imageTypeId?: number;
      /** @format int32 */
      limit?: number;
      /** @format int32 */
      offset?: number;
    },
    params: RequestParams = {},
  ) =>
    this.http.request<PbGetImagesResponse, RpcStatus>({
      path: `/images`,
      method: 'GET',
      query: query,
      format: 'json',
      ...params,
    });
  /**
   * @description uploads an image file
   *
   * @tags Talebound
   * @name TaleboundUploadDefaultImage
   * @summary Upload image
   * @request POST:/images
   * @response `200` `PbImage` A successful response.
   * @response `default` `RpcStatus` An unexpected error response.
   */
  taleboundUploadDefaultImage = (body: PbUploadImageRequest, params: RequestParams = {}) =>
    this.http.request<PbImage, RpcStatus>({
      path: `/images`,
      method: 'POST',
      body: body,
      type: ContentType.Json,
      format: 'json',
      ...params,
    });
}
