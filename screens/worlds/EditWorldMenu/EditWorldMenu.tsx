import React from 'react';
import ActionBoxWorld from '../ActionBoxWorld';
import Layout from '../../../components/Layout/Layout';
import LeftNavbar from '../../../components/LeftNavbar/LeftNavbar';
import { Col, Row } from '../../../components/Flex/Flex';
import ContentSection from '../../../components/ContentSection/ContentSection';
import { useGetWorldById } from '../../../api/worlds/useGetWorldById';
import MenuAdministration from '../../menus/MenuAdministration/MenuAdministration';

interface EditWorldMenuProps {
  worldId: number;
}

const EditWorldMenu: React.FC<EditWorldMenuProps> = ({ worldId }) => {
  const { data: worldData } = useGetWorldById({ variables: worldId });
  const menuId = worldData?.worldMenuId ?? 0;

  return (
    <>
      <Layout vertical={true} navbar={<LeftNavbar />}>
        {menuId > 0 && <MenuAdministration menuId={menuId} />}
      </Layout>
      <ActionBoxWorld worldId={worldId} activeButton="menu" />
    </>
  );
};

export default EditWorldMenu;
