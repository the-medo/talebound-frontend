import { createMutation, inferData } from 'react-query-kit';
import { MenusCollection } from '../collections';
import { useGetMenuItems } from './useGetMenuItems';
import { queryClient } from '../../pages/_app';
import { useGetMenuItemPosts } from './useGetMenuItemPosts';

interface CreateMenuItemPostParams {
  menuId: number;
  menuItemId: number;
  body: Parameters<typeof MenusCollection.taleboundCreateMenuItemPost>[2];
}

export const useCreateMenuItemPost = createMutation({
  mutationFn: async (variables: CreateMenuItemPostParams) => {
    return MenusCollection.taleboundCreateMenuItemPost(
      variables.menuId,
      variables.menuItemId,
      variables.body,
    );
  },
  onSuccess: (data, variables) => {
    const {
      menuId,
      menuItemId,
      body: { isMenuItemDescriptionPost },
    } = variables;

    const newItemPost = data.data;
    if (menuId && menuItemId && newItemPost) {
      if (isMenuItemDescriptionPost) {
        const menuItemsQueryKey = useGetMenuItems.getKey(menuId);
        queryClient.setQueryData<inferData<typeof useGetMenuItems>>(
          menuItemsQueryKey,
          (menuItems) => {
            return menuItems?.map((item) => ({
              ...item,
              descriptionPostId:
                item.id === menuItemId ? newItemPost.postId : item.descriptionPostId,
            }));
          },
        );
      } else {
        const menuItemPostsQueryKey = useGetMenuItemPosts.getKey({ menuId, menuItemId });
        queryClient.setQueryData<inferData<typeof useGetMenuItems>>(
          menuItemPostsQueryKey,
          (menuItemPosts) => {
            return [...(menuItemPosts ?? []), newItemPost];
          },
        );
      }
    }
  },
});
