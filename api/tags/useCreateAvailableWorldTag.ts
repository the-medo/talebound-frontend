import { createMutation, inferData } from 'react-query-kit';
import { PbCreateAvailableWorldTagRequest } from '../../generated/api-types/data-contracts';
import { TagsCollection } from '../collections';
import { queryClient } from '../../pages/_app';
import { useGetAvailableWorldTags } from './useGetAvailableWorldTags';

export const useCreateAvailableWorldTag = createMutation({
  mutationFn: async (variables: PbCreateAvailableWorldTagRequest) =>
    TagsCollection.taleboundCreateAvailableWorldTag(variables),
  onSuccess: (data) => {
    const newTag = data.data;
    if (newTag) {
      const availableWorldTagsQueryKey = useGetAvailableWorldTags.getKey();
      queryClient.setQueryData<inferData<typeof useGetAvailableWorldTags>>(
        availableWorldTagsQueryKey,
        (oldData) => {
          return [...(oldData ?? []), newTag];
        },
      );
    }
  },
});
