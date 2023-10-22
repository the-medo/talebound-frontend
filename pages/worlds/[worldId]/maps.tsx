import React from 'react';
import WorldLayout from '../../../components/Layout/WorldLayout';
import useNumericParam from '../../../hooks/useNumericParam';
import { useMenuIdWorld } from '../../../hooks/useMenuIdWorld';
import { isWorldCollaborator, useMyWorldRole } from '../../../hooks/useWorldAdmins';
import MapsScreen from '../../../screens/menus/Maps/MapsScreen';

interface mapsProps {}

const WorldMaps: React.FC<mapsProps> = () => {
  const worldId = useNumericParam('worldId') ?? 0;
  const menuId = useMenuIdWorld(worldId);
  const role = useMyWorldRole(worldId);
  const canEdit = isWorldCollaborator(role);

  return (
    <WorldLayout>
      <MapsScreen menuId={menuId} canEdit={canEdit} />
    </WorldLayout>
  );
};

export default WorldMaps;
