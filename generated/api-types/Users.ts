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
  PbAddRoleToUserRequest,
  PbAddRoleToUserResponse,
  PbCreateUserRequest,
  PbCreateUserResponse,
  PbGetUserRolesResponse,
  PbGetUsersResponse,
  PbRemoveRoleFromUserResponse,
  PbUpdateUserRequest,
  PbUpdateUserResponse,
  RpcStatus,
} from './data-contracts';
import { ContentType, HttpClient, RequestParams } from './http-client';

export class Users<SecurityDataType = unknown> {
  http: HttpClient<SecurityDataType>;

  constructor(http: HttpClient<SecurityDataType>) {
    this.http = http;
  }

  /**
   * @description returns list of users
   *
   * @tags Talebound
   * @name TaleboundGetUsers
   * @summary Get list of users
   * @request GET:/users
   * @response `200` `PbGetUsersResponse` A successful response.
   * @response `default` `RpcStatus` An unexpected error response.
   */
  taleboundGetUsers = (
    query?: {
      /** @format int32 */
      limit?: number;
      /** @format int32 */
      offset?: number;
    },
    params: RequestParams = {},
  ) =>
    this.http.request<PbGetUsersResponse, RpcStatus>({
      path: `/users`,
      method: 'GET',
      query: query,
      format: 'json',
      ...params,
    });
  /**
   * @description Use this API to create a new user
   *
   * @tags Talebound
   * @name TaleboundCreateUser
   * @summary Create new user
   * @request POST:/users
   * @response `200` `PbCreateUserResponse` A successful response.
   * @response `default` `RpcStatus` An unexpected error response.
   */
  taleboundCreateUser = (body: PbCreateUserRequest, params: RequestParams = {}) =>
    this.http.request<PbCreateUserResponse, RpcStatus>({
      path: `/users`,
      method: 'POST',
      body: body,
      type: ContentType.Json,
      format: 'json',
      ...params,
    });
  /**
   * @description Use this API to update user
   *
   * @tags Talebound
   * @name TaleboundUpdateUser
   * @summary Update user
   * @request PATCH:/users
   * @response `200` `PbUpdateUserResponse` A successful response.
   * @response `default` `RpcStatus` An unexpected error response.
   */
  taleboundUpdateUser = (body: PbUpdateUserRequest, params: RequestParams = {}) =>
    this.http.request<PbUpdateUserResponse, RpcStatus>({
      path: `/users`,
      method: 'PATCH',
      body: body,
      type: ContentType.Json,
      format: 'json',
      ...params,
    });
  /**
   * @description returns full list of user roles
   *
   * @tags Talebound
   * @name TaleboundGetUserRoles
   * @summary Get user roles (admin, moderator, etc.)
   * @request GET:/users/roles
   * @response `200` `PbGetUserRolesResponse` A successful response.
   * @response `default` `RpcStatus` An unexpected error response.
   */
  taleboundGetUserRoles = (
    query?: {
      /** @format int32 */
      userId?: number;
    },
    params: RequestParams = {},
  ) =>
    this.http.request<PbGetUserRolesResponse, RpcStatus>({
      path: `/users/roles`,
      method: 'GET',
      query: query,
      format: 'json',
      ...params,
    });
  /**
   * @description adds new role to user
   *
   * @tags Talebound
   * @name TaleboundAddRoleToUser
   * @summary Add role to user
   * @request POST:/users/roles
   * @response `200` `PbAddRoleToUserResponse` A successful response.
   * @response `default` `RpcStatus` An unexpected error response.
   */
  taleboundAddRoleToUser = (body: PbAddRoleToUserRequest, params: RequestParams = {}) =>
    this.http.request<PbAddRoleToUserResponse, RpcStatus>({
      path: `/users/roles`,
      method: 'POST',
      body: body,
      type: ContentType.Json,
      format: 'json',
      ...params,
    });
  /**
   * @description removes role from user
   *
   * @tags Talebound
   * @name TaleboundRemoveRoleFromUser
   * @summary Remove role from user
   * @request DELETE:/users/{userId}/roles/{roleId}
   * @response `200` `PbRemoveRoleFromUserResponse` A successful response.
   * @response `default` `RpcStatus` An unexpected error response.
   */
  taleboundRemoveRoleFromUser = (userId: number, roleId: number, params: RequestParams = {}) =>
    this.http.request<PbRemoveRoleFromUserResponse, RpcStatus>({
      path: `/users/${userId}/roles/${roleId}`,
      method: 'DELETE',
      format: 'json',
      ...params,
    });
}
