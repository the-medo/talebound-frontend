import React, { useMemo } from 'react';
import {
  EntityGroupContentHierarchyEntityGroup,
  EntityGroupObject,
} from '../../../api/menus/useGetMenuItemContent';
import ContentSection from '../../../components/ContentSection/ContentSection';
import MenuItemContentElement from './MenuItemContentElement';
import { useSelector } from 'react-redux';
import { ReduxState } from '../../../store';
import { useDroppable } from '@dnd-kit/core';

interface MenuItemContentElementEntityGroupProps {
  content: EntityGroupContentHierarchyEntityGroup;
  entityGroupObject: EntityGroupObject;
}

const MenuItemContentElementEntityGroup: React.FC<MenuItemContentElementEntityGroupProps> = ({
  content,
  entityGroupObject,
}) => {
  const { isOver, setNodeRef } = useDroppable({
    id: `entity-group-${content.entityGroupId}`,
  });
  const rearrangeMode = useSelector((state: ReduxState) => state.menuCategory.rearrangeMode);

  const children = useMemo(
    () =>
      content.children.map((c) => (
        <MenuItemContentElement
          key={c.position}
          content={c}
          entityGroupObject={entityGroupObject}
          isOver={isOver}
        />
      )),
    [content.children, entityGroupObject, isOver],
  );

  return (
    <ContentSection
      setRef={rearrangeMode ? setNodeRef : undefined}
      direction={'column'}
      header={`Group ${content.entityGroupId}`}
      highlighted={rearrangeMode && isOver}
    >
      {children}
    </ContentSection>
  );
};

export default MenuItemContentElementEntityGroup;
