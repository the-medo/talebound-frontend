import React, { useCallback, useMemo, useState } from 'react';
import { useGetModuleAdmins } from '../../../../api/modules/useGetModuleAdmins';
import ContentSection from '../../../../components/ContentSection/ContentSection';
import CollaboratorRowRequest from './CollaboratorRowRequest';
import { useMyWorldRole, WorldAdminRole } from '../../../../hooks/useWorldAdmins';
import { Row } from '../../../../components/Flex/Flex';
import { Button } from '../../../../components/Button/Button';

interface CollaboratorsRequestsProps {
  worldId: number;
}

const CollaboratorsRequests: React.FC<CollaboratorsRequestsProps> = ({ worldId }) => {
  const role = useMyWorldRole(worldId);
  const { data: worldAdmins = [], isPending } = useGetModuleAdmins({
    variables: worldId,
  });

  const [showDenied, setShowDenied] = useState(false);

  const worldAdminRequestsWaiting = useMemo(
    () => worldAdmins.filter((wa) => wa.approved === 2),
    [worldAdmins],
  );

  const worldAdminRequestsDenied = useMemo(
    () => worldAdmins.filter((wa) => wa.approved === 0 || !wa.approved),
    [worldAdmins],
  );

  const toggleShowDenied = useCallback(() => {
    setShowDenied((p) => !p);
  }, []);

  if (role !== WorldAdminRole.SUPER_COLLABORATOR) {
    return null;
  }

  return (
    <ContentSection loading={isPending} flexWrap="wrap" direction="column" header="Requests">
      {worldAdminRequestsWaiting.length === 0 && <p>No pending collaboration requests</p>}
      {worldAdminRequestsWaiting.map((wa) => (
        <CollaboratorRowRequest data={wa} key={wa.userId} />
      ))}
      {showDenied &&
        worldAdminRequestsDenied.map((wa) => <CollaboratorRowRequest data={wa} key={wa.userId} />)}
      {worldAdminRequestsDenied.length > 0 && (
        <Row alignSelf="end">
          <Button color="primaryOutline" size="sm" onClick={toggleShowDenied}>
            {showDenied ? 'Hide' : 'Show'} already denied requests
          </Button>
        </Row>
      )}
    </ContentSection>
  );
};

export default CollaboratorsRequests;
