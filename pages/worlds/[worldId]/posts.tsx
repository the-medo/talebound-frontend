import React from 'react';
import WorldLayout from '../../../components/Layout/WorldLayout';
import useNumericParam from '../../../hooks/useNumericParam';
import { useMenuIdWorld } from '../../../hooks/useMenuIdWorld';
import MenuPosts from '../../../screens/menus/MenuPosts/MenuPosts';

interface postsProps {}

const WorldPosts: React.FC<postsProps> = () => {
  const worldId = useNumericParam('worldId') ?? 0;
  const menuId = useMenuIdWorld(worldId);
  return (
    <WorldLayout>
      <MenuPosts menuId={menuId} />
    </WorldLayout>
  );
};

export default WorldPosts;
