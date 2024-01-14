import React from 'react';
import {
  EntityGroupContentHierarchy,
  EntityGroupObject,
} from '../../../api/menus/useGetMenuItemContent';
import MenuItemContentElementEntity from './MenuItemContentElementEntity';
import MenuItemContentElementEntityGroup from './MenuItemContentElementEntityGroup';

interface MenuItemContentElementProps {
  showHandles: boolean;
  content: EntityGroupContentHierarchy;
  entityGroupObject: EntityGroupObject;
}

const MenuItemContentElement: React.FC<MenuItemContentElementProps> = ({
  showHandles,
  content,
  entityGroupObject,
}) => {
  switch (content.type) {
    case 'ENTITY':
      return <MenuItemContentElementEntity showHandles={showHandles} content={content} />;
    case 'GROUP':
      return (
        <MenuItemContentElementEntityGroup
          showHandles={showHandles}
          content={content}
          entityGroupObject={entityGroupObject}
        />
      );
  }
};

export default MenuItemContentElement;
