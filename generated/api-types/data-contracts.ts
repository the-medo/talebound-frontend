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
  /** @format double */
  average?: number;
}

export interface PbCreateEntityGroupRequest {
  /** @format int32 */
  parentEntityGroupId?: number;
  name?: string;
  description?: string;
  style?: string;
  direction?: string;
}

export interface PbCreateEntityTagResponse {
  /** @format int32 */
  entityId?: number;
  /** @format int32 */
  tagId?: number;
}

export interface PbCreateLocationRequest {
  /** @format int32 */
  moduleId?: number;
  name?: string;
  description?: string;
  /** @format int32 */
  thumbnailImageId?: number;
}

export interface PbCreateMapRequest {
  /** @format int32 */
  moduleId?: number;
  name?: string;
  type?: string;
  description?: string;
  /** @format int32 */
  thumbnailImageId?: number;
  /** @format int32 */
  layerImageId?: number;
}

export interface PbCreateMapResponse {
  map?: PbViewMap;
  layer?: PbViewMapLayer;
}

export interface PbCreateModuleEntityAvailableTagRequest {
  /** @format int32 */
  moduleId?: number;
  tag?: string;
}

export interface PbCreateModuleTagResponse {
  /** @format int32 */
  moduleId?: number;
  /** @format int32 */
  tagId?: number;
}

export interface PbCreateModuleTypeAvailableTagRequest {
  moduleType?: PbModuleType;
  tag?: string;
}

export interface PbCreateOrUpdateEvaluationVoteResponse {
  evaluationVote?: PbEvaluationVote;
}

export interface PbCreatePostRequest {
  title?: string;
  content?: string;
  isDraft?: boolean;
  isPrivate?: boolean;
}

export interface PbCreateUserRequest {
  username?: string;
  email?: string;
  password?: string;
}

export interface PbCreateUserResponse {
  user?: PbUser;
}

export interface PbCreateWorldRequest {
  name?: string;
  shortDescription?: string;
  basedOn?: string;
}

export interface PbCreateWorldResponse {
  world?: PbViewWorld;
  module?: PbViewModule;
}

export interface PbDeleteEvaluationVoteResponse {
  success?: boolean;
  message?: string;
}

export interface PbDeletePostResponse {
  success?: boolean;
  message?: string;
}

export interface PbEntity {
  /** @format int32 */
  id?: number;
  /** @format int32 */
  moduleId?: number;
  type?: PbEntityType;
  /** @format int32 */
  postId?: number;
  /** @format int32 */
  mapId?: number;
  /** @format int32 */
  locationId?: number;
  /** @format int32 */
  imageId?: number;
}

export interface PbEntityGroup {
  /** @format int32 */
  id?: number;
  name?: string;
  description?: string;
}

export interface PbEntityGroupContent {
  /** @format int32 */
  id?: number;
  /** @format int32 */
  entityGroupId?: number;
  /** @format int32 */
  position?: number;
  /** @format int32 */
  contentEntityId?: number;
  /** @format int32 */
  contentEntityGroupId?: number;
}

export interface PbEntityList {
  entities?: PbEntity[];
  posts?: PbViewPost[];
  maps?: PbViewMap[];
  locations?: PbViewLocation[];
  images?: PbImage[];
}

export interface PbEntityTagAvailable {
  /** @format int32 */
  id?: number;
  tag?: string;
  /** @format int32 */
  moduleId?: number;
}

/** @default "ENTITY_TYPE_UNKNOWN" */
export enum PbEntityType {
  ENTITY_TYPE_UNKNOWN = 'ENTITY_TYPE_UNKNOWN',
  ENTITY_TYPE_POST = 'ENTITY_TYPE_POST',
  ENTITY_TYPE_MAP = 'ENTITY_TYPE_MAP',
  ENTITY_TYPE_LOCATION = 'ENTITY_TYPE_LOCATION',
  ENTITY_TYPE_CHARACTER = 'ENTITY_TYPE_CHARACTER',
  ENTITY_TYPE_IMAGE = 'ENTITY_TYPE_IMAGE',
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
  /** @format double */
  value?: number;
  /** @format date-time */
  createdAt?: string;
}

