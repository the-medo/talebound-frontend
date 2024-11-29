import { createQuery } from 'react-query-kit';
import { PbQuestCharacter } from '../../generated/api-types/data-contracts';
import { CharactersCollection } from '../collections';
import { TaleboundError } from '../../utils/types/error';

export const useGetCharacterQuests = createQuery<PbQuestCharacter[], number, TaleboundError>({
  primaryKey: 'useGetCharacterQuests',
  queryFn: async ({ queryKey: [_, variables] }) => {
    if (!variables) return [];
    const { data } = await CharactersCollection.charactersGetCharacterQuests(variables);
    return data?.questCharacters ?? [];
  },
});
