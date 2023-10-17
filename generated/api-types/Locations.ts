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

import { PbViewLocation, RpcStatus } from './data-contracts';
import { ContentType, HttpClient, RequestParams } from './http-client';

export class Locations<SecurityDataType = unknown> {
  http: HttpClient<SecurityDataType>;

  constructor(http: HttpClient<SecurityDataType>) {
    this.http = http;
  }

  /**
   * @description updates location properties
   *
   * @tags Locations
   * @name LocationsUpdateLocation
   * @summary Update location
   * @request PATCH:/locations/{locationId}
   * @response `200` `PbViewLocation` A successful response.
   * @response `default` `RpcStatus` An unexpected error response.
   */
  locationsUpdateLocation = (
    locationId: number,
    body: {
      name?: string;
      description?: string;
      /** @format int32 */
      postId?: number;
      /** @format int32 */
      thumbnailImageId?: number;
    },
    params: RequestParams = {},
  ) =>
    this.http.request<PbViewLocation, RpcStatus>({
      path: `/locations/${locationId}`,
      method: 'PATCH',
      body: body,
      type: ContentType.Json,
      format: 'json',
      ...params,
    });
}
