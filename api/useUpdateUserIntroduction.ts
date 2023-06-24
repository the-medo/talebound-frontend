import { createMutation } from 'react-query-kit';
import { UsersCollection } from './collections';

export interface UpdateUserIntroductionRequest {
  userId: number;
  body: {
    content?: string;
    saveAsDraft?: boolean;
  };
}

export const useUpdateUserIntroduction = createMutation({
  mutationFn: async (variables: UpdateUserIntroductionRequest) =>
    UsersCollection.taleboundUpdateUserIntroduction(variables.userId, variables.body),
});
