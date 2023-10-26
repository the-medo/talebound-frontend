import React from 'react';
import WorldLayout from '../../../components/Layout/WorldLayout';
import useNumericParam from '../../../hooks/useNumericParam';
// import { useMenuIdWorld } from '../../../hooks/useMenuIdWorld';
// import MenuPosts from '../../../screens/menus/MenuPosts/MenuPosts';
import { isWorldCollaborator, useMyWorldRole } from '../../../hooks/useWorldAdmins';
import PostsScreen from '../../../screens/menus/Posts/PostsScreen';

interface postsProps {}

const WorldPosts: React.FC<postsProps> = () => {
  const worldId = useNumericParam('worldId') ?? 0;
  // const menuId = useMenuIdWorld(worldId);
  const role = useMyWorldRole(worldId);
  const canEdit = isWorldCollaborator(role);

  return (
    <WorldLayout>
      {/*<MenuPosts menuId={menuId} canEdit={canEdit} />*/}
      <PostsScreen canEdit={canEdit} />
    </WorldLayout>
  );
};

export default WorldPosts;
