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

export interface PbAverageEvaluationVote {
  /** @format int32 */
  evaluationId?: number;
  /** @format int32 */
  userId?: number;
  name?: string;
  description?: string;
  type?: string;
  /** @format float */
  average?: number;
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

export interface PbCreateOrUpdateEvaluationVoteResponse {
  evaluationVote?: PbEvaluationVote;
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

export interface PbDeleteEvaluationVoteResponse {
  success?: boolean;
  message?: string;
}

export interface PbEvaluation {
  /** @format int32 */
  id?: number;
  name?: string;
  description?: string;
  type?: PbEvaluationType;
}

/** @default "self" */
export enum PbEvaluationType {
  Self = 'self',
  Dm = 'dm',
}

export interface PbEvaluationVote {
  /** @format int32 */
  evaluationId?: number;
  /** @format int32 */
  userId?: number;
  /** @format int32 */
  userIdVoter?: number;
  /** @format int32 */
  value?: number;
  /** @format date-time */
  createdAt?: string;
}

export interface PbGetAverageUserEvaluationsByTypeResponse {
  averageEvaluationVote?: PbAverageEvaluationVote[];
}

export interface PbGetChatMessagesResponse {
  messages?: PbChatMessage[];
}

export interface PbGetEvaluationByIdResponse {
  evaluation?: PbEvaluation;
}

export interface PbGetEvaluationVotesByUserIdAndVoterResponse {
  evaluationVote?: PbEvaluationVote[];
}

export interface PbGetEvaluationVotesByUserIdResponse {
  evaluationVote?: PbEvaluationVote[];
}

export interface PbGetEvaluationsByTypeResponse {
  evaluation?: PbEvaluation[];
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

export interface PbResetPasswordSendCodeRequest {
  email?: string;
}

export interface PbResetPasswordSendCodeResponse {
  success?: boolean;
  message?: string;
}

export interface PbResetPasswordVerifyCodeRequest {
  secretCode?: string;
  newPassword?: string;
}

export interface PbResetPasswordVerifyCodeResponse {
  success?: boolean;
  message?: string;
}

export interface PbResetPasswordVerifyCodeValidityResponse {
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
