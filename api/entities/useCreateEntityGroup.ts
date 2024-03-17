import { createMutation, inferData } from 'react-query-kit';
import { EntitiesCollection } from '../collections';
import { queryClient } from '../../pages/_app';
import { useGetMenuItemContent } from '../menus/useGetMenuItemContent';

export type CreateEntityGroupParams = {
  menuItemId: number;
  startEntityGroupId?: number;
  startPosition?: number;
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

      if (entityGroup && entityGroupContent) {
        console.log('entityGroup', entityGroup, 'entityGroupContent', entityGroupContent);
        queryClient.setQueryData<inferData<typeof useGetMenuItemContent>>(
          getMenuItemContentQueryKey,
          (oldData) => ({
            ...oldData,
            contents: [
              ...(oldData?.contents ?? []).map((c) => {
                if (
                  variables.startEntityGroupId === c.entityGroupId &&
                  variables.startPosition &&
                  c.position
                ) {
                  if (variables.startPosition === c.position) {
                    return {
                      ...c,
                      entityGroupId: entityGroup.id,
                      position: 1,
                    };
                  } else if (variables.startPosition < c.position) {
                    return {
                      ...c,
                      position: c.position - 1,
                    };
                  }
                }
                return c;
              }),
              entityGroupContent,
            ],
            groups: [...(oldData?.groups ?? []), entityGroup],
          }),
        );
      }
    }
  },
});
