import React from 'react';
import ActionBoxWorldEdit from '../EditWorld/ActionBoxWorldEdit';
import LeftNavbar from '../../../components/LeftNavbar/LeftNavbar';
import Layout from '../../../components/Layout/Layout';
import { Col, Row } from '../../../components/Flex/Flex';
import CollaboratorsApproved from './CollaboratorsApproved/CollaboratorsApproved';
import CollaboratorsRequests from './CollaboratorsRequests/CollaboratorsRequests';
import NewCollaboratorRequest from './NewCollaboratorRequest/NewCollaboratorRequest';
import ArticleWorldCollaboration from '../../../articles/Worlds/ArticleWorldCollaboration';

interface WorldCollaboratorsProps {
  worldId: number;
}

const WorldCollaborators: React.FC<WorldCollaboratorsProps> = ({ worldId }) => {
  return (
    <>
      <ActionBoxWorldEdit worldId={worldId} activeButton="collaborators" />
      <Layout vertical={true} navbar={<LeftNavbar />}>
        <Row gap="md" alignItems="start" wrap>
          <Col css={{ flexGrow: 5, flexBasis: '10rem' }}>
            <CollaboratorsRequests worldId={worldId} />
            <CollaboratorsApproved worldId={worldId} />
            <NewCollaboratorRequest worldId={worldId} />
          </Col>
          <Col css={{ flexGrow: 0, flexBasis: '600px' }}>
            <ArticleWorldCollaboration />
          </Col>
        </Row>
      </Layout>
    </>
  );
};

export default WorldCollaborators;
