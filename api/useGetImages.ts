import { ImagesCollection } from './collections';
import { createInfiniteQuery } from 'react-query-kit';
import { PbGetImagesResponse } from '../generated/api-types/data-contracts';
import { expandDataForInfiniteQuery, InfiniteResponse, OmitLimitOffset } from './apiLib';

const PAGE_SIZE = 4;

export const useGetImages = createInfiniteQuery<
  InfiniteResponse<PbGetImagesResponse>,
  OmitLimitOffset<typeof ImagesCollection.taleboundGetImages>,
  Error,
  number
>({
  primaryKey: 'useGetImages',
  queryFn: async ({ queryKey: [_primaryKey, variables], pageParam: offset }) => {
    const { data } = await ImagesCollection.taleboundGetImages({
      userId: variables?.userId,
      imageTypeId: variables?.imageTypeId,
      limit: PAGE_SIZE,
      offset,
    });

    return expandDataForInfiniteQuery(data, offset, PAGE_SIZE, data.totalCount);
  },

  getNextPageParam: (lastPage, _pages) => {
    console.log('lastPage', lastPage, '_pages', _pages);
    return lastPage.newOffset;
  },
});
