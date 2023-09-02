import { createMutation, inferData } from 'react-query-kit';
import { PostsCollection } from '../collections';
import { queryClient } from '../../pages/_app';
import { useGetPostById } from './useGetPostById';

export interface UpdatePostRequest {
  postId: number;
  body: Parameters<typeof PostsCollection.taleboundUpdatePost>[1];
}

export const useUpdatePost = createMutation({
  mutationFn: async (variables: UpdatePostRequest) =>
    PostsCollection.taleboundUpdatePost(variables.postId, variables.body),
  onSuccess: (data, variables) => {
    const postId = variables.postId;
    if (postId) {
      const postQueryKey = useGetPostById.getKey(postId);
      queryClient.setQueryData<inferData<typeof useGetPostById>>(postQueryKey, () => {
        return data.data;
      });
    }
  },
});
