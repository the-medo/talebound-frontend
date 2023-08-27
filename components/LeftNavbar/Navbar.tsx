import React, { useEffect } from 'react';
import NavbarHeader from './NavbarHeader';
import { NavbarWrapper, NavbarItem, NavbarSquare } from './navbarComponents';
import { useGetMenuItems } from '../../api/menus/useGetMenuItems';
import { useGetMenuById } from '../../api/menus/useGetMenuById';
import { useDispatch } from 'react-redux';
import { setMenuImage } from '../../store/globalSlice';

interface NavbarProps {
  menuId: number;
  urlPrefix: string;
}

const Navbar: React.FC<NavbarProps> = ({ menuId, urlPrefix }) => {
  const dispatch = useDispatch();
  const { data: menuData } = useGetMenuById({ variables: menuId });
  const { data: menuItemsData = [] } = useGetMenuItems({ variables: menuId, enabled: menuId > 0 });

  useEffect(() => {
    if (menuData?.headerImageUrl) {
      console.log('menuData', menuData);
      console.log('menuDataHeader', menuData?.headerImageUrl);
      dispatch(setMenuImage(menuData?.headerImageUrl));
    }
  }, [dispatch, menuData, menuData?.headerImageUrl]);

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
