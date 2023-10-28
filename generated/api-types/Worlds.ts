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
   * @tags Worlds
   * @name WorldsGetWorlds
   * @summary Get worlds
   * @request GET:/worlds
   * @response `200` `PbGetWorldsResponse` A successful response.
   * @response `default` `RpcStatus` An unexpected error response.
   */
  worldsGetWorlds = (
    query?: {
      public?: boolean;
      tags?: string[];
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
   * @tags Worlds
   * @name WorldsCreateWorld
   * @summary Create world
   * @request POST:/worlds
   * @response `200` `PbWorld` A successful response.
   * @response `default` `RpcStatus` An unexpected error response.
   */
  worldsCreateWorld = (body: PbCreateWorldRequest, params: RequestParams = {}) =>
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
   * @tags Worlds
   * @name WorldsGetWorldDailyActivity
   * @summary Get world(s) daily activity
   * @request GET:/worlds/activity/daily
   * @response `200` `PbGetWorldDailyActivityResponse` A successful response.
   * @response `default` `RpcStatus` An unexpected error response.
   */
  worldsGetWorldDailyActivity = (
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
   * @tags Worlds
   * @name WorldsGetWorldMonthlyActivity
   * @summary Get world(s) monthly activity
   * @request GET:/worlds/activity/monthly
   * @response `200` `PbGetWorldMonthlyActivityResponse` A successful response.
   * @response `default` `RpcStatus` An unexpected error response.
   */
  worldsGetWorldMonthlyActivity = (
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
   * @tags Worlds
   * @name WorldsGetWorldById
   * @summary Get world by ID
   * @request GET:/worlds/{worldId}
   * @response `200` `PbWorld` A successful response.
   * @response `default` `RpcStatus` An unexpected error response.
   */
  worldsGetWorldById = (worldId: number, params: RequestParams = {}) =>
    this.http.request<PbWorld, RpcStatus>({
      path: `/worlds/${worldId}`,
      method: 'GET',
      format: 'json',
      ...params,
    });
  /**
   * @description updates world properties (NO images or stats!)
   *
   * @tags Worlds
   * @name WorldsUpdateWorld
   * @summary Update world
   * @request PATCH:/worlds/{worldId}
   * @response `200` `PbWorld` A successful response.
   * @response `default` `RpcStatus` An unexpected error response.
   */
  worldsUpdateWorld = (
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
   * @tags Worlds
   * @name WorldsGetWorldAdmins
   * @summary Get world admins
   * @request GET:/worlds/{worldId}/admin
   * @response `200` `PbGetWorldAdminsResponse` A successful response.
   * @response `default` `RpcStatus` An unexpected error response.
   */
  worldsGetWorldAdmins = (worldId: number, params: RequestParams = {}) =>
    this.http.request<PbGetWorldAdminsResponse, RpcStatus>({
      path: `/worlds/${worldId}/admin`,
      method: 'GET',
      format: 'json',
      ...params,
    });
  /**
   * @description deletes world admin
   *
   * @tags Worlds
   * @name WorldsDeleteWorldAdmin
   * @summary Delete world admin
   * @request DELETE:/worlds/{worldId}/admin
   * @response `200` `object` A successful response.
   * @response `default` `RpcStatus` An unexpected error response.
   */
  worldsDeleteWorldAdmin = (
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
   * @tags Worlds
   * @name WorldsCreateWorldAdmin
   * @summary Create world admin
   * @request POST:/worlds/{worldId}/admin
   * @response `200` `PbWorldAdmin` A successful response.
   * @response `default` `RpcStatus` An unexpected error response.
   */
  worldsCreateWorldAdmin = (
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
   * @tags Worlds
   * @name WorldsUpdateWorldAdmin
   * @summary Update world admin
   * @request PATCH:/worlds/{worldId}/admin
   * @response `200` `PbWorldAdmin` A successful response.
   * @response `default` `RpcStatus` An unexpected error response.
   */
  worldsUpdateWorldAdmin = (
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
   * @tags Worlds
   * @name WorldsUploadWorldImage
   * @summary Upload image for world
   * @request POST:/worlds/{worldId}/images
   * @response `200` `PbImage` A successful response.
   * @response `default` `RpcStatus` An unexpected error response.
   */
  worldsUploadWorldImage = (
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
   * @tags Worlds
   * @name WorldsUpdateWorldIntroduction
   * @summary Update world introduction
   * @request PATCH:/worlds/{worldId}/introduction
   * @response `200` `PbPost` A successful response.
   * @response `default` `RpcStatus` An unexpected error response.
   */
  worldsUpdateWorldIntroduction = (
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
}
