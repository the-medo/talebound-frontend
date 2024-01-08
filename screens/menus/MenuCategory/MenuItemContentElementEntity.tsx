import React from 'react';
import { EntityGroupContentHierarchyEntity } from '../../../api/menus/useGetMenuItemContent';
import ContentSection from '../../../components/ContentSection/ContentSection';

interface MenuItemContentElementEntityProps {
  content: EntityGroupContentHierarchyEntity;
}

const MenuItemContentElementEntity: React.FC<MenuItemContentElementEntityProps> = ({ content }) => {
  return <ContentSection direction="column" header={`Entity ${content.entityId}`} />;
};

export default MenuItemContentElementEntity;
