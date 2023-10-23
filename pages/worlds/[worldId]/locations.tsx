import React from 'react';
import WorldLayout from '../../../components/Layout/WorldLayout';
import useNumericParam from '../../../hooks/useNumericParam';
import { isWorldCollaborator, useMyWorldRole } from '../../../hooks/useWorldAdmins';
import LocationsScreen from '../../../screens/menus/Locations/LocationsScreen';

interface locationsProps {}

const WorldLocations: React.FC<locationsProps> = () => {
  const worldId = useNumericParam('worldId') ?? 0;
  const role = useMyWorldRole(worldId);
  const canEdit = isWorldCollaborator(role);

  return (
    <WorldLayout>
      <LocationsScreen canEdit={canEdit} />
    </WorldLayout>
  );
};

export default WorldLocations;
