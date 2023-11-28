import React, { Suspense, useMemo } from 'react';
import ContentSection from '../../../components/ContentSection/ContentSection';
import { Col, Row } from '../../../components/Flex/Flex';
import Layout from '../../../components/Layout/Layout';
import ActionBoxWorld from '../ActionBoxWorld';
import LeftNavbarWorld from '../../../components/LeftNavbar/LeftNavbarWorld';
import Loading from '../../../components/Loading/Loading';
import MiniStatistic from '../../../components/MiniStatistic/MiniStatistic';
import { TitleH2 } from '../../../components/Typography/Title';
import { Text } from '../../../components/Typography/Text';
import TagRow from '../../../components/TagRow/TagRow';
import { useGetModuleTypeAvailableTags } from '../../../api/tags/useGetModuleTypeAvailableTags';
import { PbModuleType } from '../../../generated/api-types/data-contracts';
import { useWorld } from '../../../hooks/useWorld';

const WorldIntroduction = React.lazy(() => import('../WorldIntroduction/WorldIntroduction'));

interface DetailWorldProps {
  worldId: number;
}

const DetailWorld: React.FC<DetailWorldProps> = ({ worldId }) => {
  const { world, module } = useWorld(worldId);

  const navbar = useMemo(() => <LeftNavbarWorld worldId={worldId} />, [worldId]);

  const { data: availableTags = [] } = useGetModuleTypeAvailableTags({
    variables: PbModuleType.MODULE_TYPE_WORLD,
  });

  console.log('module', module);

  return (
    <Layout vertical={true} navbar={navbar}>
      <ActionBoxWorld worldId={worldId} activeButton="edit" />
      <Row gap="md" alignItems="start" wrap>
        <Col css={{ flexGrow: 5, flexBasis: '10rem' }}>
          <ContentSection flexWrap="wrap" direction="column" cornerImage={module?.thumbnailImgUrl}>
            <Row wrap gap="md" fullWidth alignItems="start" justifyContent="between">
              <Row gap="md">
                <TitleH2>{world?.name}</TitleH2>
              </Row>
              <TagRow
                availableTags={availableTags}
                colorNonactive="primaryOutline"
                tagIds={module?.tags ?? []}
                width={500}
              />
              <Row gap="md">
                <MiniStatistic title="Play modes" value={1} />
                <MiniStatistic title="Quests" value={4} />
                <MiniStatistic title="Activity" value={2.3} />
              </Row>
            </Row>
            <Suspense fallback={<Loading />}>
              <WorldIntroduction worldId={worldId} postViewOnly={false} />
            </Suspense>
          </ContentSection>
        </Col>

        <Col css={{ flexGrow: 0, flexBasis: '600px' }}>
          <ContentSection
            flexWrap="wrap"
            direction="column"
            header="Quests"
            cornerImage={module?.thumbnailImgUrl}
          >
            <Text>Currently no quests playing in this world</Text>
          </ContentSection>
          <ContentSection
            flexWrap="wrap"
            direction="column"
            header="Characters"
            cornerImage={module?.thumbnailImgUrl}
          >
            <Text>Currently no characters playing in this world</Text>
          </ContentSection>
        </Col>
      </Row>
    </Layout>
  );
};

export default DetailWorld;
