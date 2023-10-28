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
  /** @format double */
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

export interface PbCreateAvailableWorldTagRequest {
  tag?: string;
}

export interface PbCreateEntityGroupRequest {
  /** @format int32 */
  parentEntityGroupId?: number;
  name?: string;
  description?: string;
  style?: string;
  direction?: string;
}

export interface PbCreateLocationRequest {
  module?: PbModule;
  name?: string;
  description?: string;
  /** @format int32 */
  thumbnailImageId?: number;
}

export interface PbCreateMapRequest {
  module?: PbModule;
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

export interface PbCreateOrUpdateEvaluationVoteResponse {
  evaluationVote?: PbEvaluationVote;
}

export interface PbCreatePostRequest {
  title?: string;
  content?: string;
  /** @format int32 */
  postTypeId?: number;
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

export interface PbDataHistoryPost {
  /** @format int32 */
  id?: number;
  /** @format int32 */
  postId?: number;
  /** @format int32 */
  postTypeId?: number;
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
  postTypeName?: string;
  postTypeDraftable?: boolean;
  postTypePrivatable?: boolean;
  /** @format int32 */
  imageThumbnailId?: number;
}

export interface PbDataPost {
  /** @format int32 */
  id?: number;
  /** @format int32 */
  postTypeId?: number;
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
}

export interface PbDataPostType {
  /** @format int32 */
  id?: number;
  name?: string;
  draftable?: boolean;
  privatable?: boolean;
}

export interface PbDeleteChatMessageResponse {
  success?: boolean;
  message?: string;
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
  posts?: PbDataPost[];
  maps?: PbViewMap[];
  locations?: PbViewLocation[];
  images?: PbImage[];
}

/** @default "UNKNOWN" */
export enum PbEntityType {
  UNKNOWN = 'UNKNOWN',
  POST = 'POST',
  MAP = 'MAP',
  LOCATION = 'LOCATION',
  CHARACTER = 'CHARACTER',
  IMAGE = 'IMAGE',
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

export interface PbGetAvailableWorldTagsResponse {
  tags?: PbViewTag[];
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

export interface PbGetPostHistoryResponse {
  historyPosts?: PbHistoryPost[];
}

export interface PbGetPostTypesResponse {
  postTypes?: PbDataPostType[];
}

export interface PbGetPostsByModuleResponse {
  posts?: PbPost[];
  /** @format int32 */
  totalCount?: number;
}

export interface PbGetUserPostsResponse {
  posts?: PbPost[];
}

export interface PbGetUserRolesResponse {
  role?: PbRole[];
}

export interface PbGetUsersResponse {
  users?: PbUser[];
}

export interface PbGetWorldAdminsResponse {
  worldAdmins?: PbWorldAdmin[];
}

export interface PbGetWorldDailyActivityResponse {
  activity?: PbWorldActivity[];
}

export interface PbGetWorldMonthlyActivityResponse {
  activity?: PbWorldActivity[];
}

export interface PbGetWorldsOfCreatorResponse {
  worlds?: PbWorldOfCreatorResponse[];
}

export interface PbGetWorldsResponse {
  worlds?: PbWorld[];
  /** @format int32 */
  totalCount?: number;
}

export interface PbHistoryPost {
  post?: PbDataHistoryPost;
  postType?: PbDataPostType;
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
  post?: PbDataPost;
}

export interface PbModule {
  /** @format int32 */
  worldId?: number;
  /** @format int32 */
  questId?: number;
  /** @format int32 */
  characterId?: number;
  /** @format int32 */
  systemId?: number;
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
  post?: PbDataPost;
  postType?: PbDataPostType;
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
  img?: PbImage;
  /** @format int32 */
  introductionPostId?: number;
}

export interface PbVerifyEmailRequest {
  /** @format int64 */
  emailId?: string;
  secretCode?: string;
}

export interface PbVerifyEmailResponse {
  isVerified?: boolean;
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

export interface PbViewTag {
  /** @format int32 */
  id?: number;
  tag?: string;
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

export interface PbWorld {
  /** @format int32 */
  id?: number;
  name?: string;
  public?: boolean;
  /** @format date-time */
  createdAt?: string;
  basedOn?: string;
  shortDescription?: string;
  imageAvatar?: string;
  imageThumbnail?: string;
  imageHeader?: string;
  /** @format int32 */
  descriptionPostId?: number;
  tags?: string[];
  /** @format int32 */
  activityPostCount?: number;
  /** @format int32 */
  activityQuestCount?: number;
  /** @format int32 */
  activityResourceCount?: number;
  /** @format int32 */
  worldMenuId?: number;
}

export interface PbWorldActivity {
  /** @format int32 */
  worldId?: number;
  /** @format date-time */
  date?: string;
  /** @format int32 */
  activityPostCount?: number;
  /** @format int32 */
  activityQuestCount?: number;
  /** @format int32 */
  activityResourceCount?: number;
}

export interface PbWorldAdmin {
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
}

export interface PbWorldOfCreatorResponse {
  world?: PbWorld;
  superAdmin?: boolean;
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
