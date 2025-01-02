import React, { Suspense, useMemo, useState } from 'react';
import { useGetCharacterQuests } from '../../../../api/characters/useGetCharacterQuests';
import ContentSection from '../../../../components/ContentSection/ContentSection';
import { useSelector } from 'react-redux';
import { questSelectors } from '../../../../adapters/QuestAdapter';
import { PbModuleType, PbQuestStatus } from '../../../../generated/api-types/data-contracts';
import { useCharacter } from '../../../../hooks/useCharacter';
import { useMyModuleRole } from '../../../../hooks/useModuleAdmins';
import LeftNavbar from '../../../../components/LeftNavbar/LeftNavbar';
import Layout from '../../../../components/Layout/Layout';
import ActionBoxModule from '../../../modules/ActionBox/ActionBoxModule';
import DetailCharacterRightSection from '../DetailCharacterRightSection/DetailCharacterRightSection';
import { Col, Flex, Row } from '../../../../components/Flex/Flex';
import { DetailCharacterPage } from '../detailCharacterLib';
import { useGetQuests } from '../../../../api/quests/useGetQuests';
import InfiniteScrollObserver from '../../../../components/InfiniteScrollObserver/InfiniteScrollObserver';
import QuestCard from '../../../../components/QuestCard/QuestCard';
import LoadingText from '../../../../components/Loading/LoadingText';
import LayoutToggleGroup from '../../../../components/LayoutToggleGroup/LayoutToggleGroup';
import { LayoutToggleGroupOption } from '../../../../components/LayoutToggleGroup/layoutToggleGroupLib';
import QuestRow from '../../../../components/QuestRow/QuestRow';
import { getModuleLayoutLocalStore } from '../../../../store/moduleLayoutLocalStore';

interface AvailableCharacterQuestsProps {
  characterId: number;
}

const AvailableCharacterQuests: React.FC<AvailableCharacterQuestsProps> = ({ characterId }) => {
  const { character, moduleId } = useCharacter(characterId);
  const { data: characterQuests = [] } = useGetCharacterQuests({ variables: characterId });
  const [layout, setLayout] = useState<LayoutToggleGroupOption>(
    getModuleLayoutLocalStore(PbModuleType.MODULE_TYPE_QUEST, 'rowLayout'),
  );
  const { role } = useMyModuleRole(moduleId);

  //sort desc by creation date and take first approved
  const currentQuestId =
    characterQuests
      .sort((a, b) => (b.createdAt ?? '').localeCompare(a.createdAt ?? ''))
      .find((q) => q.approved === 1)?.questId ?? 0;

  const quest = useSelector((state) => questSelectors.selectById(state, currentQuestId));
  const isOnQuest = quest?.status === PbQuestStatus.IN_PROGRESS;

  const {
    data: questData,
    isFetching,
    fetchNextPage,
    hasNextPage,
  } = useGetQuests({
    variables: {
      systemId: character?.systemId ?? 0,
      worldId: character?.worldId ?? 0,
      canJoin: true,
    },
  });

  const totalCount = questData?.pages[0]?.totalCount ?? 0;

  const headerActions = useMemo(
    () => (
      <LayoutToggleGroup onValueChange={setLayout} moduleType={PbModuleType.MODULE_TYPE_QUEST} />
    ),
    [],
  );

  return (
    <Layout vertical={true} navbar={<LeftNavbar />}>
      <ActionBoxModule moduleId={moduleId} />
      <Row gap="md" alignItems="start" wrap>
        <Col css={{ flexGrow: 5, flexBasis: '10rem' }}>
          <ContentSection
            flexWrap="wrap"
            direction="column"
            header="Available quests"
            headerActions={headerActions}
          >
            <Flex
              direction={layout === 'rowLayout' ? 'column' : 'row'}
              gap="md"
              alignItems={layout === 'rowLayout' ? undefined : 'start'}
              wrap={layout !== 'rowLayout'}
              fullWidth={layout === 'rowLayout'}
            >
              {totalCount === 0 &&
                !isFetching &&
                'No quests available in this World and System combination.'}
              {isFetching && <LoadingText />}
              {questData?.pages.map(
                (page) =>
                  page.questIds?.map((questId) => (
                    <Suspense fallback={null} key={questId}>
                      {layout === 'rowLayout' ? (
                        <QuestRow questId={questId} />
                      ) : (
                        <QuestCard questId={questId} />
                      )}
                    </Suspense>
                  )),
              )}
              {hasNextPage && !isFetching && (
                <InfiniteScrollObserver runOnObserve={fetchNextPage} />
              )}
            </Flex>
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
