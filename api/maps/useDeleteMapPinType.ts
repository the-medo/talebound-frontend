import { createMutation, inferData } from 'react-query-kit';
import { MapsCollection } from '../collections';
import { queryClient } from '../../pages/_app';
import { useGetMapPinTypes } from './useGetMapPinTypes';

interface DeleteMapPinTypeParams {
  mapId: number;
  pinTypeId: number;
}

export const useDeleteMapPinType = createMutation({
  mutationFn: async (variables: DeleteMapPinTypeParams) =>
    MapsCollection.mapsDeleteMapPinType(variables.mapId, variables.pinTypeId),
  onSuccess: (_, variables) => {
    const { mapId, pinTypeId } = variables;
    if (mapId && pinTypeId) {
      const mapPinTypesQueryKey = useGetMapPinTypes.getKey(mapId);
      queryClient.setQueryData<inferData<typeof useGetMapPinTypes>>(
        mapPinTypesQueryKey,
        (oldData) => oldData?.filter((d) => d.id !== pinTypeId) ?? [],
      );
    }
  },
});
