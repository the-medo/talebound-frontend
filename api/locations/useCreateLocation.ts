import { createMutation, inferData } from 'react-query-kit';
import { LocationsCollection } from '../collections';
import { queryClient } from '../../pages/_app';
import { PbCreateLocationRequest } from '../../generated/api-types/data-contracts';
import { useGetLocations } from './useGetLocations';
import { locationPlacementToParams } from './locationLib';

export const useCreateLocation = createMutation({
  mutationFn: async (variables: PbCreateLocationRequest) =>
    LocationsCollection.locationsCreateLocation(variables),
  onSuccess: (data, variables) => {
    const newLocation = data.data;
    if (newLocation && variables.placement) {
      const getLocationsQueryKey = useGetLocations.getKey(
        locationPlacementToParams(variables.placement),
      );
      queryClient.setQueryData<inferData<typeof useGetLocations>>(
        getLocationsQueryKey,
        (locations) => {
          return [...(locations ?? []), newLocation];
        },
      );
    }
  },
});
