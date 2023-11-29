import React, { useMemo } from 'react';
import { useGetModuleAdmins } from '../../../../api/modules/useGetModuleAdmins';
import CollaboratorRowApproved from './CollaboratorRowApproved';
import ContentSection from '../../../../components/ContentSection/ContentSection';

interface CollaboratorsApprovedProps {
  worldId: number;
}

const CollaboratorsApproved: React.FC<CollaboratorsApprovedProps> = ({ worldId }) => {
  const { data: worldAdmins = [], isPending } = useGetModuleAdmins({
    variables: worldId,
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
    <ContentSection loading={isPending} flexWrap="wrap" direction="column" header="Collaborators">
      {worldAdminApproved.map((worldAdmin) => (
        <CollaboratorRowApproved data={worldAdmin} key={worldAdmin.userId} canLeave={canLeave} />
      ))}
    </ContentSection>
  );
};

export default CollaboratorsApproved;
