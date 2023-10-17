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
  PbCreateAvailableWorldTagRequest,
  PbGetAvailableWorldTagsResponse,
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
   * @description gets list of tags, that are usable for worlds
   *
   * @tags Tags
   * @name TagsGetAvailableWorldTags
   * @summary Get available world tags
   * @request GET:/tags/worlds
   * @response `200` `PbGetAvailableWorldTagsResponse` A successful response.
   * @response `default` `RpcStatus` An unexpected error response.
   */
  tagsGetAvailableWorldTags = (params: RequestParams = {}) =>
    this.http.request<PbGetAvailableWorldTagsResponse, RpcStatus>({
      path: `/tags/worlds`,
      method: 'GET',
      format: 'json',
      ...params,
    });
  /**
   * @description creates new tag, that can be assigned to worlds
   *
   * @tags Tags
   * @name TagsCreateAvailableWorldTag
   * @summary Create available world tag
   * @request POST:/tags/worlds
   * @response `200` `PbViewTag` A successful response.
   * @response `default` `RpcStatus` An unexpected error response.
   */
  tagsCreateAvailableWorldTag = (
    body: PbCreateAvailableWorldTagRequest,
    params: RequestParams = {},
  ) =>
    this.http.request<PbViewTag, RpcStatus>({
      path: `/tags/worlds`,
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
   * @name TagsDeleteAvailableWorldTag
   * @summary Delete available world tag
   * @request DELETE:/tags/worlds/{tagId}
   * @response `200` `object` A successful response.
   * @response `default` `RpcStatus` An unexpected error response.
   */
  tagsDeleteAvailableWorldTag = (tagId: number, params: RequestParams = {}) =>
    this.http.request<object, RpcStatus>({
      path: `/tags/worlds/${tagId}`,
      method: 'DELETE',
      format: 'json',
      ...params,
    });
  /**
   * @description updates world-assignable tag
   *
   * @tags Tags
   * @name TagsUpdateAvailableWorldTag
   * @summary Update available world tag
   * @request PATCH:/tags/worlds/{tagId}
   * @response `200` `PbViewTag` A successful response.
   * @response `default` `RpcStatus` An unexpected error response.
   */
  tagsUpdateAvailableWorldTag = (
    tagId: number,
    body: {
      newTag?: string;
    },
    params: RequestParams = {},
  ) =>
    this.http.request<PbViewTag, RpcStatus>({
      path: `/tags/worlds/${tagId}`,
      method: 'PATCH',
      body: body,
      type: ContentType.Json,
      format: 'json',
      ...params,
    });
}
