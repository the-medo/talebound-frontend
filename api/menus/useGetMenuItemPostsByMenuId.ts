import { createQuery } from 'react-query-kit';
import { TaleboundError } from '../../utils/types/error';
import { PbMenuItemPost } from '../../generated/api-types/data-contracts';
import { MenusCollection } from '../collections';

export const useGetMenuItemPostsByMenuId = createQuery<PbMenuItemPost[], number, TaleboundError>({
  primaryKey: 'useGetMenuItemPostsByMenuId',
  queryFn: async ({ queryKey: [_, variables] }) => {
    const { data } = await MenusCollection.menusGetMenuItemPostsByMenuId(variables);
    return data?.menuItemPosts ?? [];
  },
});
