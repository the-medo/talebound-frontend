import { createSuspenseQuery } from 'react-query-kit';
import { PbViewUser } from '../generated/api-types/data-contracts';
import { UsersCollection } from './collections';

export const useGetUserById = createSuspenseQuery<PbViewUser, number>({
  primaryKey: 'useGetUserById',
  queryFn: async ({ queryKey: [, variables] }) => {
    const { data } = await UsersCollection.usersGetUserById(variables);
    return data;
  },
});
