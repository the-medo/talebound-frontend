import React from 'react';
import { useGetCharacterQuests } from '../../../../api/characters/useGetCharacterQuests';
import ContentSection from '../../../../components/ContentSection/ContentSection';
import { useSelector } from 'react-redux';
import { questSelectors } from '../../../../adapters/QuestAdapter';
import { PbQuestStatus } from '../../../../generated/api-types/data-contracts';
import { useCharacter } from '../../../../hooks/useCharacter';
import { useMyModuleRole } from '../../../../hooks/useModuleAdmins';
import LeftNavbar from '../../../../components/LeftNavbar/LeftNavbar';
import Layout from '../../../../components/Layout/Layout';
import ActionBoxModule from '../../../modules/ActionBox/ActionBoxModule';
import DetailCharacterRightSection from '../DetailCharacterRightSection/DetailCharacterRightSection';
import { Col, Row } from '../../../../components/Flex/Flex';
import { DetailCharacterPage } from '../detailCharacterLib';

interface AvailableCharacterQuestsProps {
  characterId: number;
}

const AvailableCharacterQuests: React.FC<AvailableCharacterQuestsProps> = ({ characterId }) => {
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
    <Layout vertical={true} navbar={<LeftNavbar />}>
      <ActionBoxModule moduleId={moduleId} activeButton="edit" />
      <Row gap="md" alignItems="start" wrap>
        <Col css={{ flexGrow: 5, flexBasis: '10rem' }}>
          <ContentSection flexWrap="wrap" direction="column" header="Available quests">
            asdf
          </ContentSection>
        </Col>
        <DetailCharacterRightSection
          characterId={characterId}
          subpage={DetailCharacterPage.AVAILABLE_QUESTS}
        />
      </Row>
    </Layout>
  );
};

export default AvailableCharacterQuests;
