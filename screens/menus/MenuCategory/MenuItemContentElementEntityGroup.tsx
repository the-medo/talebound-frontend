import React, { useMemo } from 'react';
import {
  EntityGroupContentHierarchyEntityGroup,
  EntityGroupObject,
} from '../../../api/menus/useGetMenuItemContent';
import ContentSection from '../../../components/ContentSection/ContentSection';
import MenuItemContentElement from './MenuItemContentElement';
import { useSelector } from 'react-redux';
import { ReduxState } from '../../../store';
import { useDraggable, useDroppable } from '@dnd-kit/core';

interface MenuItemContentElementEntityGroupProps {
  content: EntityGroupContentHierarchyEntityGroup;
  entityGroupObject: EntityGroupObject;
}

const MenuItemContentElementEntityGroup: React.FC<MenuItemContentElementEntityGroupProps> = ({
  content,
  entityGroupObject,
}) => {
  // const { isOver, setNodeRef: setDroppableRef } = useDroppable({
  //   id: `entity-group-droppable-${content.entityGroupId}`,
  // });
  const entityDraggableId = `entity-group-draggable-${content.entityGroupId}`;
  const {
    attributes,
    listeners,
    setNodeRef: setDraggableRef,
    transform,
    isDragging,
  } = useDraggable({
    id: entityDraggableId,
  });

  const rearrangeMode = useSelector((state: ReduxState) => state.menuCategory.rearrangeMode);

  const children = useMemo(
    () =>
      content.children.map((c) => (
        <MenuItemContentElement
          key={c.position}
          content={c}
          entityGroupObject={entityGroupObject}
          isOver={false}
        />
      )),
    [content.children, entityGroupObject /*isOver*/],
  );

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
        width: '100%',
      }
    : {
        width: '100%',
      };

  return (
    <div ref={setDraggableRef} style={style} {...listeners} {...attributes}>
      <ContentSection
        // setRef={rearrangeMode ? setDroppableRef : undefined}
        direction={'column'}
        header={`Group ${content.entityGroupId}`}
        highlighted={false}
      >
        {children}
      </ContentSection>
    </div>
  );
};

export default MenuItemContentElementEntityGroup;
