import { createQuery } from 'react-query-kit';
import { PbPost } from '../../generated/api-types/data-contracts';
import { PostsCollection } from '../collections';
import { TaleboundError } from '../../utils/types/error';

export const useGetPostById = createQuery<PbPost, number, TaleboundError>({
  primaryKey: 'useGetPostById',
  queryFn: async ({ queryKey: [, variables] }) => {
    const { data } = await PostsCollection.taleboundGetPostById(variables);
    return data;
  },
});
