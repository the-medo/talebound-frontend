import React, { Suspense, useMemo } from 'react';
import ContentSection from '../../../components/ContentSection/ContentSection';
import { Col, Row } from '../../../components/Flex/Flex';
import Layout from '../../../components/Layout/Layout';
import ActionBoxModule from '../ActionBoxModule';
import LeftNavbarModule from '../../../components/LeftNavbar/LeftNavbarModule';
import Loading from '../../../components/Loading/Loading';
import MiniStatistic from '../../../components/MiniStatistic/MiniStatistic';
import { TitleH2 } from '../../../components/Typography/Title';
import { Text } from '../../../components/Typography/Text';
import TagRow from '../../../components/TagRow/TagRow';
import { useGetModuleTypeAvailableTags } from '../../../api/tags/useGetModuleTypeAvailableTags';
import { PbModuleType } from '../../../generated/api-types/data-contracts';
import { useWorld } from '../../../hooks/useWorld';
import { useImage } from '../../../hooks/useImage';

const WorldIntroduction = React.lazy(() => import('../WorldIntroduction/WorldIntroduction'));

interface DetailWorldProps {
  worldId: number;
}

const DetailWorld: React.FC<DetailWorldProps> = ({ worldId }) => {
  const { world, module } = useWorld(worldId);

  const navbar = useMemo(() => <LeftNavbarModule moduleId={worldId} />, [worldId]);

  const { data: availableTags = [] } = useGetModuleTypeAvailableTags({
    variables: PbModuleType.MODULE_TYPE_WORLD,
  });

  const { image: thumbnailImg } = useImage(module?.thumbnailImgId ?? 0);

  console.log('module', module, thumbnailImg);

  return (
    <Layout vertical={true} navbar={navbar}>
      <ActionBoxModule moduleId={worldId} activeButton="edit" />
      <Row gap="md" alignItems="start" wrap>
        <Col css={{ flexGrow: 5, flexBasis: '10rem' }}>
          <ContentSection flexWrap="wrap" direction="column" cornerImage={thumbnailImg?.url}>
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
            cornerImage={thumbnailImg?.url}
          >
            <Text>Currently no quests playing in this world</Text>
          </ContentSection>
          <ContentSection
            flexWrap="wrap"
            direction="column"
            header="Characters"
            cornerImage={thumbnailImg?.url}
          >
            <Text>Currently no characters playing in this world</Text>
          </ContentSection>
        </Col>
      </Row>
    </Layout>
  );
};

export default DetailWorld;
