import React, { useMemo } from 'react';
import { useRouter } from 'next/router';
import ActionBoxWorld from '../../../screens/worlds/ActionBoxWorld';
import LeftNavbarWorld from '../../../components/LeftNavbar/LeftNavbarWorld';
import Layout from '../../../components/Layout/Layout';
import useNumericParam from '../../../hooks/useNumericParam';

interface MenuCategoryProps {}

const MenuCategory: React.FC<MenuCategoryProps> = () => {
  const worldId = useNumericParam('worldId') ?? 0;
  const router = useRouter();
  // router.query.id will hold the value of id from the URL
  const menuItem = router.query['menuCategory'];

  const navbar = useMemo(() => <LeftNavbarWorld worldId={worldId} />, [worldId]);

  return (
    <>
      <ActionBoxWorld worldId={worldId} activeButton="collaborators" />
      <Layout vertical={true} navbar={navbar}>
        <div>MenuCategory - {menuItem}</div>
      </Layout>
    </>
  );
};

export default MenuCategory;