export interface PbGetAverageUserEvaluationsByTypeResponse {
  averageEvaluationVote?: PbAverageEvaluationVote[];
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

export interface PbGetImagesResponse {
  images?: PbImage[];
  /** @format int32 */
  totalCount?: number;
}

export interface PbGetLocationsResponse {
  locations?: PbViewLocation[];
}

export interface PbGetMapLayersResponse {
  layers?: PbViewMapLayer[];
}

export interface PbGetMapPinTypesResponse {
  pinTypes?: PbMapPinType[];
}

export interface PbGetMapPinsResponse {
  pins?: PbViewMapPin[];
}

export interface PbGetMapsResponse {
  maps?: PbViewMap[];
}

export interface PbGetMenuItemContentResponse {
  menuItemEntityGroups?: number[];
  content?: PbEntityGroupContent[];
  entityList?: PbEntityList;
}

export interface PbGetMenuItemPostsByMenuIdResponse {
  menuItemPosts?: PbMenuItemPost[];
}

export interface PbGetMenuItemPostsResponse {
  menuItemPosts?: PbMenuItemPost[];
}

export interface PbGetMenuItemsResponse {
  menuItems?: PbMenuItem[];
}

export interface PbGetModuleAdminsResponse {
  moduleAdmins?: PbModuleAdmin[];
}

export interface PbGetModuleEntityAvailableTagsResponse {
  tags?: PbTag[];
}

export interface PbGetModuleIdResponse {
  /** @format int32 */
  moduleId?: number;
  moduleType?: PbModuleType;
}

export interface PbGetModuleTypeAvailableTagsResponse {
  tags?: PbViewTag[];
}

export interface PbGetPostHistoryResponse {
  historyPosts?: PbPostHistory[];
}

export interface PbGetPostsByModuleResponse {
  posts?: PbViewPost[];
  /** @format int32 */
  totalCount?: number;
}

export interface PbGetUserModulesResponse {
  userModules?: PbUserModule[];
}

export interface PbGetUserPostsResponse {
  posts?: PbViewPost[];
}

export interface PbGetUserRolesResponse {
  role?: PbRole[];
}

export interface PbGetUsersResponse {
  users?: PbUser[];
}

export interface PbGetWorldsResponse {
  worldIds?: number[];
  /** @format int32 */
  totalCount?: number;
}

export interface PbImage {
  /** @format int32 */
  id?: number;
  imgGuid?: string;
  /** @format int32 */
  imageTypeId?: number;
  name?: string;
  url?: string;
  baseUrl?: string;
  /** @format date-time */
  createdAt?: string;
  /** @format int32 */
  userId?: number;
  /** @format int32 */
  width?: number;
  /** @format int32 */
  height?: number;
}

export interface PbLocation {
  /** @format int32 */
  id?: number;
  name?: string;
  description?: string;
  /** @format int32 */
  postId?: number;
  /** @format int32 */
  thumbnailImageId?: number;
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

export interface PbMap {
  /** @format int32 */
  id?: number;
  name?: string;
  type?: string;
  description?: string;
  /** @format int32 */
  width?: number;
  /** @format int32 */
  height?: number;
  /** @format int32 */
  thumbnailImageId?: number;
}

export interface PbMapPinType {
  /** @format int32 */
  id?: number;
  /** @format int32 */
  mapPinTypeGroupId?: number;
  shape?: PbPinShape;
  backgroundColor?: string;
  borderColor?: string;
  iconColor?: string;
  icon?: string;
  /** @format int32 */
  iconSize?: number;
  /** @format int32 */
  width?: number;
  section?: string;
}

export interface PbMenuItem {
  /** @format int32 */
  id?: number;
  /** @format int32 */
  menuId?: number;
  code?: string;
  name?: string;
  /** @format int32 */
  position?: number;
  isMain?: boolean;
  /** @format int32 */
  descriptionPostId?: number;
  /** @format int32 */
  entityGroupId?: number;
}

export interface PbMenuItemPost {
  /** @format int32 */
  menuItemId?: number;
  /** @format int32 */
  postId?: number;
  /** @format int32 */
  position?: number;
  post?: PbViewPost;
}

export interface PbModule {
  /** @format int32 */
  id?: number;
  moduleType?: PbModuleType;
  /** @format int32 */
  worldId?: number;
  /** @format int32 */
  questId?: number;
  /** @format int32 */
  characterId?: number;
  /** @format int32 */
  systemId?: number;
  /** @format int32 */
  menuId?: number;
  /** @format int32 */
  headerImgId?: number;
  /** @format int32 */
  thumbnailImgId?: number;
  /** @format int32 */
  avatarImgId?: number;
}

export interface PbModuleAdmin {
  /** @format int32 */
  worldId?: number;
  /** @format int32 */
  userId?: number;
  user?: PbViewUser;
  /** @format date-time */
  createdAt?: string;
  superAdmin?: boolean;
  /** @format int32 */
  approved?: number;
  motivationalLetter?: string;
  allowedEntityTypes?: PbEntityType[];
  allowedMenu?: boolean;
}

export interface PbModuleDefinition {
  /** @format int32 */
  worldId?: number;
  /** @format int32 */
  questId?: number;
  /** @format int32 */
  characterId?: number;
  /** @format int32 */
  systemId?: number;
}

/** @default "MODULE_TYPE_UNKNOWN" */
export enum PbModuleType {
  MODULE_TYPE_UNKNOWN = 'MODULE_TYPE_UNKNOWN',
  MODULE_TYPE_WORLD = 'MODULE_TYPE_WORLD',
  MODULE_TYPE_QUEST = 'MODULE_TYPE_QUEST',
  MODULE_TYPE_SYSTEM = 'MODULE_TYPE_SYSTEM',
  MODULE_TYPE_CHARACTER = 'MODULE_TYPE_CHARACTER',
}

/** @default "SQUARE" */
export enum PbPinShape {
  SQUARE = 'SQUARE',
  TRIANGLE = 'TRIANGLE',
  PIN = 'PIN',
  CIRCLE = 'CIRCLE',
  HEXAGON = 'HEXAGON',
  OCTAGON = 'OCTAGON',
  STAR = 'STAR',
  DIAMOND = 'DIAMOND',
  PENTAGON = 'PENTAGON',
  HEART = 'HEART',
  CLOUD = 'CLOUD',
}

export interface PbPost {
  /** @format int32 */
  id?: number;
  /** @format int32 */
  userId?: number;
  title?: string;
  content?: string;
  description?: string;
  /** @format date-time */
  createdAt?: string;
  /** @format date-time */
  deletedAt?: string;
  /** @format date-time */
  lastUpdatedAt?: string;
  /** @format int32 */
  lastUpdatedUserId?: number;
  isDraft?: boolean;
  isPrivate?: boolean;
  /** @format int32 */
  imageThumbnailId?: number;
}

export interface PbPostHistory {
  /** @format int32 */
  id?: number;
  /** @format int32 */
  postId?: number;
  /** @format int32 */
  userId?: number;
  title?: string;
  content?: string;
  description?: string;
  /** @format date-time */
  createdAt?: string;
  /** @format date-time */
  deletedAt?: string;
  /** @format date-time */
  lastUpdatedAt?: string;
  /** @format int32 */
  lastUpdatedUserId?: number;
  isDraft?: boolean;
  isPrivate?: boolean;
  /** @format int32 */
  imageThumbnailId?: number;
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

export interface PbRunFetcherRequest {
  moduleIds?: number[];
  worldIds?: number[];
  systemIds?: number[];
  questIds?: number[];
  characterIds?: number[];
  entityIds?: number[];
  postIds?: number[];
  imageIds?: number[];
  locationIds?: number[];
  mapIds?: number[];
  userIds?: number[];
}

export interface PbRunFetcherResponse {
  modules?: PbModule[];
  worlds?: PbWorld[];
  entities?: PbViewEntity[];
  posts?: PbPost[];
  images?: PbImage[];
  maps?: PbMap[];
  locations?: PbLocation[];
  users?: PbUser[];
}

export interface PbTag {
  /** @format int32 */
  id?: number;
  tag?: string;
}

export interface PbUpdateMapPinTypeResponse {
  pinType?: PbMapPinType;
}

export interface PbUpdateMenuPostsResponse {
  menuItemPosts?: PbMenuItemPost[];
}

export interface PbUpdateUserRequest {
  /** @format int32 */
  id?: number;
  username?: string;
  email?: string;
  password?: string;
  /** @format int32 */
  imgId?: number;
  /** @format int32 */
  introductionPostId?: number;
}

export interface PbUpdateUserResponse {
  user?: PbUser;
}

export interface PbUploadImageRequest {
  filename?: string;
  /** @format byte */
  data?: string;
  /** @format int32 */
  imageTypeId?: number;
  /** @format int32 */
  width?: number;
  /** @format int32 */
  height?: number;
}

export interface PbUploadUserAvatarResponse {
  /** @format int32 */
  userId?: number;
  image?: PbImage;
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
  /** @format int32 */
  introductionPostId?: number;
}

export interface PbUserModule {
  /** @format int32 */
  userId?: number;
  /** @format int32 */
  moduleId?: number;
  admin?: boolean;
  favorite?: boolean;
  following?: boolean;
  entityNotifications?: PbEntityType[];
}

export interface PbVerifyEmailRequest {
  /** @format int64 */
  emailId?: string;
  secretCode?: string;
}

export interface PbVerifyEmailResponse {
  isVerified?: boolean;
}

export interface PbViewEntity {
  /** @format int32 */
  id?: number;
  type?: PbEntityType;
  /** @format int32 */
  postId?: number;
  /** @format int32 */
  mapId?: number;
  /** @format int32 */
  locationId?: number;
  /** @format int32 */
  imageId?: number;
  /** @format int32 */
  moduleId?: number;
  moduleType?: PbModuleType;
  /** @format int32 */
  moduleTypeId?: number;
  tags?: number[];
}

export interface PbViewLocation {
  /** @format int32 */
  id?: number;
  name?: string;
  description?: string;
  /** @format int32 */
  postId?: number;
  postTitle?: string;
  /** @format int32 */
  thumbnailImageId?: number;
  thumbnailImageUrl?: string;
  /** @format int32 */
  entityId?: number;
  /** @format int32 */
  moduleId?: number;
  moduleType?: PbModuleType;
  /** @format int32 */
  moduleTypeId?: number;
  tags?: number[];
}

export interface PbViewMap {
  /** @format int32 */
  id?: number;
  name?: string;
  type?: string;
  description?: string;
  /** @format int32 */
  width?: number;
  /** @format int32 */
  height?: number;
  /** @format int32 */
  thumbnailImageId?: number;
  thumbnailImageUrl?: string;
  /** @format int32 */
  entityId?: number;
  /** @format int32 */
  moduleId?: number;
  moduleType?: PbModuleType;
  /** @format int32 */
  moduleTypeId?: number;
  tags?: number[];
}

export interface PbViewMapLayer {
  /** @format int32 */
  id?: number;
  name?: string;
  /** @format int32 */
  mapId?: number;
  /** @format int32 */
  imageId?: number;
  imageUrl?: string;
  isMain?: boolean;
  enabled?: boolean;
  sublayer?: boolean;
}

export interface PbViewMapPin {
  /** @format int32 */
  id?: number;
  name?: string;
  /** @format int32 */
  mapId?: number;
  /** @format int32 */
  mapPinTypeId?: number;
  /** @format int32 */
  locationId?: number;
  /** @format int32 */
  mapLayerId?: number;
  /** @format int32 */
  x?: number;
  /** @format int32 */
  y?: number;
  locationName?: string;
  /** @format int32 */
  locationPostId?: number;
  locationDescription?: string;
  /** @format int32 */
  locationThumbnailImageId?: number;
  locationThumbnailImageUrl?: string;
}

export interface PbViewMenu {
  /** @format int32 */
  id?: number;
  code?: string;
  /** @format int32 */
  headerImageId?: number;
  headerImageUrl?: string;
}

export interface PbViewModule {
  /** @format int32 */
  moduleId?: number;
  moduleType?: PbModuleType;
  /** @format int32 */
  moduleWorldId?: number;
  /** @format int32 */
  moduleQuestId?: number;
  /** @format int32 */
  moduleCharacterId?: number;
  /** @format int32 */
  moduleSystemId?: number;
  /** @format int32 */
  menuId?: number;
  /** @format int32 */
  headerImgId?: number;
  headerImgUrl?: string;
  /** @format int32 */
  thumbnailImgId?: number;
  thumbnailImgUrl?: string;
  /** @format int32 */
  avatarImgId?: number;
  avatarImgUrl?: string;
  tags?: number[];
}

export interface PbViewPost {
  /** @format int32 */
  id?: number;
  /** @format int32 */
  userId?: number;
  title?: string;
  content?: string;
  description?: string;
  /** @format date-time */
  createdAt?: string;
  /** @format date-time */
  deletedAt?: string;
  /** @format date-time */
  lastUpdatedAt?: string;
  /** @format int32 */
  lastUpdatedUserId?: number;
  isDraft?: boolean;
  isPrivate?: boolean;
  /** @format int32 */
  imageThumbnailId?: number;
  imageThumbnailUrl?: string;
  /** @format int32 */
  entityId?: number;
  /** @format int32 */
  moduleId?: number;
  moduleType?: PbModuleType;
  /** @format int32 */
  moduleTypeId?: number;
  tags?: number[];
}

export interface PbViewTag {
  /** @format int32 */
  id?: number;
  tag?: string;
  moduleType?: PbModuleType;
  /** @format int32 */
  count?: number;
}

export interface PbViewUser {
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
  avatarImageUrl?: string;
  avatarImageGuid?: string;
  /** @format int32 */
  introductionPostId?: number;
  /** @format date-time */
  introductionPostDeletedAt?: string;
}

export interface PbViewWorld {
  /** @format int32 */
  id?: number;
  name?: string;
  public?: boolean;
  /** @format date-time */
  createdAt?: string;
  basedOn?: string;
  shortDescription?: string;
  /** @format int32 */
  descriptionPostId?: number;
  /** @format int32 */
  moduleId?: number;
  /** @format int32 */
  menuId?: number;
  /** @format int32 */
  headerImgId?: number;
  headerImgUrl?: string;
  /** @format int32 */
  thumbnailImgId?: number;
  thumbnailImgUrl?: string;
  /** @format int32 */
  avatarImgId?: number;
  avatarImgUrl?: string;
  tags?: number[];
}

export interface PbWorld {
  /** @format int32 */
  id?: number;
  name?: string;
  public?: boolean;
  /** @format date-time */
  createdAt?: string;
  basedOn?: string;
  shortDescription?: string;
  /** @format int32 */
  descriptionPostId?: number;
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
