import { createQuery } from 'react-query-kit';
import { TagsCollection } from '../collections';
import { PbViewTag } from '../../generated/api-types/data-contracts';

export const useGetAvailableWorldTags = createQuery<PbViewTag[], void>({
  primaryKey: 'useGetAvailableWorldTags',
  queryFn: async () => {
    const { data } = await TagsCollection.tagsGetAvailableWorldTags();
    return (data.tags ?? []).sort((a, b) => (a.tag ?? '').localeCompare(b.tag ?? ''));
  },
});
