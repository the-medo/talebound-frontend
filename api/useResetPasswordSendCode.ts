import { createMutation } from 'react-query-kit';
import {
  PbLoginUserRequest,
  PbResetPasswordSendCodeRequest,
} from '../generated/api-types/data-contracts';
import { UsersCollection } from './collections';

export const useResetPasswordSendCode = createMutation({
  mutationFn: async (variables: PbResetPasswordSendCodeRequest) =>
    UsersCollection.taleboundResetPasswordSendCode(variables),
});
