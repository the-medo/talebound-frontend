import { createMutation } from 'react-query-kit';
import { MapsCollection } from '../collections';

export interface CreateMapPinRequest {
  mapId: number;
  body: Parameters<typeof MapsCollection.mapsCreateMapPin>[1];
}

export const useCreateMapPin = createMutation({
  mutationFn: async (variables: CreateMapPinRequest) =>
    MapsCollection.mapsCreateMapPin(variables.mapId, variables.body),
  onSuccess: (data, variables) => {
    console.log('New map pin created', data, variables);
  },
});
