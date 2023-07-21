import { createMutation, inferData } from 'react-query-kit';
import { ImagesCollection } from './collections';
import { PbUploadImageRequest } from '../generated/api-types/data-contracts';
import { queryClient } from '../pages/_app';
import { useGetImages } from './useGetImages';

export interface ExpandedUploadImageRequest extends PbUploadImageRequest {
  userId?: number;
  imageTypeId?: number;
}

export const useUploadImage = createMutation({
  mutationFn: async (variables: ExpandedUploadImageRequest) =>
    ImagesCollection.taleboundUploadDefaultImage(variables),

  onSuccess: (data, variables) => {
    console.log('onSuccess useUploadImage');
    const queryKeys = [];
    console.log('MUTATE variables', variables);

    if (variables.userId && variables.imageTypeId) {
      queryKeys.push(
        useGetImages.getKey({
          userId: variables.userId,
          imageTypeId: variables.imageTypeId,
        }),
      );
    }

    if (variables.userId) {
      queryKeys.push(
        useGetImages.getKey({
          userId: variables.userId,
        }),
      );
    }

    if (variables.imageTypeId) {
      queryKeys.push(
        useGetImages.getKey({
          imageTypeId: variables.imageTypeId,
        }),
      );
    }

    queryKeys.push(useGetImages.getKey({}));

    console.log('queryKeys', queryKeys);

    queryKeys.forEach((queryKey) => {
      queryClient.setQueryData<inferData<typeof useGetImages>>(queryKey, (oldData) => {
        const newData = oldData
          ? {
              pages: oldData.pages.map((page, pageIndex) => {
                const images = page.images;

                if (images && pageIndex === 0) {
                  images.unshift(data.data);
                }

                return {
                  ...page,
                  images,
                  totalCount: (page.totalCount ?? 0) + 1,
                  newOffset: page.newOffset ? page.newOffset + 1 : undefined,
                };
              }),
              pageParams: oldData.pageParams,
            }
          : {
              pages: [
                {
                  images: [data.data],
                  totalCount: 1,
                  newOffset: undefined,
                },
              ],
              pageParams: [undefined],
            };
        console.log('newData xxx', newData);
        return newData;
      });
    });
  },
});
