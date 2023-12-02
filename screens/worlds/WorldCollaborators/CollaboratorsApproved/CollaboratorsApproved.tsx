import React, { useMemo } from 'react';
import { useGetModuleAdmins } from '../../../../api/modules/useGetModuleAdmins';
import CollaboratorRowApproved from './CollaboratorRowApproved';
import ContentSection from '../../../../components/ContentSection/ContentSection';

interface CollaboratorsApprovedProps {
  moduleId: number;
}

const CollaboratorsApproved: React.FC<CollaboratorsApprovedProps> = ({ moduleId }) => {
  const { data: moduleAdmins = [], isPending } = useGetModuleAdmins({
    variables: moduleId,
  });

  const moduleAdminsApproved = useMemo(
    () =>
      moduleAdmins
        .filter((wa) => wa.approved === 1)
        .sort((a, b) => (a.createdAt ?? '').localeCompare(b.createdAt ?? '')),
    [moduleAdmins],
  );

  const canLeave = moduleAdminsApproved.filter((wa) => wa.superAdmin).length > 1;

  return (
    <ContentSection loading={isPending} flexWrap="wrap" direction="column" header="Collaborators">
      {moduleAdminsApproved.map((moduleAdmin) => (
        <CollaboratorRowApproved data={moduleAdmin} key={moduleAdmin.userId} canLeave={canLeave} />
      ))}
    </ContentSection>
  );
};

export default CollaboratorsApproved;
