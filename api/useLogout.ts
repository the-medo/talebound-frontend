import { createMutation } from 'react-query-kit';
import { UsersCollection } from './collections';

export const useLogout = createMutation({
  mutationFn: async () => UsersCollection.taleboundLogoutUser({}),
});
