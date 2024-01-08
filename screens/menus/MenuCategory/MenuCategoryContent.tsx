import React from 'react';
import { useGetMenuItemContent } from '../../../api/menus/useGetMenuItemContent';
import MenuItemContentElement from './MenuItemContentElement';

interface MenuCategoryContentProps {
  menuId: number;
  menuItemId: number;
}

const MenuCategoryContent: React.FC<MenuCategoryContentProps> = ({ menuId, menuItemId }) => {
  const { data: menuItemContent } = useGetMenuItemContent({
    variables: { menuId, menuItemId },
  });

  console.log('MENU ITEM CONTENT: ', menuItemContent);

  if (!menuItemContent?.hierarchy) return null;

  return (
    <MenuItemContentElement
      content={menuItemContent.hierarchy}
      entityGroupObject={menuItemContent.entityGroups}
    />
  );
};

export default MenuCategoryContent;
