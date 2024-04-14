import { createMutation } from 'react-query-kit';
import { MapsCollection } from '../collections';

export interface CreateMapPinTypeRequest {
  mapId: number;
  body: Parameters<typeof MapsCollection.mapsCreateMapPinType>[1];
}

export const useCreateMapPinType = createMutation({
  mutationFn: async (variables: CreateMapPinTypeRequest) =>
    MapsCollection.mapsCreateMapPinType(variables.mapId, variables.body),
  onSuccess: (data, variables) => {
    console.log('New map pin type created', data, variables);
  },
});
