import { createMutation } from 'react-query-kit';
import { MapsCollection } from '../collections';

export interface CreateMapPinTypeRequest {
  moduleId: number;
  body: Parameters<typeof MapsCollection.mapsCreateMapPinTypeGroup>[1];
}

export const useCreateMapPinTypeGroup = createMutation({
  mutationFn: async (variables: CreateMapPinTypeRequest) =>
    MapsCollection.mapsCreateMapPinTypeGroup(variables.moduleId, variables.body),
  onSuccess: (data, variables) => {
    // TODO: add to useGetMapPinTypes
    console.log('New map pin type group created', data, variables);
  },
});
