import { createMutation, inferData } from 'react-query-kit';
import { TagsCollection } from '../collections';
import { queryClient } from '../../pages/_app';
import { useGetAvailableWorldTags } from './useGetAvailableWorldTags';

export interface UpdateAvailableWorldTagRequest {
  tagId: number;
  newTag: string;
}

export const useUpdateAvailableWorldTag = createMutation({
  mutationFn: async (variables: UpdateAvailableWorldTagRequest) =>
    TagsCollection.tagsUpdateAvailableWorldTag(variables.tagId, {
      newTag: variables.newTag,
    }),
  onSuccess: (data) => {
    const updatedTag = data.data;
    if (updatedTag) {
      const availableWorldTagsQueryKey = useGetAvailableWorldTags.getKey();
      queryClient.setQueryData<inferData<typeof useGetAvailableWorldTags>>(
        availableWorldTagsQueryKey,
        (oldData) => {
          const index = oldData?.findIndex((tag) => tag.id === updatedTag.id);

          if (oldData && index !== undefined && index !== -1) {
            oldData[index] = updatedTag;
          }

          return oldData;
        },
      );
    }
  },
});
