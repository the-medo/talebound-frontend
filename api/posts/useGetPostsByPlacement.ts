import { createInfiniteQuery, InfiniteQueryHook, Middleware } from 'react-query-kit';
import { PostsCollection } from '../collections';
import { expandDataForInfiniteQuery, InfiniteResponse } from '../apiLib';
import {
  PbGetPostsByPlacementResponse,
  PbPlacement,
} from '../../generated/api-types/data-contracts';

const PAGE_SIZE = 10;

const queryPlacementMiddleware: Middleware<
  InfiniteQueryHook<InfiniteResponse<PbGetPostsByPlacementResponse>, PbPlacement, Error>
> = (useQueryNext) => {
  return (options) => {
    const { variables } = options;
    const sumOfPlacementIds =
      (variables?.worldId ?? 0) +
      (variables?.questId ?? 0) +
      (variables?.characterId ?? 0) +
      (variables?.systemId ?? 0);

    return useQueryNext({ ...options, enabled: sumOfPlacementIds > 0 });
  };
};

export const useGetPostsByPlacement = createInfiniteQuery<
  InfiniteResponse<PbGetPostsByPlacementResponse>,
  PbPlacement,
  Error,
  number
>({
  primaryKey: 'useGetPostsByPlacement',
  queryFn: async ({ queryKey: [_primaryKey, variables], pageParam: offset }) => {
    const { data } = await PostsCollection.postsGetPostsByPlacement({
      ...variables,
      limit: PAGE_SIZE,
      offset,
    });

    return expandDataForInfiniteQuery(data, offset, PAGE_SIZE, data.totalCount);
  },

  use: [queryPlacementMiddleware],

  getNextPageParam: (lastPage, _pages) => {
    return lastPage.newOffset;
  },

  initialPageParam: 1,
});
