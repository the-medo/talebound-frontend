import { createSuspenseQuery } from 'react-query-kit';
import { TaleboundError } from '../../utils/types/error';
import { PbWorld } from '../../generated/api-types/data-contracts';
import { WorldsCollection } from '../collections';

export const useGetWorldById = createSuspenseQuery<PbWorld, number, TaleboundError>({
  primaryKey: 'useGetWorldById',
  queryFn: async ({ queryKey: [, variables] }) => {
    if (!variables) return {};
    const { data } = await WorldsCollection.worldsGetWorldById(variables);
    return data;
  },
});
