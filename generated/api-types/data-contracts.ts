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

export interface PbAddChatMessageRequest {
  text?: string;
}

export interface PbAddChatMessageResponse {
  message?: PbChatMessage;
}

export interface PbAddRoleToUserRequest {
  /** @format int32 */
  userId?: number;
  /** @format int32 */
  roleId?: number;
}

export interface PbAddRoleToUserResponse {
  success?: boolean;
  message?: string;
}

export interface PbChatMessage {
  /** @format int64 */
  id?: string;
  /** @format int32 */
  userId?: number;
  username?: string;
  text?: string;
  /** @format date-time */
  createdAt?: string;
}

export interface PbCreateUserRequest {
  username?: string;
  email?: string;
  password?: string;
}

export interface PbCreateUserResponse {
  user?: PbUser;
}

export interface PbDeleteChatMessageResponse {
  success?: boolean;
  message?: string;
}

export interface PbGetChatMessagesResponse {
  messages?: PbChatMessage[];
}

export interface PbGetUserRolesResponse {
  role?: PbRole[];
}

export interface PbGetUsersResponse {
  users?: PbUser[];
}

export interface PbLoginUserRequest {
  username?: string;
  password?: string;
}

export interface PbLoginUserResponse {
  user?: PbUser;
  sessionId?: string;
  /** @format date-time */
  accessTokenExpiresAt?: string;
  /** @format date-time */
  refreshTokenExpiresAt?: string;
}

export interface PbRemoveRoleFromUserResponse {
  success?: boolean;
  message?: string;
}

export interface PbRole {
  /** @format int32 */
  id?: number;
  name?: string;
  description?: string;
}

export interface PbUpdateUserRequest {
  /** @format int32 */
  id?: number;
  username?: string;
  email?: string;
  password?: string;
  /** @format int32 */
  imgId?: number;
}

export interface PbUpdateUserResponse {
  user?: PbUser;
}

export interface PbUser {
  /** @format int32 */
  id?: number;
  username?: string;
  email?: string;
  /** @format int32 */
  imgId?: number;
  /** @format date-time */
  passwordChangedAt?: string;
  /** @format date-time */
  createdAt?: string;
  isEmailVerified?: boolean;
}

export interface PbVerifyEmailResponse {
  isVerified?: boolean;
}

export interface ProtobufAny {
  '@type'?: string;
  [key: string]: any;
}

export interface RpcStatus {
  /** @format int32 */
  code?: number;
  message?: string;
  details?: ProtobufAny[];
}
