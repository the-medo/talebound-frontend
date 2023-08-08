import { createMutation, inferData } from 'react-query-kit';
import { WorldsCollection } from '../collections';
import { useGetWorldAdmins } from './useGetWorldAdmins';
import { queryClient } from '../../pages/_app';

interface CreateWorldAdminProps {
  worldId: number;
  motivationalLetter?: string;
}

export const useCreateWorldAdmin = createMutation({
  mutationFn: async (variables: CreateWorldAdminProps) =>
    WorldsCollection.taleboundCreateWorldAdmin(variables.worldId, {
      motivationalLetter: variables.motivationalLetter,
    }),
  onSuccess: (data, variables) => {
    const worldId = variables.worldId;
    const userId = data.data.userId;
    if (worldId && userId) {
      const worldAdminsQueryKey = useGetWorldAdmins.getKey(worldId);
      queryClient.setQueryData<inferData<typeof useGetWorldAdmins>>(
        worldAdminsQueryKey,
        (worldAdmins) => {
          return [...(worldAdmins ?? []), data.data];
        },
      );
    }
  },
});
