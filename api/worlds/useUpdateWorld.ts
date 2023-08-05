import { createMutation, inferData } from 'react-query-kit';
import { WorldsCollection } from '../collections';
import { useGetWorldById } from './useGetWorldById';
import { queryClient } from '../../pages/_app';

type UpdateWorldParams = {
  worldId: number;
  body: Parameters<typeof WorldsCollection.taleboundUpdateWorld>[1];
};

export const useUpdateWorld = createMutation({
  mutationFn: async (variables: UpdateWorldParams) =>
    WorldsCollection.taleboundUpdateWorld(variables.worldId, variables.body),
  onSuccess: (data) => {
    const worldId = data.data.id;
    if (worldId) {
      const worldQueryKey = useGetWorldById.getKey(worldId);
      queryClient.setQueryData<inferData<typeof useGetWorldById>>(worldQueryKey, () => {
        return data.data;
      });
    }
  },
});
