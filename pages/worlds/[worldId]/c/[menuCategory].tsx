import React, { useMemo } from 'react';
import { useRouter } from 'next/router';
import ActionBoxWorld from '../../../../screens/worlds/ActionBoxWorld';
import LeftNavbarWorld from '../../../../components/LeftNavbar/LeftNavbarWorld';
import Layout from '../../../../components/Layout/Layout';
import useNumericParam from '../../../../hooks/useNumericParam';
import MenuCategory from '../../../../screens/menus/MenuCategory/MenuCategory';

interface MenuCategoryProps {}

const MenuCategoryPage: React.FC<MenuCategoryProps> = () => {
  const worldId = useNumericParam('worldId') ?? 0;
  const router = useRouter();

  const m = router.query['menuCategory'];

  const menuItemCode = useMemo(() => {
    return typeof m === 'string' ? m : '';
  }, [m]);

  const navbar = useMemo(() => <LeftNavbarWorld worldId={worldId} />, [worldId]);

  return (
    <>
      <ActionBoxWorld worldId={worldId} activeButton="collaborators" />
      <Layout vertical={true} navbar={navbar}>
        <MenuCategory menuItemCode={menuItemCode} worldId={worldId} />
      </Layout>
    </>
  );
};

export default MenuCategoryPage;
