import { createMutation, inferData } from 'react-query-kit';
import { MenusCollection } from '../collections';
import { queryClient } from '../../pages/_app';
import { useGetMenuItemPostsByMenuId } from './useGetMenuItemPostsByMenuId';
import { PbMenuItemPost } from '../../generated/api-types/data-contracts';
import { useGetMenuItemPosts } from './useGetMenuItemPosts';
import { sortByPosition } from '../../utils/functions/sortByPosition';

type UpdateMenuParams = {
  menuId: number;
  body: Parameters<typeof MenusCollection.taleboundUpdateMenuPosts>[1];
};

export const useUpdateMenuPosts = createMutation({
  mutationFn: async (variables: UpdateMenuParams) =>
    MenusCollection.taleboundUpdateMenuPosts(variables.menuId, variables.body),
  onSuccess: (data, variables) => {
    const newData = data.data;
    if (newData) {
      const getMenuItemPostsByMenuIdQueryKey = useGetMenuItemPostsByMenuId.getKey(variables.menuId);

      queryClient.setQueryData<inferData<typeof useGetMenuItemPostsByMenuId>>(
        getMenuItemPostsByMenuIdQueryKey,
        () => newData.menuItemPosts,
      );

      const postsByMenuItemId: Record<number, PbMenuItemPost[]> = {};
      (newData.menuItemPosts ?? []).forEach((menuItemPost) => {
        const { menuItemId } = menuItemPost;
        if (menuItemId !== undefined) {
          if (!postsByMenuItemId[menuItemId]) {
            postsByMenuItemId[menuItemId] = [];
          }
          postsByMenuItemId[menuItemId].push(menuItemPost);
        }
      });

      Object.entries(postsByMenuItemId).forEach(([menuItemId, posts]) => {
        const getMenuItemPostsQueryKey = useGetMenuItemPosts.getKey({
          menuId: variables.menuId,
          menuItemId: Number(menuItemId),
        });
        queryClient.setQueryData<inferData<typeof useGetMenuItemPosts>>(
          getMenuItemPostsQueryKey,
          () => posts.sort(sortByPosition),
        );
      });
    }
  },
});
