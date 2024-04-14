import { createMutation, inferData } from 'react-query-kit';
import { MapsCollection } from '../collections';
import { queryClient } from '../../pages/_app';
import { useGetMapLayers } from './useGetMapLayers';

export interface UpdateMapRequest {
  mapId: number;
  mapLayerId: number;
  body: Parameters<typeof MapsCollection.mapsUpdateMapLayer>[2];
}

export const useUpdateMapLayer = createMutation({
  mutationFn: async (variables: UpdateMapRequest) =>
    MapsCollection.mapsUpdateMapLayer(variables.mapId, variables.mapLayerId, variables.body),
  onSuccess: (data, variables) => {
    const { mapId, mapLayerId } = variables;
    if (mapId) {
      const mapLayerQueryKey = useGetMapLayers.getKey(mapId);
      queryClient.setQueryData<inferData<typeof useGetMapLayers>>(mapLayerQueryKey, (oldData) =>
        (oldData ?? []).map((c) => (c.id === mapLayerId ? data.data : c)),
      );
    }
  },
});
