// noinspection JSUnusedGlobalSymbols

import {getApiUrl} from "../utils/functions/getApiUrl";
import {HttpClient} from "../generated/api-types/http-client";
import {Chat} from "../generated/api-types/Chat";
import {Login} from "../generated/api-types/Login";
import {Users} from "../generated/api-types/Users";
import {Verify} from "../generated/api-types/Verify";

export const API = new HttpClient({
  baseURL: getApiUrl(),
});

API.instance.interceptors.request.use(
  req => req,
  error => {
    // eslint-disable-next-line no-console,@typescript-eslint/no-unsafe-member-access
    console.log(error.response);
    return Promise.reject(error);
  },
);

export const ChatCollection = new Chat(API);
export const LoginCollection = new Login(API);
export const UsersCollection = new Users(API);
export const VerifyCollection = new Verify(API);
