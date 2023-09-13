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
  PbGetMenuItemPostsByMenuIdResponse,
  PbGetMenuItemPostsResponse,
  PbGetMenuItemsResponse,
  PbMenuItem,
  PbMenuItemPost,
  PbViewMenu,
  RpcStatus,
} from './data-contracts';
import { ContentType, HttpClient, RequestParams } from './http-client';

export class Menus<SecurityDataType = unknown> {
  http: HttpClient<SecurityDataType>;

  constructor(http: HttpClient<SecurityDataType>) {
    this.http = http;
  }

  /**
   * @description gets menu by ID
   *
   * @tags Talebound
   * @name TaleboundGetMenu
   * @summary Get menu by ID
   * @request GET:/menus/{menuId}
   * @response `200` `PbViewMenu` A successful response.
   * @response `default` `RpcStatus` An unexpected error response.
   */
  taleboundGetMenu = (menuId: number, params: RequestParams = {}) =>
    this.http.request<PbViewMenu, RpcStatus>({
      path: `/menus/${menuId}`,
      method: 'GET',
      format: 'json',
      ...params,
    });
  /**
   * @description updates menu (code or image)
   *
   * @tags Talebound
   * @name TaleboundUpdateMenu
   * @summary Update Menu
   * @request PATCH:/menus/{menuId}
   * @response `200` `PbViewMenu` A successful response.
   * @response `default` `RpcStatus` An unexpected error response.
   */
  taleboundUpdateMenu = (
    menuId: number,
    body: {
      code?: string;
      /** @format int32 */
      headerImgId?: number;
    },
    params: RequestParams = {},
  ) =>
    this.http.request<PbViewMenu, RpcStatus>({
      path: `/menus/${menuId}`,
      method: 'PATCH',
      body: body,
      type: ContentType.Json,
      format: 'json',
      ...params,
    });
  /**
   * @description move menu item group up
   *
   * @tags Talebound
   * @name TaleboundUpdateMenuItemMoveGroupUp
   * @summary Move menu item group up
   * @request PATCH:/menus/{menuId}/groups/{menuItemId}
   * @response `200` `object` A successful response.
   * @response `default` `RpcStatus` An unexpected error response.
   */
  taleboundUpdateMenuItemMoveGroupUp = (
    menuId: number,
    menuItemId: number,
    params: RequestParams = {},
  ) =>
    this.http.request<object, RpcStatus>({
      path: `/menus/${menuId}/groups/${menuItemId}`,
      method: 'PATCH',
      format: 'json',
      ...params,
    });
  /**
   * @description gets list of menu items
   *
   * @tags Talebound
   * @name TaleboundGetMenuItems
   * @summary Get menu items
   * @request GET:/menus/{menuId}/items
   * @response `200` `PbGetMenuItemsResponse` A successful response.
   * @response `default` `RpcStatus` An unexpected error response.
   */
  taleboundGetMenuItems = (menuId: number, params: RequestParams = {}) =>
    this.http.request<PbGetMenuItemsResponse, RpcStatus>({
      path: `/menus/${menuId}/items`,
      method: 'GET',
      format: 'json',
      ...params,
    });
  /**
   * @description adds new menu item to the menu
   *
   * @tags Talebound
   * @name TaleboundCreateMenuItem
   * @summary Create menu item
   * @request POST:/menus/{menuId}/items
   * @response `200` `PbMenuItem` A successful response.
   * @response `default` `RpcStatus` An unexpected error response.
   */
  taleboundCreateMenuItem = (
    menuId: number,
    body: {
      code?: string;
      name?: string;
      /** @format int32 */
      position?: number;
      isMain?: boolean;
    },
    params: RequestParams = {},
  ) =>
    this.http.request<PbMenuItem, RpcStatus>({
      path: `/menus/${menuId}/items`,
      method: 'POST',
      body: body,
      type: ContentType.Json,
      format: 'json',
      ...params,
    });
  /**
   * @description deletes menu item
   *
   * @tags Talebound
   * @name TaleboundDeleteMenuItem
   * @summary Delete menu item
   * @request DELETE:/menus/{menuId}/items/{menuItemId}
   * @response `200` `object` A successful response.
   * @response `default` `RpcStatus` An unexpected error response.
   */
  taleboundDeleteMenuItem = (menuId: number, menuItemId: number, params: RequestParams = {}) =>
    this.http.request<object, RpcStatus>({
      path: `/menus/${menuId}/items/${menuItemId}`,
      method: 'DELETE',
      format: 'json',
      ...params,
    });
  /**
   * @description updates menu item
   *
   * @tags Talebound
   * @name TaleboundUpdateMenuItem
   * @summary Update menu item
   * @request PATCH:/menus/{menuId}/items/{menuItemId}
   * @response `200` `PbMenuItem` A successful response.
   * @response `default` `RpcStatus` An unexpected error response.
   */
  taleboundUpdateMenuItem = (
    menuId: number,
    menuItemId: number,
    body: {
      code?: string;
      name?: string;
      /** @format int32 */
      position?: number;
      isMain?: boolean;
      /** @format int32 */
      descriptionPostId?: number;
    },
    params: RequestParams = {},
  ) =>
    this.http.request<PbMenuItem, RpcStatus>({
      path: `/menus/${menuId}/items/${menuItemId}`,
      method: 'PATCH',
      body: body,
      type: ContentType.Json,
      format: 'json',
      ...params,
    });
  /**
   * @description gets list of menu item posts
   *
   * @tags Talebound
   * @name TaleboundGetMenuItemPosts
   * @summary Get menu item posts
   * @request GET:/menus/{menuId}/items/{menuItemId}/posts
   * @response `200` `PbGetMenuItemPostsResponse` A successful response.
   * @response `default` `RpcStatus` An unexpected error response.
   */
  taleboundGetMenuItemPosts = (menuId: number, menuItemId: number, params: RequestParams = {}) =>
    this.http.request<PbGetMenuItemPostsResponse, RpcStatus>({
      path: `/menus/${menuId}/items/${menuItemId}/posts`,
      method: 'GET',
      format: 'json',
      ...params,
    });
  /**
   * @description adds new menu item post to the menu item
   *
   * @tags Talebound
   * @name TaleboundCreateMenuItemPost
   * @summary Create menu item post
   * @request POST:/menus/{menuId}/items/{menuItemId}/posts
   * @response `200` `PbMenuItemPost` A successful response.
   * @response `default` `RpcStatus` An unexpected error response.
   */
  taleboundCreateMenuItemPost = (
    menuId: number,
    menuItemId: number,
    body: {
      /** @format int32 */
      postId?: number;
      /** @format int32 */
      position?: number;
      isMenuItemDescriptionPost?: boolean;
      title?: string;
      shortDescription?: string;
      /** @format int32 */
      imageThumbnailId?: number;
    },
    params: RequestParams = {},
  ) =>
    this.http.request<PbMenuItemPost, RpcStatus>({
      path: `/menus/${menuId}/items/${menuItemId}/posts`,
      method: 'POST',
      body: body,
      type: ContentType.Json,
      format: 'json',
      ...params,
    });
  /**
   * @description deletes menu item post
   *
   * @tags Talebound
   * @name TaleboundDeleteMenuItemPost
   * @summary Delete menu item post
   * @request DELETE:/menus/{menuId}/items/{menuItemId}/posts/{postId}
   * @response `200` `object` A successful response.
   * @response `default` `RpcStatus` An unexpected error response.
   */
  taleboundDeleteMenuItemPost = (
    menuId: number,
    menuItemId: number,
    postId: number,
    params: RequestParams = {},
  ) =>
    this.http.request<object, RpcStatus>({
      path: `/menus/${menuId}/items/${menuItemId}/posts/${postId}`,
      method: 'DELETE',
      format: 'json',
      ...params,
    });
  /**
   * @description updates menu item post
   *
   * @tags Talebound
   * @name TaleboundUpdateMenuItemPost
   * @summary Update menu item post
   * @request PATCH:/menus/{menuId}/items/{menuItemId}/posts/{postId}
   * @response `200` `object` A successful response.
   * @response `default` `RpcStatus` An unexpected error response.
   */
  taleboundUpdateMenuItemPost = (
    menuId: number,
    menuItemId: number,
    postId: number,
    body: {
      /** @format int32 */
      newMenuItemId?: number;
      /** @format int32 */
      position?: number;
    },
    params: RequestParams = {},
  ) =>
    this.http.request<object, RpcStatus>({
      path: `/menus/${menuId}/items/${menuItemId}/posts/${postId}`,
      method: 'PATCH',
      body: body,
      type: ContentType.Json,
      format: 'json',
      ...params,
    });
  /**
   * @description gets list of menu item posts for menu
   *
   * @tags Talebound
   * @name TaleboundGetMenuItemPostsByMenuId
   * @summary Get menu item posts by menu id
   * @request GET:/menus/{menuId}/posts
   * @response `200` `PbGetMenuItemPostsByMenuIdResponse` A successful response.
   * @response `default` `RpcStatus` An unexpected error response.
   */
  taleboundGetMenuItemPostsByMenuId = (menuId: number, params: RequestParams = {}) =>
    this.http.request<PbGetMenuItemPostsByMenuIdResponse, RpcStatus>({
      path: `/menus/${menuId}/posts`,
      method: 'GET',
      format: 'json',
      ...params,
    });
}
