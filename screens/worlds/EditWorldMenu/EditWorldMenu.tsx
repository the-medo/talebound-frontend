import React, { useMemo } from 'react';
import ActionBoxWorld from '../ActionBoxWorld';
import Layout from '../../../components/Layout/Layout';
import { useGetWorldById } from '../../../api/worlds/useGetWorldById';
import MenuAdministration from '../../menus/MenuAdministration/MenuAdministration';
import LeftNavbarWorld from '../../../components/LeftNavbar/LeftNavbarWorld';

const RESERVED_MENU_ITEM_CODES = ['maps'];

interface EditWorldMenuProps {
  worldId: number;
}

const EditWorldMenu: React.FC<EditWorldMenuProps> = ({ worldId }) => {
  const { data: worldData } = useGetWorldById({ variables: worldId });
  const menuId = worldData?.worldMenuId ?? 0;

  const navbar = useMemo(() => <LeftNavbarWorld worldId={worldId} />, [worldId]);

  return (
    <>
      <Layout vertical={true} navbar={navbar}>
        {menuId > 0 && (
          <MenuAdministration menuId={menuId} reservedCodes={RESERVED_MENU_ITEM_CODES} />
        )}
      </Layout>
      <ActionBoxWorld worldId={worldId} activeButton="menu" />
    </>
  );
};

export default EditWorldMenu;
