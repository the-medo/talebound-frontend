import React, { useMemo } from 'react';
import { useGetWorldAdmins } from '../../../../api/worlds/useGetWorldAdmins';
import CollaboratorRowApproved from './CollaboratorRowApproved';
import ContentSection from '../../../../components/ContentSection/ContentSection';

interface CollaboratorsApprovedProps {
  worldId: number;
}

const CollaboratorsApproved: React.FC<CollaboratorsApprovedProps> = ({ worldId }) => {
  const { data: worldAdmins = [], isLoading } = useGetWorldAdmins({
    variables: worldId,
    enabled: worldId > 0,
  });

  const worldAdminApproved = useMemo(
    () =>
      worldAdmins
        .filter((wa) => wa.approved === 1)
        .sort((a, b) => (a.createdAt ?? '').localeCompare(b.createdAt ?? '')),
    [worldAdmins],
  );

  const canLeave = worldAdminApproved.filter((wa) => wa.superAdmin).length > 1;

  return (
    <ContentSection loading={isLoading} flexWrap="wrap" direction="column" header="Collaborators">
      {worldAdminApproved.map((worldAdmin) => (
        <CollaboratorRowApproved data={worldAdmin} key={worldAdmin.userId} canLeave={canLeave} />
      ))}
    </ContentSection>
  );
};

export default CollaboratorsApproved;
