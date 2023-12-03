import { createInfiniteQuery } from 'react-query-kit';
import { PostsCollection } from '../collections';
import { expandDataForInfiniteQuery, InfiniteResponse } from '../apiLib';
import { PbGetPostsResponse } from '../../generated/api-types/data-contracts';
import { store } from '../../store';
import { postAdapterSlice } from '../../adapters/PostAdapter';

export const PAGE_SIZE_POSTS = 3;

type GetPostsParams = NonNullable<Parameters<typeof PostsCollection.postsGetPosts>[0]>;

export const useGetPosts = createInfiniteQuery<
  InfiniteResponse<PbGetPostsResponse>,
  GetPostsParams,
  Error,
  number
>({
  primaryKey: 'useGetPosts',
  queryFn: async ({ queryKey: [_primaryKey, variables], pageParam: offset }) => {
    const { data } = await PostsCollection.postsGetPosts({
      ...variables,
      limit: PAGE_SIZE_POSTS,
      offset,
    });

    if (data.posts) {
      store.dispatch(postAdapterSlice.actions.upsertPosts(data.posts));
    }

    return expandDataForInfiniteQuery(data, offset, PAGE_SIZE_POSTS, data.totalCount);
  },

  // use: [queryModuleMiddleware],

  getNextPageParam: (lastPage, _pages) => {
    return lastPage.newOffset;
  },

  initialPageParam: 0,
});
