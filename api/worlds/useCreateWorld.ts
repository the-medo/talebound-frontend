import { createMutation } from 'react-query-kit';
import { PbCreateWorldRequest } from '../../generated/api-types/data-contracts';
import { WorldsCollection } from '../collections';

export const useCreateWorld = createMutation({
  mutationFn: async (variables: PbCreateWorldRequest) =>
    WorldsCollection.taleboundCreateWorld(variables),
});
