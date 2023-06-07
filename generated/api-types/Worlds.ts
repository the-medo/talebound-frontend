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

import { PbCreateWorldRequest, PbImage, PbWorld, RpcStatus } from './data-contracts';
import { ContentType, HttpClient, RequestParams } from './http-client';

export class Worlds<SecurityDataType = unknown> {
  http: HttpClient<SecurityDataType>;

  constructor(http: HttpClient<SecurityDataType>) {
    this.http = http;
  }

  /**
   * @description Create completely new world
   *
   * @tags Talebound
   * @name TaleboundCreateWorld
   * @summary Create world
   * @request POST:/worlds
   * @response `200` `PbWorld` A successful response.
   * @response `default` `RpcStatus` An unexpected error response.
   */
  taleboundCreateWorld = (body: PbCreateWorldRequest, params: RequestParams = {}) =>
    this.http.request<PbWorld, RpcStatus>({
      path: `/worlds`,
      method: 'POST',
      body: body,
      type: ContentType.Json,
      format: 'json',
      ...params,
    });
  /**
   * @description Update world properties (NO images or stats!)
   *
   * @tags Talebound
   * @name TaleboundUpdateWorld
   * @summary Update world
   * @request PATCH:/worlds/{worldId}
   * @response `200` `PbWorld` A successful response.
   * @response `default` `RpcStatus` An unexpected error response.
   */
  taleboundUpdateWorld = (
    worldId: number,
    body: {
      name?: string;
      description?: string;
      public?: boolean;
    },
    params: RequestParams = {},
  ) =>
    this.http.request<PbWorld, RpcStatus>({
      path: `/worlds/${worldId}`,
      method: 'PATCH',
      body: body,
      type: ContentType.Json,
      format: 'json',
      ...params,
    });
  /**
   * @description uploads and sets new image for given world
   *
   * @tags Talebound
   * @name TaleboundUploadWorldImage
   * @summary Upload image for world
   * @request POST:/worlds/{worldId}/images
   * @response `200` `PbImage` A successful response.
   * @response `default` `RpcStatus` An unexpected error response.
   */
  taleboundUploadWorldImage = (
    worldId: number,
    body: {
      /** @format byte */
      data?: string;
      /** @format int32 */
      imageTypeId?: number;
    },
    params: RequestParams = {},
  ) =>
    this.http.request<PbImage, RpcStatus>({
      path: `/worlds/${worldId}/images`,
      method: 'POST',
      body: body,
      type: ContentType.Json,
      format: 'json',
      ...params,
    });
}
