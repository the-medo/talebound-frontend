import { createQuery } from 'react-query-kit';
import { PbPost } from '../generated/api-types/data-contracts';
import { PostsCollection } from './collections';

export const useGetPostById = createQuery<PbPost, number>({
  primaryKey: 'useGetPostById',
  queryFn: async ({ queryKey: [, variables] }) => {
    const { data } = await PostsCollection.taleboundGetPostById(variables);
    return data;
  },
});
