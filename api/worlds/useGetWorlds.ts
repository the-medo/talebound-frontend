import { createInfiniteQuery } from 'react-query-kit';
import { PbGetWorldsResponse } from '../../generated/api-types/data-contracts';
import { WorldsCollection } from '../collections';
import { expandDataForInfiniteQuery, InfiniteResponse, OmitLimitOffset } from '../apiLib';

const PAGE_SIZE = 4;

export const useGetWorlds = createInfiniteQuery<
  InfiniteResponse<PbGetWorldsResponse>,
  OmitLimitOffset<typeof WorldsCollection.taleboundGetWorlds>,
  Error,
  number
>({
  primaryKey: 'useWorldsGetWorlds',
  queryFn: async ({ queryKey: [_primaryKey, variables], pageParam: offset }) => {
    const tags = (variables.tags?.length ?? 0) > 0 ? variables.tags : undefined;

    const { data } = await WorldsCollection.taleboundGetWorlds({
      public: variables.public,
      orderBy: variables.orderBy,
      tags,
      limit: PAGE_SIZE,
      offset,
    });

    return expandDataForInfiniteQuery(data, offset, PAGE_SIZE, data.totalCount);
  },

  getNextPageParam: (lastPage, _pages) => {
    return lastPage.newOffset;
  },
});
