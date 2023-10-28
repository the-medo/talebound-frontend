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
  PbCreateModuleTagResponse,
  PbCreateModuleTypeAvailableTagRequest,
  PbGetModuleTypeAvailableTagsResponse,
  PbViewTag,
  RpcStatus,
} from './data-contracts';
import { ContentType, HttpClient, RequestParams } from './http-client';

export class Tags<SecurityDataType = unknown> {
  http: HttpClient<SecurityDataType>;

  constructor(http: HttpClient<SecurityDataType>) {
    this.http = http;
  }

  /**
   * @description gets list of tags, that are usable for module type
   *
   * @tags Tags
   * @name TagsGetModuleTypeAvailableTags
   * @summary Get available tags for module type
   * @request GET:/tags/available
   * @response `200` `PbGetModuleTypeAvailableTagsResponse` A successful response.
   * @response `default` `RpcStatus` An unexpected error response.
   */
  tagsGetModuleTypeAvailableTags = (
    query?: {
      /** @default "MODULE_TYPE_UNKNOWN" */
      moduleType?:
        | 'MODULE_TYPE_UNKNOWN'
        | 'MODULE_TYPE_WORLD'
        | 'MODULE_TYPE_QUEST'
        | 'MODULE_TYPE_SYSTEM'
        | 'MODULE_TYPE_CHARACTER';
    },
    params: RequestParams = {},
  ) =>
    this.http.request<PbGetModuleTypeAvailableTagsResponse, RpcStatus>({
      path: `/tags/available`,
      method: 'GET',
      query: query,
      format: 'json',
      ...params,
    });
  /**
   * @description creates new tag, that can be assigned to modules of given type
   *
   * @tags Tags
   * @name TagsCreateModuleTypeAvailableTag
   * @summary Create module-available tag
   * @request POST:/tags/available
   * @response `200` `PbViewTag` A successful response.
   * @response `default` `RpcStatus` An unexpected error response.
   */
  tagsCreateModuleTypeAvailableTag = (
    body: PbCreateModuleTypeAvailableTagRequest,
    params: RequestParams = {},
  ) =>
    this.http.request<PbViewTag, RpcStatus>({
      path: `/tags/available`,
      method: 'POST',
      body: body,
      type: ContentType.Json,
      format: 'json',
      ...params,
    });
  /**
   * @description deletes available world tag and removes all its assignments
   *
   * @tags Tags
   * @name TagsDeleteModuleTypeAvailableTag
   * @summary Delete available world tag
   * @request DELETE:/tags/available/{tagId}
   * @response `200` `object` A successful response.
   * @response `default` `RpcStatus` An unexpected error response.
   */
  tagsDeleteModuleTypeAvailableTag = (tagId: number, params: RequestParams = {}) =>
    this.http.request<object, RpcStatus>({
      path: `/tags/available/${tagId}`,
      method: 'DELETE',
      format: 'json',
      ...params,
    });
  /**
   * @description updates module-assignable tag
   *
   * @tags Tags
   * @name TagsUpdateModuleTypeAvailableTag
   * @summary Update module-available tag
   * @request PATCH:/tags/available/{tagId}
   * @response `200` `PbViewTag` A successful response.
   * @response `default` `RpcStatus` An unexpected error response.
   */
  tagsUpdateModuleTypeAvailableTag = (
    tagId: number,
    body: {
      newTag?: string;
    },
    params: RequestParams = {},
  ) =>
    this.http.request<PbViewTag, RpcStatus>({
      path: `/tags/available/${tagId}`,
      method: 'PATCH',
      body: body,
      type: ContentType.Json,
      format: 'json',
      ...params,
    });
  /**
   * @description assigns one tag to the world
   *
   * @tags Tags
   * @name TagsCreateModuleTag
   * @summary Add tag world
   * @request POST:/tags/module/{moduleId}
   * @response `200` `PbCreateModuleTagResponse` A successful response.
   * @response `default` `RpcStatus` An unexpected error response.
   */
  tagsCreateModuleTag = (
    moduleId: number,
    body: {
      /** @format int32 */
      tagId?: number;
    },
    params: RequestParams = {},
  ) =>
    this.http.request<PbCreateModuleTagResponse, RpcStatus>({
      path: `/tags/module/${moduleId}`,
      method: 'POST',
      body: body,
      type: ContentType.Json,
      format: 'json',
      ...params,
    });
  /**
   * @description removes tag from the world
   *
   * @tags Tags
   * @name TagsDeleteModuleTag
   * @summary Remove world tag
   * @request DELETE:/tags/module/{moduleId}/tag/{tagId}
   * @response `200` `object` A successful response.
   * @response `default` `RpcStatus` An unexpected error response.
   */
  tagsDeleteModuleTag = (moduleId: number, tagId: number, params: RequestParams = {}) =>
    this.http.request<object, RpcStatus>({
      path: `/tags/module/${moduleId}/tag/${tagId}`,
      method: 'DELETE',
      format: 'json',
      ...params,
    });
}
