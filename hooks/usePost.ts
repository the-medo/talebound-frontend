import { PbPost } from '../generated/api-types/data-contracts';
import { useMemo } from 'react';
import { TaleboundError } from '../utils/types/error';
import { useGetPostById } from '../api/posts/useGetPostById';

interface UsePostResponse {
  post: PbPost | undefined;
  isFetching: boolean;
  error: TaleboundError | null;
}

export const usePost = (postId: number | undefined): UsePostResponse => {
  const { data: post, isFetching, error } = useGetPostById({ variables: postId });

  return useMemo(
    () => ({
      post,
      isFetching,
      error,
    }),
    [post, isFetching, error],
  );
};
