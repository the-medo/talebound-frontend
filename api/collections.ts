// noinspection JSUnusedGlobalSymbols

import { HttpClient } from '../generated/api-types/http-client';
import { Users } from '../generated/api-types/Users';
import { getApiUrl } from '../utils/functions/config';
import { Evaluations } from '../generated/api-types/Evaluations';
import { Posts } from '../generated/api-types/Posts';
import { Images } from '../generated/api-types/Images';
import { Worlds } from '../generated/api-types/Worlds';
import { Tags } from '../generated/api-types/Tags';
import { Menus } from '../generated/api-types/Menus';
import { Entities } from '../generated/api-types/Entities';
import { Maps } from '../generated/api-types/Maps';
import { Locations } from '../generated/api-types/Locations';
import { Modules } from '../generated/api-types/Modules';
import { Auth } from '../generated/api-types/Auth';
import { Fetcher } from '../generated/api-types/Fetcher';
import { excludeExistingIds, isFetcherKey, useRunFetcher } from './fetcher/useRunFetcher';
import { queryClient } from '../pages/_app';
import { PbRunFetcherRequest, PbRunFetcherResponse } from '../generated/api-types/data-contracts';
import { moduleAdapterSlice } from '../adapters/ModuleAdapter';
import { store } from '../store';
import { entityAdapterSlice } from '../adapters/EntityAdapter';
import { userAdapterSlice } from '../adapters/UserAdapter';
import { worldAdapterSlice } from '../adapters/WorldAdapter';
import { postAdapterSlice } from '../adapters/PostAdapter';
import { imageAdapterSlice } from '../adapters/ImageAdapter';
import { mapAdapterSlice } from '../adapters/MapAdapter';
import { locationAdapterSlice } from '../adapters/LocationAdapter';

export const API = new HttpClient({
  baseURL: getApiUrl(),
});

API.instance.interceptors.request.use(
  (req) => req,
  (error) => {
    // eslint-disable-next-line no-console,@typescript-eslint/no-unsafe-member-access
    console.log(error.response);
    return Promise.reject(error);
  },
);

API.instance.interceptors.response.use(async (response) => {
  console.log('INTERCEPTED');
  const fetchHeader = response.headers['fetch-ids'];
  console.log('response', response);
  console.log('response.headers', response.headers);
  console.log('fetchHeader', fetchHeader);
  if (response.request.responseURL.includes('/fetcher')) {
    console.log('============== FETCH RESPONSE DATA RECEIVED =============================');
    console.log('DATA: [ ', response.request.responseURL, ' ] ', response.data);
    const fetcherData = response.data as PbRunFetcherResponse;

    if (fetcherData.users) {
      console.log('Saving users to store ', fetcherData.users);
      // UserAdapter.upsertMany(store.getState().users, fetcherData.users);
      store.dispatch(userAdapterSlice.actions.upsertUsers(fetcherData.users));
    }
    if (fetcherData.modules) {
      console.log('Saving modules to store ', fetcherData.modules);
      // ModuleAdapter.upsertMany(store.getState().modules, fetcherData.modules);
      store.dispatch(moduleAdapterSlice.actions.upsertModules(fetcherData.modules));
    }
    if (fetcherData.worlds) {
      console.log('Saving worlds to store ', fetcherData.worlds);
      // WorldAdapter.upsertMany(store.getState().worlds, fetcherData.worlds);
      store.dispatch(worldAdapterSlice.actions.upsertWorlds(fetcherData.worlds));
    }
    if (fetcherData.entities) {
      console.log('Saving entities to store ', fetcherData.entities);
      store.dispatch(entityAdapterSlice.actions.upsertEntities(fetcherData.entities));
    }
    if (fetcherData.posts) {
      console.log('Saving posts to store ', fetcherData.posts);
      store.dispatch(postAdapterSlice.actions.upsertPosts(fetcherData.posts));
    }
    if (fetcherData.images) {
      console.log('Saving images to store ', fetcherData.images);
      // ImageAdapter.upsertMany(store.getState().images, fetcherData.images);
      store.dispatch(imageAdapterSlice.actions.upsertImages(fetcherData.images));
    }
    if (fetcherData.maps) {
      console.log('Saving maps to store ', fetcherData.maps);
      store.dispatch(mapAdapterSlice.actions.upsertMaps(fetcherData.maps));
    }
    if (fetcherData.locations) {
      console.log('Saving locations to store ', fetcherData.locations);
      store.dispatch(locationAdapterSlice.actions.upsertLocations(fetcherData.locations));
    }
  }

  if (fetchHeader) {
    console.log('================== FETCH HEADER RECEIVED ==================================');
    const headers = JSON.parse(fetchHeader);
    console.log('headers', headers);
    const result: PbRunFetcherRequest = {};
    let numberOfIds = 0;

    Object.keys(headers).forEach((key) => {
      // Convert snake_case to camelCase and append 'Ids'
      const newKey = key.replace(/_\w/g, (m) => m[1].toUpperCase());
      if (isFetcherKey(newKey)) {
        // Validate each ID in the array
        const ids = headers[key];
        if (Array.isArray(ids)) {
          result[newKey] = excludeExistingIds(
            newKey,
            ids.filter((id) => Number.isInteger(id)),
          );
          console.log(
            'Cleaning up ids for ',
            newKey,
            ' -- before: ',
            ids,
            ' -- after: ',
            result[newKey],
          );
          numberOfIds += result[newKey]?.length ?? 0;
        }
      }
    });

    if (numberOfIds > 0) {
      console.log('Sending request...');
      await queryClient.fetchQuery(useRunFetcher.getFetchOptions(result));
    }
    console.log('==========================================================');
  }
  return response;
});

export const AuthCollection = new Auth(API);
export const EntitiesCollection = new Entities(API);
export const EvaluationsCollection = new Evaluations(API);
export const FetcherCollection = new Fetcher(API);
export const ImagesCollection = new Images(API);
export const LocationsCollection = new Locations(API);
export const MapsCollection = new Maps(API);
export const MenusCollection = new Menus(API);
export const ModulesCollection = new Modules(API);
export const PostsCollection = new Posts(API);
export const TagsCollection = new Tags(API);
export const UsersCollection = new Users(API);
export const WorldsCollection = new Worlds(API);
