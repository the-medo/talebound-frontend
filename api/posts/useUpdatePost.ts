import { createMutation, inferData } from 'react-query-kit';
import { PostsCollection } from '../collections';
import { queryClient } from '../../pages/_app';
import { useGetPostById } from './useGetPostById';
import { useGetMenuItemPosts } from '../menus/useGetMenuItemPosts';

export interface UpdatePostCacheHelper {
  menuId: number;
  menuItemId: number;
}

export interface UpdatePostRequest {
  postId: number;
  cacheHelper?: UpdatePostCacheHelper;
  body: Parameters<typeof PostsCollection.taleboundUpdatePost>[1];
}

export const useUpdatePost = createMutation({
  mutationFn: async (variables: UpdatePostRequest) =>
    PostsCollection.taleboundUpdatePost(variables.postId, variables.body),
  onSuccess: (data, variables) => {
    const { postId, cacheHelper } = variables;
    console.log('TEST2', variables);
    if (postId) {
      const postQueryKey = useGetPostById.getKey(postId);
      queryClient.setQueryData<inferData<typeof useGetPostById>>(postQueryKey, () => {
        return data.data;
      });
    }
    if (cacheHelper) {
      const getMenuItemPostsQueryKey = useGetMenuItemPosts.getKey({
        menuId: cacheHelper.menuId,
        menuItemId: cacheHelper.menuItemId,
      });

      console.log('getMenuItemPostsQueryKey', getMenuItemPostsQueryKey);

      queryClient.setQueryData<inferData<typeof useGetMenuItemPosts>>(
        getMenuItemPostsQueryKey,
        (oldData) => {
          return oldData?.map((menuItemPost) => {
            return {
              ...menuItemPost,
              post: menuItemPost.postId === postId ? data.data.post : menuItemPost.post,
            };
          });
        },
      );
    }
  },
});
