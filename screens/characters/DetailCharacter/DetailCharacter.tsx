import React, { Suspense, useMemo } from 'react';
import ContentSection from '../../../components/ContentSection/ContentSection';
import { Col, Row } from '../../../components/Flex/Flex';
import Layout from '../../../components/Layout/Layout';
import ActionBoxModule from '../../modules/ActionBox/ActionBoxModule';
import LeftNavbarModule from '../../../components/LeftNavbar/LeftNavbarModule';
import Loading from '../../../components/Loading/Loading';
import MiniStatistic from '../../../components/MiniStatistic/MiniStatistic';
import { TitleH2 } from '../../../components/Typography/Title';
import TagRow from '../../../components/TagRow/TagRow';
import { useGetModuleTypeAvailableTags } from '../../../api/tags/useGetModuleTypeAvailableTags';
import { PbModuleType } from '../../../generated/api-types/data-contracts';
import { useCharacter } from '../../../hooks/useCharacter';
import { useImage } from '../../../hooks/useImage';
import WorldCard from '../../../components/WorldCard/WorldCard';
import SystemCard from '../../../components/SystemCard/SystemCard';
import CurrentQuestSection from './CurrentQuest/CurrentQuestSection';

const ModuleIntroduction = React.lazy(
  () => import('../../modules/ModuleIntroduction/ModuleIntroduction'),
);

interface DetailCharacterProps {
  characterId: number;
}

const DetailCharacter: React.FC<DetailCharacterProps> = ({ characterId }) => {
  const { character, module, moduleId } = useCharacter(characterId);

  const navbar = useMemo(
    () => (
      <Suspense fallback={null}>
        <LeftNavbarModule moduleId={moduleId} />
      </Suspense>
    ),
    [moduleId],
  );

  const { data: availableTags = [] } = useGetModuleTypeAvailableTags({
    variables: PbModuleType.MODULE_TYPE_CHARACTER,
  });

  const { image: thumbnailImg } = useImage(module?.thumbnailImgId ?? 0);

  return (
    <Layout vertical={true} navbar={navbar}>
      <ActionBoxModule moduleId={moduleId} activeButton="edit" />
      <Row gap="md" alignItems="start" wrap>
        <Col css={{ flexGrow: 5, flexBasis: '10rem' }}>
          <ContentSection flexWrap="wrap" direction="column" cornerImage={thumbnailImg?.url}>
            <Row wrap gap="md" fullWidth alignItems="start" justifyContent="between">
              <Row gap="md">
                <TitleH2>{character?.name}</TitleH2>
              </Row>
              <TagRow
                availableTags={availableTags}
                colorNonactive="primaryOutline"
                tagIds={module?.tags ?? []}
                width={500}
              />
              <Row gap="md">
                <MiniStatistic title="Play modes" value={1} />
                <MiniStatistic title="Characters" value={4} />
                <MiniStatistic title="Activity" value={2.3} />
              </Row>
            </Row>
            <Suspense fallback={<Loading />}>
              <ModuleIntroduction moduleId={moduleId} postViewOnly={false} />
            </Suspense>
          </ContentSection>
        </Col>

        <Col css={{ flexGrow: 0, flexBasis: '600px' }}>
          {character && (
            <>
              <CurrentQuestSection characterId={characterId} />
              <ContentSection flexWrap="wrap" direction="column" header="World and System">
                <Row gap="md" fullWidth>
                  <WorldCard worldId={character.worldId ?? 0} compact />
                  <SystemCard systemId={character.systemId ?? 0} compact />
                </Row>
              </ContentSection>
            </>
          )}
        </Col>
      </Row>
    </Layout>
  );
};

export default DetailCharacter;
