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
import { isFetcherKey, useRunFetcher } from './fetcher/useRunFetcher';
import { queryClient } from '../pages/_app';

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
  if (fetchHeader) {
    const headers = JSON.parse(fetchHeader);
    console.log('headers', headers);
    const result: RunFetcherRequest = {};
    let numberOfIds = 0;

    Object.keys(headers).forEach((key) => {
      // Convert snake_case to camelCase and append 'Ids'
      console.log('key', key);
      const newKey = key.replace(/_\w/g, (m) => m[1].toUpperCase());
      console.log('newKey', newKey);
      if (isFetcherKey(newKey)) {
        console.log('isFetcherKey!', newKey);
        // Validate each ID in the array
        const ids = headers[key];
        if (Array.isArray(ids)) {
          result[newKey] = ids.filter((id) => Number.isInteger(id));
          numberOfIds += result[newKey].length;
        }
      }
    });

    if (numberOfIds > 0) {
      console.log('Sending request...');
      await queryClient.fetchQuery(useRunFetcher.getFetchOptions(result));
    }
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
