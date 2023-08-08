import React from 'react';
import ActionBoxWorldEdit from '../EditWorld/ActionBoxWorldEdit';
import Layout from '../../../components/Layout/Layout';
import LeftNavbar from '../../../components/LeftNavbar/LeftNavbar';
import { Col, Row } from '../../../components/Flex/Flex';
import ContentSection from '../../../components/ContentSection/ContentSection';

interface EditWorldMenuProps {
  worldId: number;
}

const EditWorldMenu: React.FC<EditWorldMenuProps> = ({ worldId }) => {
  return (
    <>
      <Layout vertical={true} navbar={<LeftNavbar />}>
        <Row gap="md" alignItems="start" wrap>
          <Col css={{ flexGrow: 5, flexBasis: '10rem' }}>
            <ContentSection flexWrap="wrap" direction="column">
              <div>EditWorldMenu</div>
            </ContentSection>
          </Col>
        </Row>
      </Layout>
      <ActionBoxWorldEdit worldId={worldId} activeButton="menu" />
    </>
  );
};

export default EditWorldMenu;
