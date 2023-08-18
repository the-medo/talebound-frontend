import { createMutation, inferData } from 'react-query-kit';
import { MenusCollection } from '../collections';
import { useGetMenuItems } from './useGetMenuItems';
import { queryClient } from '../../pages/_app';

interface CreateMenuItemParams {
  menuId: number;
  body: Parameters<typeof MenusCollection.taleboundCreateMenuItem>[1];
}

export const useCreateMenuItem = createMutation({
  mutationFn: async (variables: CreateMenuItemParams) =>
    MenusCollection.taleboundCreateMenuItem(variables.menuId, variables.body),
  onSuccess: (data, variables) => {
    const { menuId } = variables;
    const newItem = data.data;
    if (menuId && newItem) {
      const menuItemsQueryKey = useGetMenuItems.getKey(menuId);
      queryClient.setQueryData<inferData<typeof useGetMenuItems>>(
        menuItemsQueryKey,
        (menuItems) => {
          return [...(menuItems ?? []), newItem];
        },
      );
    }
  },
});
