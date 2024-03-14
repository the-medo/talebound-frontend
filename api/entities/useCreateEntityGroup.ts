import { createMutation, inferData } from 'react-query-kit';
import { EntitiesCollection } from '../collections';
import { queryClient } from '../../pages/_app';
import { useGetMenuItemContent } from '../menus/useGetMenuItemContent';

export type CreateEntityGroupParams = {
  menuItemId: number;
  body: Parameters<typeof EntitiesCollection.entitiesCreateEntityGroup>[0];
};

export const useCreateEntityGroup = createMutation({
  mutationFn: async (variables: CreateEntityGroupParams) =>
    EntitiesCollection.entitiesCreateEntityGroup(variables.body),
  onSuccess: (data, variables) => {
    const newData = data.data;
    if (newData) {
      const { entityGroup, entityGroupContent } = newData;

      const getMenuItemContentQueryKey = useGetMenuItemContent.getKey({
        menuItemId: variables.menuItemId,
      });

      if (entityGroup) {
        queryClient.setQueryData<inferData<typeof useGetMenuItemContent>>(
          getMenuItemContentQueryKey,
          (oldData) => ({
            ...oldData,
            groups: [...(oldData?.groups ?? []), entityGroup],
          }),
        );
      }
    }
  },
});
