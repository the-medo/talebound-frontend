import { createMutation } from 'react-query-kit';
import { MapsCollection } from '../collections';
import { PbCreateMapRequest } from '../../generated/api-types/data-contracts';

export const useCreateMap = createMutation({
  mutationFn: async (variables: PbCreateMapRequest) => MapsCollection.mapsCreateMap(variables),
  onSuccess: (data, variables) => {
    const newMap = data.data;
    if (newMap && variables.moduleId) {
      // const getPostsQueryKey = useGetPosts.getKey(variables.module);
      // queryClient.setQueryData<inferData<typeof useGetLocations>>(
      //   getLocationsQueryKey,
      //   (locations) => {
      //     return [...(locations ?? []), newMap];
      //   },
      // );
    }
  },
});
