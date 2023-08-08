import React from 'react';
import ActionBoxWorldEdit from '../EditWorld/ActionBoxWorldEdit';
import LeftNavbar from '../../../components/LeftNavbar/LeftNavbar';
import Layout from '../../../components/Layout/Layout';
import { Col, Row } from '../../../components/Flex/Flex';
import ContentSection from '../../../components/ContentSection/ContentSection';
import { useGetWorldAdmins } from '../../../api/worlds/useGetWorldAdmins';

interface EditWorldCollaboratorsProps {
  worldId: number;
}

const EditWorldCollaborators: React.FC<EditWorldCollaboratorsProps> = ({ worldId }) => {
  const { data: worldAdmins = [], isLoading: isLoadingWorldAdmins } = useGetWorldAdmins({
    variables: worldId,
  });

  return (
    <>
      <ActionBoxWorldEdit worldId={worldId} activeButton="collaborators" />
      <Layout vertical={true} navbar={<LeftNavbar />}>
        <Row gap="md" alignItems="start" wrap>
          <Col css={{ flexGrow: 5, flexBasis: '10rem' }}>
            <ContentSection flexWrap="wrap" direction="column">
              {worldAdmins.map((worldAdmin) => (
                <div>{worldAdmin.userId}</div>
              ))}
            </ContentSection>
          </Col>
        </Row>
      </Layout>
    </>
  );
};

export default EditWorldCollaborators;
