import { createMutation } from 'react-query-kit';
import { MapsCollection } from '../collections';

export interface CreateMapLayerRequest {
  mapId: number;
  body: Parameters<typeof MapsCollection.mapsCreateMapLayer>[1];
}

export const useCreateMapLayer = createMutation({
  mutationFn: async (variables: CreateMapLayerRequest) =>
    MapsCollection.mapsCreateMapLayer(variables.mapId, variables.body),
  onSuccess: (data, variables) => {
    console.log('New map layer created', data, variables);
  },
});
