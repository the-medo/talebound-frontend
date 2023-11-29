import React, { useMemo } from 'react';
import Navbar, { NavbarItem } from './Navbar';
import { isWorldCollaborator, useMyWorldRole } from '../../hooks/useWorldAdmins';
import { useWorld } from '../../hooks/useWorld';

interface LeftNavbarWorldProps {
  worldId: number;
}

const LeftNavbarWorld: React.FC<LeftNavbarWorldProps> = ({ worldId }) => {
  const { module } = useWorld(worldId);
  const menuId = module?.menuId ?? 0;
  const role = useMyWorldRole(worldId);

  const postfixItems: NavbarItem[] = useMemo(() => {
    if (isWorldCollaborator(role)) {
      return [
        {
          key: 'world-posts',
          title: 'Posts',
          url: `/worlds/${worldId}/posts`,
        },
        {
          key: 'world-maps',
          title: 'Maps',
          url: `/worlds/${worldId}/maps`,
        },
        {
          key: 'world-locations',
          title: 'Locations',
          url: `/worlds/${worldId}/locations`,
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
