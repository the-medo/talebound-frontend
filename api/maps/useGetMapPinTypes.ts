import { createQuery } from 'react-query-kit';
import { PbMapPinType } from '../../generated/api-types/data-contracts';
import { MapsCollection } from '../collections';

export const useGetMapPinTypes = createQuery<PbMapPinType[], number>({
  primaryKey: 'useGetMapPinTypes',
  queryFn: async ({ queryKey: [, variables] }) => {
    if (!variables) return [];
    const { data } = await MapsCollection.mapsGetMapPinTypes(variables);
    return data.pinTypes ?? [];
  },
});
