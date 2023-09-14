import { createMutation } from 'react-query-kit';
import { MenusCollection } from '../collections';

type UpdateMenuParams = {
  menuId: number;
  body: Parameters<typeof MenusCollection.taleboundUpdateMenuPosts>[1];
};

export const useUpdateMenuPosts = createMutation({
  mutationFn: async (variables: UpdateMenuParams) =>
    MenusCollection.taleboundUpdateMenuPosts(variables.menuId, variables.body),
});
