import React from 'react';
import useNumericParam from '../../../../../hooks/useNumericParam';
import { useMenuIdWorld } from '../../../../../hooks/useMenuIdWorld';
import MenuCategoryPage from '../../../../../component-sections/Menu/MenuCategoryPage';
import WorldLayout from '../../../../../components/Layout/WorldLayout';

interface MenuCategoryProps {
  postId?: number;
}

const MenuCategoryPageWorlds: React.FC<MenuCategoryProps> = ({ postId }) => {
  const worldId = useNumericParam('worldId') ?? 0;
  const menuId = useMenuIdWorld(worldId);

  return (
    <WorldLayout>
      <MenuCategoryPage menuId={menuId} postId={postId} linkPrefix={`/worlds/${worldId}`} />
    </WorldLayout>
  );
};

export default MenuCategoryPageWorlds;
