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

import { PbGetModuleIdResponse, RpcStatus } from './data-contracts';
import { HttpClient, RequestParams } from './http-client';

export class Modules<SecurityDataType = unknown> {
  http: HttpClient<SecurityDataType>;

  constructor(http: HttpClient<SecurityDataType>) {
    this.http = http;
  }

  /**
   * @description gets id of the module (based on world id, quest id,...)
   *
   * @tags Modules
   * @name ModulesGetModuleId
   * @summary Get id of the module
   * @request GET:/modules/id
   * @response `200` `PbGetModuleIdResponse` A successful response.
   * @response `default` `RpcStatus` An unexpected error response.
   */
  modulesGetModuleId = (
    query?: {
      /** @format int32 */
      worldId?: number;
      /** @format int32 */
      questId?: number;
      /** @format int32 */
      characterId?: number;
      /** @format int32 */
      systemId?: number;
    },
    params: RequestParams = {},
  ) =>
    this.http.request<PbGetModuleIdResponse, RpcStatus>({
      path: `/modules/id`,
      method: 'GET',
      query: query,
      format: 'json',
      ...params,
    });
}
