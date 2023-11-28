import { createInfiniteQuery, InfiniteQueryHook, Middleware } from 'react-query-kit';
import { PostsCollection } from '../collections';
import { expandDataForInfiniteQuery, InfiniteResponse } from '../apiLib';
import { PbGetPostsByModuleResponse, PbViewModule } from '../../generated/api-types/data-contracts';

export const PAGE_SIZE_POSTS = 3;

const queryModuleMiddleware: Middleware<
  InfiniteQueryHook<InfiniteResponse<PbGetPostsByModuleResponse>, PbViewModule, Error>
> = (useQueryNext) => {
  return (options) => {
    const { variables } = options;
    const sumOfModuleIds =
      (variables?.worldId ?? 0) +
      (variables?.questId ?? 0) +
      (variables?.characterId ?? 0) +
      (variables?.systemId ?? 0);

    return useQueryNext({ ...options, enabled: sumOfModuleIds > 0 });
  };
};

export const useGetPostsByModule = createInfiniteQuery<
  InfiniteResponse<PbGetPostsByModuleResponse>,
  PbViewModule,
  Error,
  number
>({
  primaryKey: 'useGetPostsByModule',
  queryFn: async ({ queryKey: [_primaryKey, variables], pageParam: offset }) => {
    const { data } = await PostsCollection.postsGetPostsByModule({
      ...variables,
      limit: PAGE_SIZE_POSTS,
      offset,
    });

    return expandDataForInfiniteQuery(data, offset, PAGE_SIZE_POSTS, data.totalCount);
  },

  use: [queryModuleMiddleware],

  getNextPageParam: (lastPage, _pages) => {
    return lastPage.newOffset;
  },

  initialPageParam: 0,
});
