import { createMutation } from 'react-query-kit';
import { LoginCollection } from './collections';
import { PbLoginUserRequest } from '../generated/api-types/data-contracts';

export const useLogin = createMutation({
  mutationFn: async (variables: PbLoginUserRequest) =>
    LoginCollection.taleboundLoginUser(variables),
  onSuccess: (data) => {},
});
