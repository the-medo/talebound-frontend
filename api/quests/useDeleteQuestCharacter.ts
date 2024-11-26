import { createMutation, inferData } from 'react-query-kit';
import { QuestsCollection } from '../collections';
import { queryClient } from '../../pages/_app';
import { useGetQuestCharacters } from './useGetQuestCharacters';

interface DeleteQuestCharacterParams {
  questId: number;
  characterId: number;
}

export const useDeleteQuestCharacter = createMutation({
  mutationFn: async (variables: DeleteQuestCharacterParams) =>
    QuestsCollection.questsDeleteQuestCharacter(variables.questId, variables.characterId),
  onSuccess: (_, variables) => {
    const { questId, characterId } = variables;
    if (questId && characterId) {
      const questCharactersQueryKey = useGetQuestCharacters.getKey(questId);
      queryClient.setQueryData<inferData<typeof useGetQuestCharacters>>(
        questCharactersQueryKey,
        (oldData) =>
          oldData?.filter((d) => !(d.questId === questId && d.characterId === characterId)) ?? [],
      );
    }
  },
});
