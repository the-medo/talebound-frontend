import { createMutation } from 'react-query-kit';
import { PbLoginUserRequest } from '../generated/api-types/data-contracts';
import { UsersCollection } from './collections';

export const useLogin = createMutation({
  mutationFn: async (variables: PbLoginUserRequest) => UsersCollection.usersLoginUser(variables),
});
