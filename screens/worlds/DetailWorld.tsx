import React from 'react';
import LeftNavbar from '../../components/LeftNavbar/LeftNavbar';
import ContentSection from '../../components/ContentSection/ContentSection';
import { Col, Row } from '../../components/Flex/Flex';
import Layout from '../../components/Layout/Layout';
import { useMyWorldAdmin } from '../../hooks/useWorldsOfUser';
import Link from 'next/link';

interface DetailWorldProps {
  worldId: number;
}

const DetailWorld: React.FC<DetailWorldProps> = ({ worldId }) => {
  const isAdmin = useMyWorldAdmin(worldId);

  return (
    <Layout vertical={true} navbar={<LeftNavbar />}>
      <Row gap="md" alignItems="start" wrap>
        <Col css={{ flexGrow: 5, flexBasis: '10rem' }}>
          <ContentSection flexWrap="wrap" direction="column">
            DetailWorld - {worldId}
            {isAdmin && <Link href={`/worlds/${worldId}/edit`}>Admin</Link>}
          </ContentSection>
        </Col>
      </Row>
    </Layout>
  );
};

export default DetailWorld;
