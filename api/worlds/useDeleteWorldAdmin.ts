import { createMutation, inferData } from 'react-query-kit';
import { WorldsCollection } from '../collections';
import { useGetWorldAdmins } from './useGetWorldAdmins';
import { queryClient } from '../../pages/_app';

interface DeleteWorldAdminParams {
  worldId: number;
  userId: number;
}

export const useDeleteWorldAdmin = createMutation({
  mutationFn: async (variables: DeleteWorldAdminParams) =>
    WorldsCollection.taleboundDeleteWorldAdmin(variables.worldId, { userId: variables.userId }),
  onSuccess: (_, variables) => {
    const worldId = variables.worldId;
    const userId = variables.userId;
    if (worldId && userId) {
      const worldAdminsQueryKey = useGetWorldAdmins.getKey(worldId);
      queryClient.setQueryData<inferData<typeof useGetWorldAdmins>>(
        worldAdminsQueryKey,
        (worldAdmins) => {
          return worldAdmins?.filter((worldAdmin) => worldAdmin.userId !== userId) ?? [];
        },
      );
    }
  },
});
