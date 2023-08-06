import { createMutation, inferData } from 'react-query-kit';
import { WorldsCollection } from '../collections';
import { queryClient } from '../../pages/_app';
import { useGetWorldById } from './useGetWorldById';

interface AddWorldTagParams {
  worldId: number;
  tagId: number;
}

export const useAddWorldTag = createMutation({
  mutationFn: async (variables: AddWorldTagParams) =>
    WorldsCollection.taleboundAddWorldTag(variables.worldId, { tagId: variables.tagId }),
  onSuccess: (data, variables) => {
    const newTag = data.data.tag;
    if (newTag) {
      const getWorldByIdKey = useGetWorldById.getKey(variables.worldId);
      queryClient.setQueryData<inferData<typeof useGetWorldById>>(getWorldByIdKey, (oldData) => {
        return {
          ...oldData,
          tags: [...(oldData?.tags ?? []), newTag],
        };
      });
    }
  },
});
