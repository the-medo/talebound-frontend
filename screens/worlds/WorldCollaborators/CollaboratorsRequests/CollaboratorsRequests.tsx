import React from 'react';
import { useGetWorldAdmins } from '../../../../api/worlds/useGetWorldAdmins';
import ContentSection from '../../../../components/ContentSection/ContentSection';
import CollaboratorRowRequest from './CollaboratorRowRequest';

interface CollaboratorsRequestsProps {
  worldId: number;
}

const CollaboratorsRequests: React.FC<CollaboratorsRequestsProps> = ({ worldId }) => {
  const { data: worldAdmins = [], isLoading: isLoadingWorldAdmins } = useGetWorldAdmins({
    variables: worldId,
  });

  return (
    <ContentSection flexWrap="wrap" direction="column" header="Requests">
      {worldAdmins.map((worldAdmin) => (
        <CollaboratorRowRequest data={worldAdmin} key={worldAdmin.userId} />
      ))}
    </ContentSection>
  );
};

export default CollaboratorsRequests;
