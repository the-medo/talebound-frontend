import { createSuspenseQuery } from 'react-query-kit';
import { PbPost } from '../../generated/api-types/data-contracts';
import { PostsCollection } from '../collections';
import { TaleboundError } from '../../utils/types/error';

export const useGetPostById = createSuspenseQuery<PbPost, number, TaleboundError>({
  primaryKey: 'useGetPostById',
  queryFn: async ({ queryKey: [, variables] }) => {
    if (!variables) return {};
    const { data } = await PostsCollection.postsGetPostById(variables);
    return data;
  },
});
