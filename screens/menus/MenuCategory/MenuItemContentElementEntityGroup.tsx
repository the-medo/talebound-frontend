import React from 'react';
import {
  EntityGroupContentHierarchyEntityGroup,
  EntityGroupObject,
} from '../../../api/menus/useGetMenuItemContent';
import ContentSection from '../../../components/ContentSection/ContentSection';
import MenuItemContentElement from './MenuItemContentElement';

interface MenuItemContentElementEntityGroupProps {
  content: EntityGroupContentHierarchyEntityGroup;
  entityGroupObject: EntityGroupObject;
}

const MenuItemContentElementEntityGroup: React.FC<MenuItemContentElementEntityGroupProps> = ({
  content,
  entityGroupObject,
}) => {
  return (
    <ContentSection direction={'column'} header={`Group ${content.entityGroupId}`}>
      {content.children.map((c) => (
        <MenuItemContentElement
          key={c.position}
          content={c}
          entityGroupObject={entityGroupObject}
        />
      ))}
    </ContentSection>
  );
};

export default MenuItemContentElementEntityGroup;
