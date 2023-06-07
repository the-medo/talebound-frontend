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
  PbCreatePostRequest,
  PbDeletePostResponse,
  PbGetPostHistoryResponse,
  PbHistoryPost,
  PbPost,
  RpcStatus,
} from './data-contracts';
import { ContentType, HttpClient, RequestParams } from './http-client';

export class Posts<SecurityDataType = unknown> {
  http: HttpClient<SecurityDataType>;

  constructor(http: HttpClient<SecurityDataType>) {
    this.http = http;
  }

  /**
   * @description Create completely new post
   *
   * @tags Talebound
   * @name TaleboundCreatePost
   * @summary Create post
   * @request POST:/posts
   * @response `200` `PbPost` A successful response.
   * @response `default` `RpcStatus` An unexpected error response.
   */
  taleboundCreatePost = (body: PbCreatePostRequest, params: RequestParams = {}) =>
    this.http.request<PbPost, RpcStatus>({
      path: `/posts`,
      method: 'POST',
      body: body,
      type: ContentType.Json,
      format: 'json',
      ...params,
    });
  /**
   * @description Get content of post by its ID
   *
   * @tags Talebound
   * @name TaleboundGetPostById
   * @summary Get post by id
   * @request GET:/posts/{postId}
   * @response `200` `PbPost` A successful response.
   * @response `default` `RpcStatus` An unexpected error response.
   */
  taleboundGetPostById = (postId: number, params: RequestParams = {}) =>
    this.http.request<PbPost, RpcStatus>({
      path: `/posts/${postId}`,
      method: 'GET',
      format: 'json',
      ...params,
    });
  /**
   * @description Deletes post
   *
   * @tags Talebound
   * @name TaleboundDeletePost
   * @summary Delete post
   * @request DELETE:/posts/{postId}
   * @response `200` `PbDeletePostResponse` A successful response.
   * @response `default` `RpcStatus` An unexpected error response.
   */
  taleboundDeletePost = (postId: number, params: RequestParams = {}) =>
    this.http.request<PbDeletePostResponse, RpcStatus>({
      path: `/posts/${postId}`,
      method: 'DELETE',
      format: 'json',
      ...params,
    });
  /**
   * @description Update title or content of the post
   *
   * @tags Talebound
   * @name TaleboundUpdatePost
   * @summary Update post
   * @request PATCH:/posts/{postId}
   * @response `200` `PbPost` A successful response.
   * @response `default` `RpcStatus` An unexpected error response.
   */
  taleboundUpdatePost = (
    postId: number,
    body: {
      title?: string;
      content?: string;
      /** @format int32 */
      postTypeId?: number;
    },
    params: RequestParams = {},
  ) =>
    this.http.request<PbPost, RpcStatus>({
      path: `/posts/${postId}`,
      method: 'PATCH',
      body: body,
      type: ContentType.Json,
      format: 'json',
      ...params,
    });
  /**
   * @description Get list of history changes of post by its ID - without content
   *
   * @tags Talebound
   * @name TaleboundGetPostHistory
   * @summary Get post history
   * @request GET:/posts/{postId}/history
   * @response `200` `PbGetPostHistoryResponse` A successful response.
   * @response `default` `RpcStatus` An unexpected error response.
   */
  taleboundGetPostHistory = (postId: number, params: RequestParams = {}) =>
    this.http.request<PbGetPostHistoryResponse, RpcStatus>({
      path: `/posts/${postId}/history`,
      method: 'GET',
      format: 'json',
      ...params,
    });
  /**
   * @description Get content of single update iteration of post
   *
   * @tags Talebound
   * @name TaleboundGetPostHistoryById
   * @summary Get post history content
   * @request GET:/posts/{postId}/history/{postHistoryId}/content
   * @response `200` `PbHistoryPost` A successful response.
   * @response `default` `RpcStatus` An unexpected error response.
   */
  taleboundGetPostHistoryById = (
    postId: number,
    postHistoryId: number,
    params: RequestParams = {},
  ) =>
    this.http.request<PbHistoryPost, RpcStatus>({
      path: `/posts/${postId}/history/${postHistoryId}/content`,
      method: 'GET',
      format: 'json',
      ...params,
    });
}
