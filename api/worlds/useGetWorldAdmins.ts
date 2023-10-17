import { createQuery } from 'react-query-kit';
import { PbWorldAdmin } from '../../generated/api-types/data-contracts';
import { WorldsCollection } from '../collections';

export const useGetWorldAdmins = createQuery<PbWorldAdmin[], number>({
  primaryKey: 'useGetWorldAdmins',
  queryFn: async ({ queryKey: [, variables] }) => {
    const { data } = await WorldsCollection.worldsGetWorldAdmins(variables);
    return data.worldAdmins ?? [];
  },
});
