import { createQuery } from 'react-query-kit';
import { TaleboundError } from '../../utils/types/error';
import { PbMenu } from '../../generated/api-types/data-contracts';
import { MenusCollection } from '../collections';

export const useGetMenuById = createQuery<PbMenu, number, TaleboundError>({
  primaryKey: 'useGetMenuById',
  queryFn: async ({ queryKey: [, variables] }) => {
    const { data } = await MenusCollection.taleboundGetMenu(variables);
    return data;
  },
});
