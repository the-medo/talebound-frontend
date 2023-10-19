import React, { useMemo } from 'react';
import { useGetWorldById } from '../../api/worlds/useGetWorldById';
import Navbar, { NavbarItem } from './Navbar';
import { isWorldCollaborator, useMyWorldRole } from '../../hooks/useWorldAdmins';

interface LeftNavbarWorldProps {
  worldId: number;
}

const LeftNavbarWorld: React.FC<LeftNavbarWorldProps> = ({ worldId }) => {
  const { data: worldData } = useGetWorldById({ variables: worldId });
  const menuId = worldData?.worldMenuId ?? 0;
  const role = useMyWorldRole(worldId);

  const postfixItems: NavbarItem[] = useMemo(() => {
    if (isWorldCollaborator(role)) {
      return [
        {
          key: 'world-posts',
          title: 'Posts',
          url: `/worlds/${worldId}/posts`,
        },
      ];
    }

    return [];
  }, [role, worldId]);

  return (
    <Navbar
      menuId={menuId}
      urlPrefix={`/worlds/${worldId}/c`}
      postfixItemsTitle="Admin"
      postfixItems={postfixItems}
    />
  );
};

export default LeftNavbarWorld;
