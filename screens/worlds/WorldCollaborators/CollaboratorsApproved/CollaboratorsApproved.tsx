import React from 'react';
import { useGetWorldAdmins } from '../../../../api/worlds/useGetWorldAdmins';
import CollaboratorRowApproved from './CollaboratorRowApproved';
import ContentSection from '../../../../components/ContentSection/ContentSection';

interface CollaboratorsApprovedProps {
  worldId: number;
}

const CollaboratorsApproved: React.FC<CollaboratorsApprovedProps> = ({ worldId }) => {
  const { data: worldAdmins = [], isLoading: isLoadingWorldAdmins } = useGetWorldAdmins({
    variables: worldId,
  });

  return (
    <ContentSection flexWrap="wrap" direction="column" header="Collaborators">
      {worldAdmins.map((worldAdmin) => (
        <CollaboratorRowApproved data={worldAdmin} key={worldAdmin.userId} />
      ))}
    </ContentSection>
  );
};

export default CollaboratorsApproved;
