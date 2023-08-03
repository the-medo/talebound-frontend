import { createMutation } from 'react-query-kit';
import { WorldsCollection } from '../collections';

type UpdateWorldParams = {
  worldId: number;
  body: Parameters<typeof WorldsCollection.taleboundUpdateWorld>[1];
};

export const useUpdateWorld = createMutation({
  mutationFn: async (variables: UpdateWorldParams) =>
    WorldsCollection.taleboundUpdateWorld(variables.worldId, variables.body),
});
