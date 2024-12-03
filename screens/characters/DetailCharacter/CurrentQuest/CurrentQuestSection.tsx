import React from 'react';
import { useGetCharacterQuests } from '../../../../api/characters/useGetCharacterQuests';
import ContentSection from '../../../../components/ContentSection/ContentSection';
import { useSelector } from 'react-redux';
import { questSelectors } from '../../../../adapters/QuestAdapter';
import QuestCard from '../../../../components/QuestCard/QuestCard';
import { PbQuestStatus } from '../../../../generated/api-types/data-contracts';
import { useCharacter } from '../../../../hooks/useCharacter';
import { ModuleAdminRole, useMyModuleRole } from '../../../../hooks/useModuleAdmins';
import { Text } from '../../../../components/Typography/Text';
import Link from 'next/link';

interface CurrentQuestSectionProps {
  characterId: number;
}

const CurrentQuestSection: React.FC<CurrentQuestSectionProps> = ({ characterId }) => {
  const { moduleId } = useCharacter(characterId);
  const { data: characterQuests = [] } = useGetCharacterQuests({ variables: characterId });
  const { role } = useMyModuleRole(moduleId);

  //sort desc by creation date and take first approved
  const currentQuestId =
    characterQuests
      .sort((a, b) => (b.createdAt ?? '').localeCompare(a.createdAt ?? ''))
      .find((q) => q.approved === 1)?.questId ?? 0;

  const quest = useSelector((state) => questSelectors.selectById(state, currentQuestId));
  const isOnQuest = quest?.status === PbQuestStatus.IN_PROGRESS;

  return (
    <ContentSection flexWrap="wrap" direction="column" header="Current quest">
      {isOnQuest ? (
        <QuestCard questId={currentQuestId} />
      ) : (
        <>
          <Text>This character is not on a quest right now.</Text>
          {role === ModuleAdminRole.SUPER_COLLABORATOR && (
            <Link href={`/characters/${characterId}/detail/available-quests`}>
              Search for a quest
            </Link>
          )}
        </>
      )}
    </ContentSection>
  );
};

export default CurrentQuestSection;
