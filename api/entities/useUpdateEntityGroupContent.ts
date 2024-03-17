import { createMutation, inferData } from 'react-query-kit';
import { EntitiesCollection } from '../collections';
import { queryClient } from '../../pages/_app';
import { useGetMenuItemContent } from '../menus/useGetMenuItemContent';

export type UpdateEntityGroupContentParams = {
  menuItemId: number;
  entityGroupId: number;
  contentId: number;
  body: Parameters<typeof EntitiesCollection.entitiesUpdateEntityGroupContent>[2];
};

export const useUpdateEntityGroupContent = createMutation({
  mutationFn: async (variables: UpdateEntityGroupContentParams) =>
    EntitiesCollection.entitiesUpdateEntityGroupContent(
      variables.entityGroupId,
      variables.contentId,
      variables.body,
    ),
  onSuccess: (data, variables) => {
    const newData = data.data;
    const { contentId } = variables;
    if (newData) {
      const getMenuItemContentQueryKey = useGetMenuItemContent.getKey({
        menuItemId: variables.menuItemId,
      });

      queryClient.setQueryData<inferData<typeof useGetMenuItemContent>>(
        getMenuItemContentQueryKey,
        (oldData) => {
          const cachedData = oldData?.contents ?? [];
          const oldContent = cachedData.find((c) => c.id === contentId);
          if (!oldContent) return oldData;

          return {
            ...oldData,
            contents: [
              ...cachedData.map((c) => {
                if (c.id === contentId) return newData;
                if (!c.position) return c;

                let newPosition = c.position;

                if (c.entityGroupId === oldContent.entityGroupId) {
                  if (c.position > (oldContent.position ?? 0)) newPosition--;
                }
                if (c.entityGroupId === newData.entityGroupId) {
                  if (c.position >= (newData.position ?? 0)) newPosition++;
                }

                return {
                  ...c,
                  position: newPosition,
                };
              }),
            ],
          };
        },
      );
    }
  },
});
