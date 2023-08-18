import { createMutation, inferData } from 'react-query-kit';
import { MenusCollection } from '../collections';
import { queryClient } from '../../pages/_app';
import { useGetMenuItems } from './useGetMenuItems';

type UpdateMenuItemParams = {
  menuId: number;
  menuItemId: number;
  body: Parameters<typeof MenusCollection.taleboundUpdateMenuItem>[2];
};

export const useUpdateMenuItem = createMutation({
  mutationFn: async (variables: UpdateMenuItemParams) =>
    MenusCollection.taleboundUpdateMenuItem(variables.menuId, variables.menuItemId, variables.body),
  onSuccess: (data, variables) => {
    const { menuId, menuItemId } = variables;
    const updatedMenuItem = data.data;
    if (menuId && menuItemId && updatedMenuItem) {
      const getMenuItemsQueryKey = useGetMenuItems.getKey(menuId);
      queryClient.setQueryData<inferData<typeof useGetMenuItems>>(
        getMenuItemsQueryKey,
        (oldData) => {
          const index = oldData?.findIndex((menuItem) => menuItem.id === menuItemId);

          if (oldData && index !== undefined && index !== -1) {
            oldData[index] = updatedMenuItem;
          }

          return oldData;
        },
      );
    }
  },
});
