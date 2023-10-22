import { createQuery } from 'react-query-kit';
import { UsersCollection } from '../collections';
import { PbRole } from '../../generated/api-types/data-contracts';

export const useGetUserRoles = createQuery<PbRole[], number>({
  primaryKey: 'useGetUserRoles',
  queryFn: async ({ queryKey: [, variables] }) => {
    if (!variables) return [];
    const { data } = await UsersCollection.usersGetUserRoles({ userId: variables });
    return data.role ?? [];
  },
});
