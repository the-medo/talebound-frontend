import { createMutation, inferData } from 'react-query-kit';
import { TagsCollection } from '../collections';
import { useGetWorldById } from './useGetWorldById';
import { queryClient } from '../../pages/_app';
import { PbModule, PbModuleType } from '../../generated/api-types/data-contracts';

interface DeleteModuleTagParams {
  moduleType: PbModuleType;
  moduleId: number;
  module: PbModule;
  tagId: number;
}

export const useDeleteModuleTag = createMutation({
  mutationFn: async (variables: DeleteModuleTagParams) =>
    TagsCollection.tagsDeleteModuleTag(variables.moduleId, variables.tagId),
  onSuccess: (_, variables) => {
    if (variables.moduleType === PbModuleType.MODULE_TYPE_WORLD) {
      const worldId = variables.module.worldId ?? 0;
      if (worldId > 0) {
        const getWorldByIdKey = useGetWorldById.getKey(variables.moduleId);

        queryClient.setQueryData<inferData<typeof useGetWorldById>>(getWorldByIdKey, (oldData) => {
          return {
            ...oldData,
            tags: oldData?.tags?.filter((tag) => tag !== variables.tagId),
          };
        });

        queryClient
          .invalidateQueries({ queryKey: ['useGetWorlds'] })
          .then((r) => console.log('invalidateQueries', r));
      }
    }
  },
});
