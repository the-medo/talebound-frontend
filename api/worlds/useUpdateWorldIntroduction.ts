import { createMutation, inferData } from 'react-query-kit';
import { WorldsCollection } from '../collections';
import { useGetPostById } from '../posts/useGetPostById';
import { queryClient } from '../../pages/_app';
import { useGetWorldById } from './useGetWorldById';
import { store } from '../../store';

export interface UpdateWorldIntroductionRequest {
  worldId: number;
  postId?: number;
  body: {
    content?: string;
  };
}

export const useUpdateWorldIntroduction = createMutation({
  mutationFn: async (variables: UpdateWorldIntroductionRequest) =>
    WorldsCollection.taleboundUpdateWorldIntroduction(variables.worldId, variables.body),
  onMutate: async (variables) => {
    const postQueryKey = useGetPostById.getKey(variables.postId);
    const previousData = queryClient.getQueryData(postQueryKey);

    if (variables.postId) {
      const userId = store.getState().auth.user?.id;

      queryClient.setQueryData<inferData<typeof useGetPostById>>(postQueryKey, (oldData) => ({
        ...oldData,
        post: {
          ...oldData?.post,
          content: variables.body.content,
          lastUpdatedUserId: userId ?? oldData?.post?.lastUpdatedUserId,
        },
      }));
    }

    return { previousData, postQueryKey };
  },
  onSuccess: (data, variables) => {
    const worldQueryKey = useGetWorldById.getKey(variables.worldId);
    const postQueryKey = useGetPostById.getKey(data.data.post?.id);
    if (data.data.post?.id) {
      queryClient.setQueryData<inferData<typeof useGetPostById>>(postQueryKey, () => {
        return data.data;
      });
    }
    queryClient.setQueryData<inferData<typeof useGetWorldById>>(worldQueryKey, (oldData) => ({
      ...oldData,
      descriptionPostId: data.data.post?.id,
    }));
  },
  onError: (_err, _variables, context) => {
    if (context?.previousData) {
      queryClient.setQueryData<inferData<typeof useGetPostById>>(
        context.postQueryKey,
        context.previousData,
      );
    }
  },
});
