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
  PbCreateOrUpdateEvaluationVoteResponse,
  PbCreateUserRequest,
  PbCreateUserResponse,
  PbDeleteEvaluationVoteResponse,
  PbGetAverageUserEvaluationsByTypeResponse,
  PbGetEvaluationVotesByUserIdAndVoterResponse,
  PbGetEvaluationVotesByUserIdResponse,
  PbGetUserRolesResponse,
  PbGetUsersResponse,
  PbLoginUserRequest,
  PbLoginUserResponse,
  PbRemoveRoleFromUserResponse,
  PbResetPasswordSendCodeRequest,
  PbResetPasswordSendCodeResponse,
  PbResetPasswordVerifyCodeRequest,
  PbResetPasswordVerifyCodeResponse,
  PbResetPasswordVerifyCodeValidityResponse,
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
   * @description Login user - get user object and set HttpOnly cookies
   *
   * @tags Talebound
   * @name TaleboundLoginUser
   * @summary Login user
   * @request POST:/users/login
   * @response `200` `PbLoginUserResponse` A successful response.
   * @response `default` `RpcStatus` An unexpected error response.
   */
  taleboundLoginUser = (body: PbLoginUserRequest, params: RequestParams = {}) =>
    this.http.request<PbLoginUserResponse, RpcStatus>({
      path: `/users/login`,
      method: 'POST',
      body: body,
      type: ContentType.Json,
      format: 'json',
      ...params,
    });
  /**
   * @description Logout user - it clears HttpOnly cookies - no request data required
   *
   * @tags Talebound
   * @name TaleboundLogoutUser
   * @summary Logout user
   * @request POST:/users/logout
   * @response `200` `object` A successful response.
   * @response `default` `RpcStatus` An unexpected error response.
   */
  taleboundLogoutUser = (body: object, params: RequestParams = {}) =>
    this.http.request<object, RpcStatus>({
      path: `/users/logout`,
      method: 'POST',
      body: body,
      type: ContentType.Json,
      format: 'json',
      ...params,
    });
  /**
   * @description In case a user forgot their password, they can request a password reset using this endpoint
   *
   * @tags Talebound
   * @name TaleboundResetPasswordSendCode
   * @summary Request password reset
   * @request POST:/users/reset/send-code
   * @response `200` `PbResetPasswordSendCodeResponse` A successful response.
   * @response `default` `RpcStatus` An unexpected error response.
   */
  taleboundResetPasswordSendCode = (
    body: PbResetPasswordSendCodeRequest,
    params: RequestParams = {},
  ) =>
    this.http.request<PbResetPasswordSendCodeResponse, RpcStatus>({
      path: `/users/reset/send-code`,
      method: 'POST',
      body: body,
      type: ContentType.Json,
      format: 'json',
      ...params,
    });
  /**
   * @description In case a user forgot their password, they can confirm the password reset using this endpoint
   *
   * @tags Talebound
   * @name TaleboundResetPasswordVerifyCode
   * @summary Confirm password reset
   * @request POST:/users/reset/verify-code
   * @response `200` `PbResetPasswordVerifyCodeResponse` A successful response.
   * @response `default` `RpcStatus` An unexpected error response.
   */
  taleboundResetPasswordVerifyCode = (
    body: PbResetPasswordVerifyCodeRequest,
    params: RequestParams = {},
  ) =>
    this.http.request<PbResetPasswordVerifyCodeResponse, RpcStatus>({
      path: `/users/reset/verify-code`,
      method: 'POST',
      body: body,
      type: ContentType.Json,
      format: 'json',
      ...params,
    });
  /**
   * @description Validate reset password secret code
   *
   * @tags Talebound
   * @name TaleboundResetPasswordVerifyCodeValidity
   * @summary Validate reset password secret code
   * @request GET:/users/reset/verify-code-validity
   * @response `200` `PbResetPasswordVerifyCodeValidityResponse` A successful response.
   * @response `default` `RpcStatus` An unexpected error response.
   */
  taleboundResetPasswordVerifyCodeValidity = (
    query?: {
      secretCode?: string;
    },
    params: RequestParams = {},
  ) =>
    this.http.request<PbResetPasswordVerifyCodeValidityResponse, RpcStatus>({
      path: `/users/reset/verify-code-validity`,
      method: 'GET',
      query: query,
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
   * @description Get evaluation votes by user id
   *
   * @tags Talebound
   * @name TaleboundGetEvaluationVotesByUserId
   * @summary Get evaluation votes by user id
   * @request GET:/users/{userId}/evaluation-vote
   * @response `200` `PbGetEvaluationVotesByUserIdResponse` A successful response.
   * @response `default` `RpcStatus` An unexpected error response.
   */
  taleboundGetEvaluationVotesByUserId = (userId: number, params: RequestParams = {}) =>
    this.http.request<PbGetEvaluationVotesByUserIdResponse, RpcStatus>({
      path: `/users/${userId}/evaluation-vote`,
      method: 'GET',
      format: 'json',
      ...params,
    });
  /**
   * @description Create or update evaluation vote
   *
   * @tags Talebound
   * @name TaleboundCreateOrUpdateEvaluationVote
   * @summary Create or update evaluation vote
   * @request POST:/users/{userId}/evaluation-vote
   * @response `200` `PbCreateOrUpdateEvaluationVoteResponse` A successful response.
   * @response `default` `RpcStatus` An unexpected error response.
   */
  taleboundCreateOrUpdateEvaluationVote = (
    userId: number,
    body: {
      /** @format int32 */
      evaluationId?: number;
      /** @format int32 */
      userIdVoter?: number;
      /** @format double */
      value?: number;
    },
    params: RequestParams = {},
  ) =>
    this.http.request<PbCreateOrUpdateEvaluationVoteResponse, RpcStatus>({
      path: `/users/${userId}/evaluation-vote`,
      method: 'POST',
      body: body,
      type: ContentType.Json,
      format: 'json',
      ...params,
    });
  /**
   * @description Get average user evaluation by type
   *
   * @tags Talebound
   * @name TaleboundGetAverageUserEvaluationsByType
   * @summary Get average user evaluation
   * @request GET:/users/{userId}/evaluation-vote/type/{type}/average
   * @response `200` `PbGetAverageUserEvaluationsByTypeResponse` A successful response.
   * @response `default` `RpcStatus` An unexpected error response.
   */
  taleboundGetAverageUserEvaluationsByType = (
    userId: number,
    type: string,
    params: RequestParams = {},
  ) =>
    this.http.request<PbGetAverageUserEvaluationsByTypeResponse, RpcStatus>({
      path: `/users/${userId}/evaluation-vote/type/${type}/average`,
      method: 'GET',
      format: 'json',
      ...params,
    });
  /**
   * @description Get evaluation votes by user id and voter
   *
   * @tags Talebound
   * @name TaleboundGetEvaluationVotesByUserIdAndVoter
   * @summary Get evaluation votes by user id and voter
   * @request GET:/users/{userId}/evaluation-vote/voter/{userIdVoter}
   * @response `200` `PbGetEvaluationVotesByUserIdAndVoterResponse` A successful response.
   * @response `default` `RpcStatus` An unexpected error response.
   */
  taleboundGetEvaluationVotesByUserIdAndVoter = (
    userId: number,
    userIdVoter: number,
    params: RequestParams = {},
  ) =>
    this.http.request<PbGetEvaluationVotesByUserIdAndVoterResponse, RpcStatus>({
      path: `/users/${userId}/evaluation-vote/voter/${userIdVoter}`,
      method: 'GET',
      format: 'json',
      ...params,
    });
  /**
   * @description Delete evaluation vote
   *
   * @tags Talebound
   * @name TaleboundDeleteEvaluationVote
   * @summary Delete evaluation vote
   * @request DELETE:/users/{userId}/evaluation-vote/{evaluationId}/voter/{userIdVoter}
   * @response `200` `PbDeleteEvaluationVoteResponse` A successful response.
   * @response `default` `RpcStatus` An unexpected error response.
   */
  taleboundDeleteEvaluationVote = (
    userId: number,
    evaluationId: number,
    userIdVoter: number,
    params: RequestParams = {},
  ) =>
    this.http.request<PbDeleteEvaluationVoteResponse, RpcStatus>({
      path: `/users/${userId}/evaluation-vote/${evaluationId}/voter/${userIdVoter}`,
      method: 'DELETE',
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
