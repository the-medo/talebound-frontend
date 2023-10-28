import { createMutation, inferData } from 'react-query-kit';
import { LocationsCollection } from '../collections';
import { queryClient } from '../../pages/_app';
import { PbModule } from '../../generated/api-types/data-contracts';
import { useGetLocations } from './useGetLocations';

export interface CreateLocationPostRequest {
  module?: PbModule;
  locationId: number;
}

export const useCreateLocationPost = createMutation({
  mutationFn: async (variables: CreateLocationPostRequest) =>
    LocationsCollection.locationsCreateLocationPost(variables.locationId),
  onSuccess: (data, variables) => {
    const { locationId, module: keyParams } = variables;
    const updatedLocation = data.data;
    if (updatedLocation && keyParams) {
      const getLocationsQueryKey = useGetLocations.getKey(keyParams);
      queryClient.setQueryData<inferData<typeof useGetLocations>>(
        getLocationsQueryKey,
        (locations) => {
          return locations?.map((l) => (l.id === locationId ? updatedLocation : l)) ?? [];
        },
      );
    }
  },
});
