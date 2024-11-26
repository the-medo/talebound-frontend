import { createMutation, inferData } from 'react-query-kit';
import { QuestsCollection } from '../collections';
import { queryClient } from '../../pages/_app';
import { useGetQuestCharacters } from './useGetQuestCharacters';

type UpdateQuestCharacterParams = {
  questId: number;
  characterId: number;
  body: Parameters<typeof QuestsCollection.questsUpdateQuestCharacter>[2];
};

export const useUpdateQuestCharacter = createMutation({
  mutationFn: async (variables: UpdateQuestCharacterParams) =>
    QuestsCollection.questsUpdateQuestCharacter(
      variables.questId,
      variables.characterId,
      variables.body,
    ),
  onSuccess: (data) => {
    const { questId, characterId } = data.data;
    if (questId && characterId) {
      const questQueryKey = useGetQuestCharacters.getKey(questId);
      queryClient.setQueryData<inferData<typeof useGetQuestCharacters>>(questQueryKey, (oldData) =>
        (oldData ?? []).map((qc) =>
          qc.questId === questId && qc.characterId === characterId ? { ...data.data } : { ...qc },
        ),
      );
    }
  },
});
