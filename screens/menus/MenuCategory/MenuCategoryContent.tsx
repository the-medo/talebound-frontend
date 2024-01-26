import React from 'react';
import MenuItemContentElement from './MenuItemContentElement';
import { DragOverlay } from '@dnd-kit/core';
import { useSelector } from 'react-redux';
import { ReduxState } from '../../../store';
import MenuItemContentElementEntityGroup from './MenuItemContentElementEntityGroup';
import { useGetMenuItemContentHierarchy } from '../../../hooks/useGetMenuItemContentHierarchy';

interface MenuCategoryContentProps {
  menuId: number;
  menuItemId: number;
}

const MenuCategoryContent: React.FC<MenuCategoryContentProps> = ({ menuId, menuItemId }) => {
  const editMode = useSelector((state: ReduxState) => state.menuCategory.editMode);
  const draggingData = useSelector((state: ReduxState) => state.menuCategory.draggingData);
  const menuItemContent = useGetMenuItemContentHierarchy(menuId, menuItemId);

  console.log('MENU ITEM CONTENT: ', menuItemContent);

  if (!menuItemContent?.hierarchy) return null;

  return (
    <>
      {menuItemContent.hierarchy.type === 'GROUP' && (
        <MenuItemContentElementEntityGroup
          isTopLevelGroup={true}
          showHandles={true}
          content={menuItemContent.hierarchy}
          entityGroupObject={menuItemContent.entityGroups}
        />
      )}
      {editMode && (
        <DragOverlay>
          {draggingData ? (
            <div style={{ width: '500px', opacity: 0.5 }}>
              <MenuItemContentElement
                showHandles={false}
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
