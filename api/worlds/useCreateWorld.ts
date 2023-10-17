import { createMutation, inferData } from 'react-query-kit';
import { PbCreateWorldRequest } from '../../generated/api-types/data-contracts';
import { WorldsCollection } from '../collections';
import router from 'next/router';
import { queryClient } from '../../pages/_app';
import { useGetWorldById } from './useGetWorldById';

export const useCreateWorld = createMutation({
  mutationFn: async (variables: PbCreateWorldRequest) =>
    WorldsCollection.worldsCreateWorld(variables),
  onSuccess: (data) => {
    const worldId = data.data.id;
    if (worldId) {
      const worldQueryKey = useGetWorldById.getKey(worldId);
      queryClient.setQueryData<inferData<typeof useGetWorldById>>(worldQueryKey, () => {
        return data.data;
      });
      router.push(`/worlds/${worldId}/edit`).catch((error) => console.error(error));
    }
  },
});
