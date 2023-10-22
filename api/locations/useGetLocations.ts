import { createQuery } from 'react-query-kit';
import { PbViewLocation } from '../../generated/api-types/data-contracts';
import { LocationsCollection } from '../collections';

export type GetLocationsParams = Parameters<typeof LocationsCollection.locationsGetLocations>[0];

export const useGetLocations = createQuery<PbViewLocation[], GetLocationsParams>({
  primaryKey: 'useGetLocations',
  queryFn: async ({ queryKey: [, variables] }) => {
    if (!variables) return [];
    const { data } = await LocationsCollection.locationsGetLocations(variables);
    return data.locations ?? [];
  },
});
