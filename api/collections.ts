// noinspection JSUnusedGlobalSymbols

import { HttpClient } from '../generated/api-types/http-client';
import { Chat } from '../generated/api-types/Chat';
import { Users } from '../generated/api-types/Users';
import { Verify } from '../generated/api-types/Verify';
import { getApiUrl } from '../utils/functions/config';
import { Evaluations } from '../generated/api-types/Evaluations';
import { Files } from '../generated/api-types/Files';

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

console.log(API.instance.defaults.withCredentials, 'API.instance.defaults.withCredentials');

export const ChatCollection = new Chat(API);
export const UsersCollection = new Users(API);
export const VerifyCollection = new Verify(API);
export const EvaluationsCollection = new Evaluations(API);
export const FilesCollection = new Files(API);
