import { createQuery } from 'react-query-kit';
import { TaleboundError } from '../../utils/types/error';
import { PbWorld } from '../../generated/api-types/data-contracts';
import { WorldsCollection } from '../collections';

export const useGetWorldById = createQuery<PbWorld, number, TaleboundError>({
  primaryKey: 'useGetWorldById',
  queryFn: async ({ queryKey: [, variables] }) => {
    const { data } = await WorldsCollection.worldsGetWorldById(variables);
    return data;
  },
});
