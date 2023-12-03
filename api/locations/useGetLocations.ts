import { createQuery } from 'react-query-kit';
import { PbModule, PbViewLocation } from '../../generated/api-types/data-contracts';
import { LocationsCollection } from '../collections';
import { TaleboundError } from '../../utils/types/error';

// export type GetLocationsParams = Exclude<
//   Parameters<typeof LocationsCollection.locationsGetLocations>[0],
//   undefined
// >;

export const useGetLocations = createQuery<PbViewLocation[], PbModule, TaleboundError>({
  primaryKey: 'useGetLocations',
  queryFn: async ({ queryKey: [, variables] }) => {
    console.log('useGetLocations', variables);
    if (!variables) return [];
    const { data } = await LocationsCollection.locationsGetLocations(variables);
    return data.locations ?? [];
  },
});
