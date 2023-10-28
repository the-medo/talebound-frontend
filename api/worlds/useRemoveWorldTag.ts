import { createMutation, inferData } from 'react-query-kit';
import { WorldsCollection } from '../collections';
import { useGetWorldById } from './useGetWorldById';
import { queryClient } from '../../pages/_app';
import { useGetModuleTypeAvailableTags } from '../tags/useGetModuleTypeAvailableTags';
import { PbTag } from '../../generated/api-types/data-contracts';

interface RemoveWorldTagParams {
  worldId: number;
  tagId: number;
}

export const useRemoveWorldTag = createMutation({
  mutationFn: async (variables: RemoveWorldTagParams) =>
    WorldsCollection.worldsRemoveWorldTag(variables.worldId, { tagId: variables.tagId }),
  onSuccess: (_, variables) => {
    const getWorldByIdKey = useGetWorldById.getKey(variables.worldId);
    const getAvailableWorldTagsKey = useGetModuleTypeAvailableTags.getKey();

    const availableTags = queryClient.getQueryData<PbTag[]>(getAvailableWorldTagsKey) ?? [];

    const removedTag = availableTags.find((tag) => tag.id === variables.tagId)?.tag;

    console.log(getWorldByIdKey, getAvailableWorldTagsKey, availableTags, removedTag);

    if (removedTag) {
      queryClient.setQueryData<inferData<typeof useGetWorldById>>(getWorldByIdKey, (oldData) => {
        return {
          ...oldData,
          tags: oldData?.tags?.filter((tag) => tag !== removedTag),
        };
      });
    }
  },
});
