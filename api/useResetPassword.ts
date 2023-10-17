import { createMutation } from 'react-query-kit';
import {
  PbResetPasswordSendCodeRequest,
  PbResetPasswordVerifyCodeRequest,
} from '../generated/api-types/data-contracts';
import { UsersCollection } from './collections';

export const useResetPassword = createMutation({
  mutationFn: async (variables: PbResetPasswordSendCodeRequest) =>
    UsersCollection.usersResetPasswordSendCode(variables),
});

export const useResetPasswordVerifyCode = createMutation({
  mutationFn: async (variables: PbResetPasswordVerifyCodeRequest) =>
    UsersCollection.usersResetPasswordVerifyCode(variables),
});

export const useResetPasswordVerifyCodeValidity = createMutation({
  mutationFn: async (code: string) =>
    UsersCollection.usersResetPasswordVerifyCodeValidity({
      secretCode: code,
    }),
});
