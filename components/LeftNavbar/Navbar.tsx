import React from 'react';
import NavbarHeader from './NavbarHeader';
import { NavbarWrapper, NavbarItem, NavbarSquare } from './navbarComponents';
import { useGetMenuItems } from '../../api/menus/useGetMenuItems';

interface NavbarProps {
  menuId: number;
  urlPrefix: string;
}

const Navbar: React.FC<NavbarProps> = ({ menuId, urlPrefix }) => {
  const { data: menuItemsData = [] } = useGetMenuItems({ variables: menuId, enabled: menuId > 0 });

  return (
    <NavbarWrapper>
      {menuItemsData.map((item) => {
        if (item.isMain) return <NavbarHeader key={item.id} title={item.name ?? ''} />;
        if (item.code) {
          return (
            <NavbarItem key={item.id} href={`${urlPrefix}/${item.code}`}>
              {item.name ?? 'Menu item'}
              <NavbarSquare />
            </NavbarItem>
          );
        }
        return null;
      })}
    </NavbarWrapper>
  );
};

export default Navbar;
