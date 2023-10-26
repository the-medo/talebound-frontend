import { createMutation, inferData } from 'react-query-kit';
import { LocationsCollection } from '../collections';
import { queryClient } from '../../pages/_app';
import { PbPlacement } from '../../generated/api-types/data-contracts';
import { useGetLocations } from './useGetLocations';

interface DeleteLocationParams {
  locationId: number;
  placement?: PbPlacement;
}

export const useDeleteLocation = createMutation({
  mutationFn: async (variables: DeleteLocationParams) =>
    LocationsCollection.locationsDeleteLocation(variables.locationId),
  onSuccess: (_, variables) => {
    const locationId = variables.locationId;
    const keyParams = variables.placement;

    if (locationId && keyParams) {
      const getLocationsQueryKey = useGetLocations.getKey(keyParams);
      queryClient.setQueryData<inferData<typeof useGetLocations>>(
        getLocationsQueryKey,
        (oldData) => oldData?.filter(({ id }) => (id ? id !== locationId : true)),
      );
    }
  },
});
