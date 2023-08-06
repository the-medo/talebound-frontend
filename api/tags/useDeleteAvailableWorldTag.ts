import { createMutation, inferData } from 'react-query-kit';
import { TagsCollection } from '../collections';
import { queryClient } from '../../pages/_app';
import { useGetAvailableWorldTags } from './useGetAvailableWorldTags';

export const useDeleteAvailableWorldTag = createMutation({
  mutationFn: async (variables: number) =>
    TagsCollection.taleboundDeleteAvailableWorldTag(variables),
  onSuccess: (_, tagId) => {
    if (tagId) {
      const availableWorldTagsQueryKey = useGetAvailableWorldTags.getKey();
      queryClient.setQueryData<inferData<typeof useGetAvailableWorldTags>>(
        availableWorldTagsQueryKey,
        (oldData) => {
          const index = oldData?.findIndex((tag) => tag.id === tagId);

          if (oldData && index !== undefined && index !== -1) {
            oldData.splice(index, 1);
          }

          return oldData;
        },
      );
    }
  },
});
