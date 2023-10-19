import { createSuspenseQuery } from 'react-query-kit';
import { PbDataPostType } from '../generated/api-types/data-contracts';
import { PostTypesCollection } from './collections';
import { TaleboundError } from '../utils/types/error';

export const useSuspenseGetPostTypes = createSuspenseQuery<PbDataPostType[], void, TaleboundError>({
  primaryKey: 'useGetPostTypes',
  queryFn: async () => {
    const { data } = await PostTypesCollection.postTypesGetPostTypes();
    return data.postTypes ?? [];
  },
});
