import React from 'react';
import {
  EntityGroupContentHierarchy,
  EntityGroupObject,
} from '../../../api/menus/useGetMenuItemContent';
import MenuItemContentElementEntity from './MenuItemContentElementEntity';
import MenuItemContentElementEntityGroup from './MenuItemContentElementEntityGroup';

interface MenuItemContentElementProps {
  content: EntityGroupContentHierarchy;
  entityGroupObject: EntityGroupObject;
}

const MenuItemContentElement: React.FC<MenuItemContentElementProps> = ({
  content,
  entityGroupObject,
}) => {
  switch (content.type) {
    case 'ENTITY':
      return <MenuItemContentElementEntity content={content} />;
    case 'GROUP':
      return (
        <MenuItemContentElementEntityGroup
          content={content}
          entityGroupObject={entityGroupObject}
        />
      );
  }
};

export default MenuItemContentElement;
