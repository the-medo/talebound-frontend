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

import {
  PbCreateWorldRequest,
  PbGetWorldAdminsResponse,
  PbGetWorldDailyActivityResponse,
  PbGetWorldMonthlyActivityResponse,
  PbGetWorldsResponse,
  PbImage,
  PbPost,
  PbTag,
  PbWorld,
  PbWorldAdmin,
  RpcStatus,
} from './data-contracts';
import { ContentType, HttpClient, RequestParams } from './http-client';

export class Worlds<SecurityDataType = unknown> {
  http: HttpClient<SecurityDataType>;

  constructor(http: HttpClient<SecurityDataType>) {
    this.http = http;
  }

  /**
   * @description gets list of worlds
   *
   * @tags Talebound
   * @name TaleboundGetWorlds
   * @summary Get worlds
   * @request GET:/worlds
   * @response `200` `PbGetWorldsResponse` A successful response.
   * @response `default` `RpcStatus` An unexpected error response.
   */
  taleboundGetWorlds = (
    query?: {
      public?: boolean;
      orderBy?: string;
      /** @format int32 */
      limit?: number;
      /** @format int32 */
      offset?: number;
    },
    params: RequestParams = {},
  ) =>
    this.http.request<PbGetWorldsResponse, RpcStatus>({
      path: `/worlds`,
      method: 'GET',
      query: query,
      format: 'json',
      ...params,
    });
  /**
   * @description creates completely new world
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
   * @description gets activity by day
   *
   * @tags Talebound
   * @name TaleboundGetWorldDailyActivity
   * @summary Get world(s) daily activity
   * @request GET:/worlds/activity/daily
   * @response `200` `PbGetWorldDailyActivityResponse` A successful response.
   * @response `default` `RpcStatus` An unexpected error response.
   */
  taleboundGetWorldDailyActivity = (
    query?: {
      /** @format int32 */
      worldId?: number;
      /** @format date-time */
      dateFrom?: string;
    },
    params: RequestParams = {},
  ) =>
    this.http.request<PbGetWorldDailyActivityResponse, RpcStatus>({
      path: `/worlds/activity/daily`,
      method: 'GET',
      query: query,
      format: 'json',
      ...params,
    });
  /**
   * @description gets world activity grouped by month
   *
   * @tags Talebound
   * @name TaleboundGetWorldMonthlyActivity
   * @summary Get world(s) monthly activity
   * @request GET:/worlds/activity/monthly
   * @response `200` `PbGetWorldMonthlyActivityResponse` A successful response.
   * @response `default` `RpcStatus` An unexpected error response.
   */
  taleboundGetWorldMonthlyActivity = (
    query?: {
      /** @format int32 */
      worldId?: number;
      /** @format date-time */
      dateFrom?: string;
    },
    params: RequestParams = {},
  ) =>
    this.http.request<PbGetWorldMonthlyActivityResponse, RpcStatus>({
      path: `/worlds/activity/monthly`,
      method: 'GET',
      query: query,
      format: 'json',
      ...params,
    });
  /**
   * @description gets world by ID
   *
   * @tags Talebound
   * @name TaleboundGetWorldById
   * @summary Get world by ID
   * @request GET:/worlds/{worldId}
   * @response `200` `PbWorld` A successful response.
   * @response `default` `RpcStatus` An unexpected error response.
   */
  taleboundGetWorldById = (worldId: number, params: RequestParams = {}) =>
    this.http.request<PbWorld, RpcStatus>({
      path: `/worlds/${worldId}`,
      method: 'GET',
      format: 'json',
      ...params,
    });
  /**
   * @description updates world properties (NO images or stats!)
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
      shortDescription?: string;
      public?: boolean;
      basedOn?: string;
      /** @format int32 */
      descriptionPostId?: number;
      /** @format int32 */
      imageAvatarId?: number;
      /** @format int32 */
      imageThumbnailId?: number;
      /** @format int32 */
      imageHeaderId?: number;
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
   * @description returns admins and admin requests for world
   *
   * @tags Talebound
   * @name TaleboundGetWorldAdmins
   * @summary Get world admins
   * @request GET:/worlds/{worldId}/admin
   * @response `200` `PbGetWorldAdminsResponse` A successful response.
   * @response `default` `RpcStatus` An unexpected error response.
   */
  taleboundGetWorldAdmins = (worldId: number, params: RequestParams = {}) =>
    this.http.request<PbGetWorldAdminsResponse, RpcStatus>({
      path: `/worlds/${worldId}/admin`,
      method: 'GET',
      format: 'json',
      ...params,
    });
  /**
   * @description deletes world admin
   *
   * @tags Talebound
   * @name TaleboundDeleteWorldAdmin
   * @summary Delete world admin
   * @request DELETE:/worlds/{worldId}/admin
   * @response `200` `object` A successful response.
   * @response `default` `RpcStatus` An unexpected error response.
   */
  taleboundDeleteWorldAdmin = (
    worldId: number,
    query?: {
      /** @format int32 */
      userId?: number;
    },
    params: RequestParams = {},
  ) =>
    this.http.request<object, RpcStatus>({
      path: `/worlds/${worldId}/admin`,
      method: 'DELETE',
      query: query,
      format: 'json',
      ...params,
    });
  /**
   * @description adds request to become admin of the world
   *
   * @tags Talebound
   * @name TaleboundCreateWorldAdmin
   * @summary Create world admin
   * @request POST:/worlds/{worldId}/admin
   * @response `200` `PbWorldAdmin` A successful response.
   * @response `default` `RpcStatus` An unexpected error response.
   */
  taleboundCreateWorldAdmin = (
    worldId: number,
    body: {
      motivationalLetter?: string;
    },
    params: RequestParams = {},
  ) =>
    this.http.request<PbWorldAdmin, RpcStatus>({
      path: `/worlds/${worldId}/admin`,
      method: 'POST',
      body: body,
      type: ContentType.Json,
      format: 'json',
      ...params,
    });
  /**
   * @description updates world admin request (approve / decline)
   *
   * @tags Talebound
   * @name TaleboundUpdateWorldAdmin
   * @summary Update world admin
   * @request PATCH:/worlds/{worldId}/admin
   * @response `200` `PbWorldAdmin` A successful response.
   * @response `default` `RpcStatus` An unexpected error response.
   */
  taleboundUpdateWorldAdmin = (
    worldId: number,
    body: {
      /** @format int32 */
      userId?: number;
      superAdmin?: boolean;
      /** @format int32 */
      approved?: number;
      motivationalLetter?: string;
    },
    params: RequestParams = {},
  ) =>
    this.http.request<PbWorldAdmin, RpcStatus>({
      path: `/worlds/${worldId}/admin`,
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
  /**
   * @description creates/updates world introduction
   *
   * @tags Talebound
   * @name TaleboundUpdateWorldIntroduction
   * @summary Update world introduction
   * @request PATCH:/worlds/{worldId}/introduction
   * @response `200` `PbPost` A successful response.
   * @response `default` `RpcStatus` An unexpected error response.
   */
  taleboundUpdateWorldIntroduction = (
    worldId: number,
    body: {
      content?: string;
    },
    params: RequestParams = {},
  ) =>
    this.http.request<PbPost, RpcStatus>({
      path: `/worlds/${worldId}/introduction`,
      method: 'PATCH',
      body: body,
      type: ContentType.Json,
      format: 'json',
      ...params,
    });
  /**
   * @description removes tag from the world
   *
   * @tags Talebound
   * @name TaleboundRemoveWorldTag
   * @summary Remove world tag
   * @request DELETE:/worlds/{worldId}/tags
   * @response `200` `object` A successful response.
   * @response `default` `RpcStatus` An unexpected error response.
   */
  taleboundRemoveWorldTag = (
    worldId: number,
    query?: {
      /** @format int32 */
      tagId?: number;
    },
    params: RequestParams = {},
  ) =>
    this.http.request<object, RpcStatus>({
      path: `/worlds/${worldId}/tags`,
      method: 'DELETE',
      query: query,
      format: 'json',
      ...params,
    });
  /**
   * @description assigns one tag to the world
   *
   * @tags Talebound
   * @name TaleboundAddWorldTag
   * @summary Add tag world
   * @request POST:/worlds/{worldId}/tags
   * @response `200` `PbTag` A successful response.
   * @response `default` `RpcStatus` An unexpected error response.
   */
  taleboundAddWorldTag = (
    worldId: number,
    body: {
      /** @format int32 */
      tagId?: number;
    },
    params: RequestParams = {},
  ) =>
    this.http.request<PbTag, RpcStatus>({
      path: `/worlds/${worldId}/tags`,
      method: 'POST',
      body: body,
      type: ContentType.Json,
      format: 'json',
      ...params,
    });
}
