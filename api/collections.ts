// noinspection JSUnusedGlobalSymbols

import { HttpClient } from '../generated/api-types/http-client';
import { Chat } from '../generated/api-types/Chat';
import { Users } from '../generated/api-types/Users';
import { Verify } from '../generated/api-types/Verify';
import { getApiUrl } from '../utils/functions/config';
import { Evaluations } from '../generated/api-types/Evaluations';
import { Posts } from '../generated/api-types/Posts';
import { PostTypes } from '../generated/api-types/PostTypes';
import { Images } from '../generated/api-types/Images';
import { Worlds } from '../generated/api-types/Worlds';
import { Tags } from '../generated/api-types/Tags';
import { Menus } from '../generated/api-types/Menus';
import { Entities } from '../generated/api-types/Entities';
import { Maps } from '../generated/api-types/Maps';
import { Locations } from '../generated/api-types/Locations';
import { Modules } from '../generated/api-types/Modules';

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

export const EvaluationsCollection = new Evaluations(API);
export const ChatCollection = new Chat(API);
export const ImagesCollection = new Images(API);
export const MenusCollection = new Menus(API);
export const PostsCollection = new Posts(API);
export const PostTypesCollection = new PostTypes(API);
export const TagsCollection = new Tags(API);
export const UsersCollection = new Users(API);
export const VerifyCollection = new Verify(API);
export const WorldsCollection = new Worlds(API);
export const EntitiesCollection = new Entities(API);
export const MapsCollection = new Maps(API);
export const LocationsCollection = new Locations(API);
export const ModulesCollection = new Modules(API);
