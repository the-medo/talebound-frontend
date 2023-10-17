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
  PbCreateWorldMapResponse,
  PbCreateWorldRequest,
  PbGetWorldAdminsResponse,
  PbGetWorldDailyActivityResponse,
  PbGetWorldLocationResponse,
  PbGetWorldMapResponse,
  PbGetWorldMonthlyActivityResponse,
  PbGetWorldsResponse,
  PbImage,
  PbPost,
  PbTag,
  PbViewLocation,
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
  /**
   * @description returns world locations
   *
   * @tags Locations
   * @name LocationsGetWorldLocations
   * @summary Get world locations
   * @request GET:/worlds/{worldId}/locations
   * @response `200` `PbGetWorldLocationResponse` A successful response.
   * @response `default` `RpcStatus` An unexpected error response.
   */
  locationsGetWorldLocations = (worldId: number, params: RequestParams = {}) =>
    this.http.request<PbGetWorldLocationResponse, RpcStatus>({
      path: `/worlds/${worldId}/locations`,
      method: 'GET',
      format: 'json',
      ...params,
    });
  /**
   * @description deletes location from the world
   *
   * @tags Locations
   * @name LocationsDeleteWorldLocation
   * @summary Delete world location
   * @request DELETE:/worlds/{worldId}/locations
   * @response `200` `object` A successful response.
   * @response `default` `RpcStatus` An unexpected error response.
   */
  locationsDeleteWorldLocation = (
    worldId: number,
    query?: {
      /** @format int32 */
      locationId?: number;
    },
    params: RequestParams = {},
  ) =>
    this.http.request<object, RpcStatus>({
      path: `/worlds/${worldId}/locations`,
      method: 'DELETE',
      query: query,
      format: 'json',
      ...params,
    });
  /**
   * @description creates a new location in the world
   *
   * @tags Locations
   * @name LocationsCreateWorldLocation
   * @summary Create world location
   * @request POST:/worlds/{worldId}/locations
   * @response `200` `PbViewLocation` A successful response.
   * @response `default` `RpcStatus` An unexpected error response.
   */
  locationsCreateWorldLocation = (
    worldId: number,
    body: {
      name?: string;
      description?: string;
      /** @format int32 */
      thumbnailImageId?: number;
    },
    params: RequestParams = {},
  ) =>
    this.http.request<PbViewLocation, RpcStatus>({
      path: `/worlds/${worldId}/locations`,
      method: 'POST',
      body: body,
      type: ContentType.Json,
      format: 'json',
      ...params,
    });
  /**
   * @description returns maps of the world
   *
   * @tags Maps
   * @name MapsGetWorldMaps
   * @summary Get world maps
   * @request GET:/worlds/{worldId}/maps
   * @response `200` `PbGetWorldMapResponse` A successful response.
   * @response `default` `RpcStatus` An unexpected error response.
   */
  mapsGetWorldMaps = (worldId: number, params: RequestParams = {}) =>
    this.http.request<PbGetWorldMapResponse, RpcStatus>({
      path: `/worlds/${worldId}/maps`,
      method: 'GET',
      format: 'json',
      ...params,
    });
  /**
   * @description creates a new map for the world
   *
   * @tags Maps
   * @name MapsCreateWorldMap
   * @summary Create world map
   * @request POST:/worlds/{worldId}/maps
   * @response `200` `PbCreateWorldMapResponse` A successful response.
   * @response `default` `RpcStatus` An unexpected error response.
   */
  mapsCreateWorldMap = (
    worldId: number,
    body: {
      name?: string;
      type?: string;
      description?: string;
      /** @format int32 */
      width?: number;
      /** @format int32 */
      height?: number;
      /** @format int32 */
      thumbnailImageId?: number;
      /** @format int32 */
      layerImageId?: number;
    },
    params: RequestParams = {},
  ) =>
    this.http.request<PbCreateWorldMapResponse, RpcStatus>({
      path: `/worlds/${worldId}/maps`,
      method: 'POST',
      body: body,
      type: ContentType.Json,
      format: 'json',
      ...params,
    });
  /**
   * @description deletes a map from the world
   *
   * @tags Maps
   * @name MapsDeleteWorldMap
   * @summary Delete world map
   * @request DELETE:/worlds/{worldId}/maps/{mapId}
   * @response `200` `object` A successful response.
   * @response `default` `RpcStatus` An unexpected error response.
   */
  mapsDeleteWorldMap = (worldId: number, mapId: number, params: RequestParams = {}) =>
    this.http.request<object, RpcStatus>({
      path: `/worlds/${worldId}/maps/${mapId}`,
      method: 'DELETE',
      format: 'json',
      ...params,
    });
  /**
   * @description removes tag from the world
   *
   * @tags Worlds
   * @name WorldsRemoveWorldTag
   * @summary Remove world tag
   * @request DELETE:/worlds/{worldId}/tags
   * @response `200` `object` A successful response.
   * @response `default` `RpcStatus` An unexpected error response.
   */
  worldsRemoveWorldTag = (
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
   * @tags Worlds
   * @name WorldsAddWorldTag
   * @summary Add tag world
   * @request POST:/worlds/{worldId}/tags
   * @response `200` `PbTag` A successful response.
   * @response `default` `RpcStatus` An unexpected error response.
   */
  worldsAddWorldTag = (
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
