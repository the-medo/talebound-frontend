import React from 'react';
import useNumericParam from '../../../../../hooks/useNumericParam';
import { useMenuIdWorld } from '../../../../../hooks/useMenuIdWorld';
import MenuCategoryPage from '../../../../../component-sections/Menu/MenuCategoryPage';
import WorldLayout from '../../../../../components/Layout/WorldLayout';
import { isWorldCollaborator, useMyWorldRole } from '../../../../../hooks/useWorldAdmins';

interface MenuCategoryProps {
  postId?: number;
}

const MenuCategoryPageWorlds: React.FC<MenuCategoryProps> = ({ postId }) => {
  const worldId = useNumericParam('worldId') ?? 0;
  const menuId = useMenuIdWorld(worldId);
  const role = useMyWorldRole(worldId);
  const canEdit = isWorldCollaborator(role);

  return (
    <WorldLayout>
      <MenuCategoryPage
        menuId={menuId}
        postId={postId}
        linkPrefix={`/worlds/${worldId}`}
        canEdit={canEdit}
      />
    </WorldLayout>
  );
};

export default MenuCategoryPageWorlds;
