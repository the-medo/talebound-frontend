import React, { useMemo } from 'react';
import Navbar, { NavbarItem } from './Navbar';
import { isModuleCollaborator, useMyModuleRole } from '../../hooks/useModuleAdmins';
import { useModule } from '../../hooks/useModule';

interface LeftNavbarModuleProps {
  moduleId: number;
}

const LeftNavbarModule: React.FC<LeftNavbarModuleProps> = ({ moduleId }) => {
  const { module } = useModule(moduleId);
  const menuId = module?.menuId ?? 0;
  const role = useMyModuleRole(moduleId);

  const postfixItems: NavbarItem[] = useMemo(() => {
    if (isModuleCollaborator(role)) {
      return [
        {
          key: 'posts',
          title: 'Posts',
          url: `/worlds/${moduleId}/posts`,
        },
        {
          key: 'maps',
          title: 'Maps',
          url: `/worlds/${moduleId}/maps`,
        },
        {
          key: 'locations',
          title: 'Locations',
          url: `/worlds/${moduleId}/locations`,
        },
      ];
    }

    return [];
  }, [role, moduleId]);

  return (
    <Navbar
      menuId={menuId}
      urlPrefix={`/worlds/${moduleId}/c`}
      postfixItemsTitle="Admin"
      postfixItems={postfixItems}
    />
  );
};

export default LeftNavbarModule;
