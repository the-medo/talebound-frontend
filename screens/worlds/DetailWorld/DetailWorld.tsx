import React, { Suspense, useMemo } from 'react';
import ContentSection from '../../../components/ContentSection/ContentSection';
import { Col, Row } from '../../../components/Flex/Flex';
import Layout from '../../../components/Layout/Layout';
import ActionBoxWorld from '../ActionBoxWorld';
import LeftNavbarWorld from '../../../components/LeftNavbar/LeftNavbarWorld';
import Loading from '../../../components/Loading/Loading';
import { useGetWorldById } from '../../../api/worlds/useGetWorldById';
import MiniStatistic from '../../../components/MiniStatistic/MiniStatistic';
import { TitleH2 } from '../../../components/Typography/Title';
import { Text } from '../../../components/Typography/Text';
import TagRow from '../../../components/TagRow/TagRow';

const WorldIntroduction = React.lazy(() => import('../WorldIntroduction/WorldIntroduction'));

interface DetailWorldProps {
  worldId: number;
}

const DetailWorld: React.FC<DetailWorldProps> = ({ worldId }) => {
  const { data: worldData } = useGetWorldById({ variables: worldId, enabled: worldId > 0 });

  const navbar = useMemo(() => <LeftNavbarWorld worldId={worldId} />, [worldId]);

  return (
    <Layout vertical={true} navbar={navbar}>
      <ActionBoxWorld worldId={worldId} activeButton="edit" />
      <Row gap="md" alignItems="start" wrap>
        <Col css={{ flexGrow: 5, flexBasis: '10rem' }}>
          <ContentSection
            flexWrap="wrap"
            direction="column"
            cornerImage={worldData?.imageThumbnail}
          >
            <Row wrap gap="md" fullWidth alignItems="start" justifyContent="between">
              <Row gap="md">
                <TitleH2>{worldData?.name}</TitleH2>
              </Row>
              <TagRow colorNonactive="primaryOutline" tags={worldData?.tags ?? []} width={500} />
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
            cornerImage={worldData?.imageThumbnail}
          >
            <Text>Currently no quests playing in this world</Text>
          </ContentSection>
          <ContentSection
            flexWrap="wrap"
            direction="column"
            header="Characters"
            cornerImage={worldData?.imageThumbnail}
          >
            <Text>Currently no characters playing in this world</Text>
          </ContentSection>
        </Col>
      </Row>
    </Layout>
  );
};

export default DetailWorld;
