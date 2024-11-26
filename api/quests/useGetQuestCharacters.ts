import { createQuery } from 'react-query-kit';
import { PbQuestCharacter } from '../../generated/api-types/data-contracts';
import { QuestsCollection } from '../collections';
import { TaleboundError } from '../../utils/types/error';

export const useGetQuestCharacters = createQuery<PbQuestCharacter[], number, TaleboundError>({
  primaryKey: 'useGetQuestCharacters',
  queryFn: async ({ queryKey: [_, variables] }) => {
    if (!variables) return [];
    const { data } = await QuestsCollection.questsGetQuestCharacters(variables);
    return data?.questCharacters ?? [];
  },
});
