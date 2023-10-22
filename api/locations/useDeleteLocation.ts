import { createMutation, inferData } from 'react-query-kit';
import { LocationsCollection } from '../collections';
import { queryClient } from '../../pages/_app';
import { PbLocationPlacement } from '../../generated/api-types/data-contracts';
import { locationPlacementToParams } from './locationLib';
import { useGetLocations } from './useGetLocations';

interface DeleteLocationParams {
  locationId: number;
  placement?: PbLocationPlacement;
}

export const useDeleteLocation = createMutation({
  mutationFn: async (variables: DeleteLocationParams) =>
    LocationsCollection.locationsDeleteLocation(variables),
  onSuccess: (_, variables) => {
    const locationId = variables.locationId;
    const keyParams = variables.placement
      ? locationPlacementToParams(variables.placement)
      : undefined;

    if (locationId && keyParams) {
      const getLocationsQueryKey = useGetLocations.getKey(keyParams);
      queryClient.setQueryData<inferData<typeof useGetLocations>>(
        getLocationsQueryKey,
        (oldData) => {
          const index = oldData?.findIndex((location) => location.id === locationId);

          if (oldData && index !== undefined && index !== -1) {
            oldData.splice(index, 1);
          }

          return oldData;
        },
      );
    }
  },
});
