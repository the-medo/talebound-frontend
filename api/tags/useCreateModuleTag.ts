import { createMutation, inferData } from 'react-query-kit';
import { TagsCollection } from '../collections';
import { queryClient } from '../../pages/_app';
import { useGetWorldById } from '../worlds/useGetWorldById';
import { PbModule, PbModuleType } from '../../generated/api-types/data-contracts';

interface CreateModuleTagParams {
  moduleType: PbModuleType;
  moduleId: number;
  module: PbModule;
  tagId: number;
}

export const useCreateModuleTag = createMutation({
  mutationFn: async (variables: CreateModuleTagParams) =>
    TagsCollection.tagsCreateModuleTag(variables.moduleId, { tagId: variables.tagId }),
  onSuccess: (data, variables) => {
    const newTagId = data.data.tagId;

    if (newTagId) {
      if (variables.moduleType === PbModuleType.MODULE_TYPE_WORLD) {
        const worldId = variables.module.worldId ?? 0;
        if (worldId > 0) {
          const getWorldByIdKey = useGetWorldById.getKey(worldId);
          queryClient.setQueryData<inferData<typeof useGetWorldById>>(
            getWorldByIdKey,
            (oldData) => {
              return {
                ...oldData,
                tags: [...(oldData?.tags ?? []), newTagId],
              };
            },
          );

          queryClient
            .invalidateQueries({ queryKey: ['useGetWorlds'] })
            .then((r) => console.log('invalidateQueries', r));
        }
      }
    }
  },
});
