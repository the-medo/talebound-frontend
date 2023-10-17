import { createMutation, inferData } from 'react-query-kit';
import { WorldsCollection } from '../collections';
import { queryClient } from '../../pages/_app';
import { useGetWorldAdmins } from './useGetWorldAdmins';

type UpdateWorldAdminParams = {
  worldId: number;
  body: Parameters<typeof WorldsCollection.worldsUpdateWorldAdmin>[1];
};

export const useUpdateWorldAdmin = createMutation({
  mutationFn: async (variables: UpdateWorldAdminParams) =>
    WorldsCollection.worldsUpdateWorldAdmin(variables.worldId, variables.body),
  onSuccess: (data, variables) => {
    const worldId = variables.worldId;
    const userId = data.data.userId;
    if (worldId && userId) {
      const worldAdminsQueryKey = useGetWorldAdmins.getKey(worldId);
      queryClient.setQueryData<inferData<typeof useGetWorldAdmins>>(
        worldAdminsQueryKey,
        (worldAdmins) => {
          return (
            worldAdmins?.map((worldAdmin) => {
              if (worldAdmin.userId === userId) {
                return data.data;
              }
              return worldAdmin;
            }) ?? []
          );
        },
      );
    }
  },
});
