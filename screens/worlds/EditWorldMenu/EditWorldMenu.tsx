import React, { useMemo } from 'react';
import ActionBoxWorld from '../ActionBoxWorld';
import Layout from '../../../components/Layout/Layout';
import MenuAdministration from '../../menus/MenuAdministration/MenuAdministration';
import LeftNavbarWorld from '../../../components/LeftNavbar/LeftNavbarWorld';
import { isWorldCollaborator, useMyWorldRole } from '../../../hooks/useWorldAdmins';
import { Text } from '../../../components/Typography/Text';
import { useWorld } from '../../../hooks/useWorld';

const RESERVED_MENU_ITEM_CODES = ['maps'];

interface EditWorldMenuProps {
  worldId: number;
}

const EditWorldMenu: React.FC<EditWorldMenuProps> = ({ worldId }) => {
  const role = useMyWorldRole(worldId);
  const { module } = useWorld(worldId);
  const menuId = module?.menuId ?? 0;

  const navbar = useMemo(() => <LeftNavbarWorld worldId={worldId} />, [worldId]);

  return (
    <>
      <Layout vertical={true} navbar={navbar}>
        {menuId > 0 && isWorldCollaborator(role) && (
          <MenuAdministration menuId={menuId} reservedCodes={RESERVED_MENU_ITEM_CODES} />
        )}
        {!isWorldCollaborator(role) && (
          <Text>This page is accessible only for world collaborators</Text>
        )}
      </Layout>
      <ActionBoxWorld worldId={worldId} activeButton="menu" />
    </>
  );
};

export default EditWorldMenu;
