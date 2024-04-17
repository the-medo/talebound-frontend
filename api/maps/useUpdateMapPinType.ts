import { createMutation, inferData } from 'react-query-kit';
import { MapsCollection } from '../collections';
import { queryClient } from '../../pages/_app';
import { useGetMapPinTypesAndGroups } from './useGetMapPinTypesAndGroups';

export interface UpdateMapPinTypeRequest {
  mapId: number;
  pinTypeId: number;
  body: Parameters<typeof MapsCollection.mapsUpdateMapPinType>[2];
}

export const useUpdateMapPinType = createMutation({
  mutationFn: async (variables: UpdateMapPinTypeRequest) =>
    MapsCollection.mapsUpdateMapPinType(variables.mapId, variables.pinTypeId, variables.body),
  onSuccess: (data, variables) => {
    const { mapId, pinTypeId } = variables;
    const newData = data.data.pinType;
    if (mapId && newData) {
      const queryKey = useGetMapPinTypesAndGroups.getKey(mapId);
      queryClient.setQueryData<inferData<typeof useGetMapPinTypesAndGroups>>(
        queryKey,
        (oldData) => {
          return {
            ...oldData,
            pinTypes: {
              ...(oldData?.pinTypes ?? []).map((g) => (g.id === pinTypeId ? { ...newData } : g)),
            },
          };
        },
      );
    }
  },
});
