import React, { useState } from 'react';
import {
  EntityGroupContentHierarchy,
  useGetMenuItemContent,
} from '../../../api/menus/useGetMenuItemContent';
import MenuItemContentElement from './MenuItemContentElement';
import { DragOverlay } from '@dnd-kit/core';
import { useSelector } from 'react-redux';
import { ReduxState } from '../../../store';

interface MenuCategoryContentProps {
  menuId: number;
  menuItemId: number;
}

const MenuCategoryContent: React.FC<MenuCategoryContentProps> = ({ menuId, menuItemId }) => {
  const rearrangeMode = useSelector((state: ReduxState) => state.menuCategory.rearrangeMode);
  const draggingData = useSelector((state: ReduxState) => state.menuCategory.draggingData);
  const { data: menuItemContent } = useGetMenuItemContent({
    variables: { menuId, menuItemId },
  });

  console.log('MENU ITEM CONTENT: ', menuItemContent);

  if (!menuItemContent?.hierarchy) return null;

  /*if (menuItemContent.hierarchy.type === 'GROUP') {
    return menuItemContent.hierarchy.children.map((c) => (
      <MenuItemContentElement
        key={c.position}
        content={c}
        entityGroupObject={menuItemContent.entityGroups}
      />
    ));
  }*/

  return (
    <>
      <MenuItemContentElement
        content={menuItemContent.hierarchy}
        entityGroupObject={menuItemContent.entityGroups}
      />
      {rearrangeMode && (
        <DragOverlay>
          {draggingData ? (
            <div style={{ width: '500px' }}>
              <MenuItemContentElement
                content={draggingData}
                entityGroupObject={menuItemContent.entityGroups}
              />
            </div>
          ) : null}
        </DragOverlay>
      )}
    </>
  );
};

export default MenuCategoryContent;
