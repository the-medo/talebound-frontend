import { createQuery } from 'react-query-kit';
import { TaleboundError } from '../../utils/types/error';
import { PbGetMenuItemContentResponse } from '../../generated/api-types/data-contracts';
import { MenusCollection } from '../collections';

interface GetMenuItemContentRequest {
  menuId: number;
  menuItemId: number;
}

export const useGetMenuItemContent = createQuery<
  PbGetMenuItemContentResponse,
  GetMenuItemContentRequest,
  TaleboundError
>({
  primaryKey: 'useGetMenuItemContent',
  queryFn: async ({ queryKey: [_, { menuId, menuItemId }] }) => {
    if (menuId === 0 || menuItemId === 0)
      return {
        mainGroupId: 0,
        groups: [],
        contents: [],
      };

    const { data } = await MenusCollection.menusGetMenuItemContent(menuId, menuItemId);

    return data;
  },
});
