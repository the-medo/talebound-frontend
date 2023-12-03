import { createMutation, inferData } from 'react-query-kit';
import { MenusCollection } from '../collections';
import { queryClient } from '../../pages/_app';
import { sortByPosition } from '../../utils/functions/sortByPosition';
import { useGetMenuItemPosts } from './useGetMenuItemPosts';

export type UpdateMenuItemPostParams = {
  menuId: number;
  menuItemId: number;
  postId: number;
  body: Parameters<typeof MenusCollection.menusUpdateMenuItemPost>[3];
};

export const useUpdateMenuItemPost = createMutation({
  mutationFn: async (variables: UpdateMenuItemPostParams) =>
    MenusCollection.menusUpdateMenuItemPost(
      variables.menuId,
      variables.menuItemId,
      variables.postId,
      variables.body,
    ),
  onMutate: async (variables) => {
    const getMenuItemPostsQueryKey = useGetMenuItemPosts.getKey({
      menuId: variables.menuId,
      menuItemId: variables.menuItemId,
    });
    const previousData = queryClient.getQueryData(getMenuItemPostsQueryKey) as inferData<
      typeof useGetMenuItemPosts
    >;
    return { previousData, getMenuItemPostsQueryKey };
  },
  onError: (_err, _variables, context) => {
    if (context?.previousData) {
      // reset the menu items to empty array, to return its positioning to the previous state
      queryClient.setQueryData<inferData<typeof useGetMenuItemPosts>>(
        context.getMenuItemPostsQueryKey,
        [],
      );
      // reset the menu items to the previous data
      queryClient.setQueryData<inferData<typeof useGetMenuItemPosts>>(
        context.getMenuItemPostsQueryKey,
        [...context.previousData],
      );
    }
  },
  onSuccess: (data, variables) => {
    const { menuId, menuItemId, postId } = variables;
    const updatedMenuItemPost = data.data;
    if (menuId && menuItemId && postId && updatedMenuItemPost) {
      const newPosition = variables.body.position;
      const getMenuItemPostsQueryKey = useGetMenuItemPosts.getKey({
        menuId,
        menuItemId,
      });
      queryClient.setQueryData<inferData<typeof useGetMenuItemPosts>>(
        getMenuItemPostsQueryKey,
        (oldData) => {
          const index = oldData?.findIndex(
            (menuItemPost) =>
              menuItemPost.menuItemId === menuItemId && menuItemPost.postId === postId,
          );
          if (oldData && index !== undefined && index !== -1) {
            const oldItem = oldData[index];

            if (newPosition !== undefined) {
              if (newPosition !== oldItem.position) {
                // If the position has changed, we need to update the positions of all menu items
                // between the old position and the new position.
                const oldPosition = oldItem.position;

                if (oldPosition) {
                  const minPosition = Math.min(oldPosition, newPosition);
                  const maxPosition = Math.max(oldPosition, newPosition);

                  return oldData
                    .map((menuItemPost) => {
                      if (menuItemPost.position === oldPosition) {
                        menuItemPost.position = newPosition;
                      } else if (
                        menuItemPost.position &&
                        menuItemPost.position >= minPosition &&
                        menuItemPost.position <= maxPosition
                      ) {
                        const increment = oldPosition < newPosition ? -1 : 1;
                        menuItemPost.position += increment;
                      }
                      return menuItemPost;
                    })
                    .sort(sortByPosition);
                }
              }
            } else {
              oldData[index] = { ...updatedMenuItemPost };
            }

            return [...oldData];
          }
          return oldData;
        },
      );
    }
  },
});
