import { createMutation, inferData } from 'react-query-kit';
import { MenusCollection } from '../collections';
import { useGetMenuItems } from './useGetMenuItems';
import { queryClient } from '../../pages/_app';

interface DeleteMenuItemParams {
  menuId: number;
  menuItemId: number;
}

export const useDeleteMenuItem = createMutation({
  mutationFn: async (variables: DeleteMenuItemParams) =>
    MenusCollection.taleboundDeleteMenuItem(variables.menuId, variables.menuItemId),
  onSuccess: (_, variables) => {
    const { menuId, menuItemId } = variables;
    if (menuId && menuItemId) {
      const menuItemsQueryKey = useGetMenuItems.getKey(menuId);
      queryClient.setQueryData<inferData<typeof useGetMenuItems>>(
        menuItemsQueryKey,
        (menuItems) => {
          return menuItems?.filter((menuItem) => menuItem.id !== menuItemId) ?? [];
        },
      );
    }
  },
});
