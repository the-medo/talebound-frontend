import { createMutation, inferData } from 'react-query-kit';
import { ImagesCollection } from './collections';
import { PbGetImagesResponse, PbUploadImageRequest } from '../generated/api-types/data-contracts';
import { queryClient } from '../pages/_app';
import { useGetImages } from './useGetImages';
import { InfiniteResponse } from './apiLib';
import { InfiniteData, QueryKey } from '@tanstack/query-core';

interface ExpandedUploadImageRequest extends PbUploadImageRequest {
  userId?: number;
  imageTypeId?: number;
}

export const useUploadImage = createMutation({
  mutationFn: async (variables: ExpandedUploadImageRequest) =>
    ImagesCollection.taleboundUploadDefaultImage(variables),

  onMutate: async (variables) => {
    const queryKeys = [];

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

    const contextData: {
      previousData: inferData<typeof useGetImages> | undefined;
      queryKey: QueryKey;
    }[] = [];

    queryKeys.forEach((queryKey) => {
      const previousData: InfiniteData<InfiniteResponse<PbGetImagesResponse>> | undefined =
        queryClient.getQueryData(queryKey);

      queryClient.setQueryData<inferData<typeof useGetImages>>(queryKey, (oldData) =>
        oldData
          ? {
              pages: oldData.pages.map((page) => ({
                ...page,
                totalCount: (page.totalCount ?? 0) + 1,
                newOffset: page.newOffset ? page.newOffset + 1 : undefined,
              })),
              pageParams: oldData.pageParams,
            }
          : undefined,
      );

      contextData.push({
        previousData,
        queryKey,
      });
    });

    return { contextData };
  },

  onError: (err, variables, context) => {
    context?.contextData.map((c) => {
      queryClient.setQueryData<inferData<typeof useGetImages>>(c.queryKey, c.previousData);
    });
  },
});
