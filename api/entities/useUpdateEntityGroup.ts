import { createMutation } from 'react-query-kit';
import { EntitiesCollection } from '../collections';

export type UpdateEntityGroupParams = {
  entityGroupId: number;
  body: Parameters<typeof EntitiesCollection.entitiesUpdateEntityGroup>[1];
};

export const useUpdateEntityGroup = createMutation({
  mutationFn: async (variables: UpdateEntityGroupParams) =>
    EntitiesCollection.entitiesUpdateEntityGroup(variables.entityGroupId, variables.body),
});
