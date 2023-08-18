import { createQuery } from 'react-query-kit';
import { TaleboundError } from '../../utils/types/error';
import { PbMenuItem } from '../../generated/api-types/data-contracts';
import { MenusCollection } from '../collections';

export const useGetMenuItems = createQuery<PbMenuItem[], number, TaleboundError>({
  primaryKey: 'useGetMenuItems',
  queryFn: async ({ queryKey: [, variables] }) => {
    const { data } = await MenusCollection.taleboundGetMenuItems(variables);
    return data?.menuItems ?? [];
  },
});
