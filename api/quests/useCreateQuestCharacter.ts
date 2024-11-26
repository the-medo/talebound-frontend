import { createMutation, inferData } from 'react-query-kit';
import { QuestsCollection } from '../collections';
import { useGetQuestCharacters } from './useGetQuestCharacters';
import { queryClient } from '../../pages/_app';

export interface CreateQuestCharacterPayload {
  questId: number;
  characterId: number;
  data: Parameters<typeof QuestsCollection.questsCreateQuestCharacter>[2];
}

export const useCreateQuestCharacter = createMutation({
  mutationFn: async (variables: CreateQuestCharacterPayload) =>
    QuestsCollection.questsCreateQuestCharacter(
      variables.questId,
      variables.characterId,
      variables.data,
    ),
  onSuccess: (data) => {
    const { questId, characterId } = data.data;
    if (questId && characterId) {
      const questQueryKey = useGetQuestCharacters.getKey(questId);
      queryClient.setQueryData<inferData<typeof useGetQuestCharacters>>(
        questQueryKey,
        (oldData) => [...(oldData ?? []), data.data],
      );
    }
  },
});
