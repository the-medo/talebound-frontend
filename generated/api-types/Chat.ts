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
  PbAddChatMessageRequest,
  PbAddChatMessageResponse,
  PbDeleteChatMessageResponse,
  PbGetChatMessagesResponse,
  RpcStatus,
} from './data-contracts';
import { ContentType, HttpClient, RequestParams } from './http-client';

export class Chat<SecurityDataType = unknown> {
  http: HttpClient<SecurityDataType>;

  constructor(http: HttpClient<SecurityDataType>) {
    this.http = http;
  }

  /**
   * @description returns list of chat messages
   *
   * @tags Chat
   * @name ChatGetChatMessages
   * @summary Get list of chat messages
   * @request GET:/chat
   * @response `200` `PbGetChatMessagesResponse` A successful response.
   * @response `default` `RpcStatus` An unexpected error response.
   */
  chatGetChatMessages = (
    query?: {
      /** @format int32 */
      limit?: number;
      /** @format int32 */
      offset?: number;
    },
    params: RequestParams = {},
  ) =>
    this.http.request<PbGetChatMessagesResponse, RpcStatus>({
      path: `/chat`,
      method: 'GET',
      query: query,
      format: 'json',
      ...params,
    });
  /**
   * @description adds new chat message
   *
   * @tags Chat
   * @name ChatAddChatMessage
   * @summary Add new chat message
   * @request POST:/chat
   * @response `200` `PbAddChatMessageResponse` A successful response.
   * @response `default` `RpcStatus` An unexpected error response.
   */
  chatAddChatMessage = (body: PbAddChatMessageRequest, params: RequestParams = {}) =>
    this.http.request<PbAddChatMessageResponse, RpcStatus>({
      path: `/chat`,
      method: 'POST',
      body: body,
      type: ContentType.Json,
      format: 'json',
      ...params,
    });
  /**
   * @description removes role from user
   *
   * @tags Chat
   * @name ChatDeleteChatMessage
   * @summary Delete chat message
   * @request DELETE:/chat/{id}
   * @response `200` `PbDeleteChatMessageResponse` A successful response.
   * @response `default` `RpcStatus` An unexpected error response.
   */
  chatDeleteChatMessage = (id: string, params: RequestParams = {}) =>
    this.http.request<PbDeleteChatMessageResponse, RpcStatus>({
      path: `/chat/${id}`,
      method: 'DELETE',
      format: 'json',
      ...params,
    });
}
