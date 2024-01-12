import React from 'react';
import { EntityGroupContentHierarchyEntity } from '../../../api/menus/useGetMenuItemContent';
import ContentSection from '../../../components/ContentSection/ContentSection';
import { useSelector } from 'react-redux';
import { ReduxState } from '../../../store';
import { useDraggable, useDroppable } from '@dnd-kit/core';

interface MenuItemContentElementEntityProps {
  content: EntityGroupContentHierarchyEntity;
  isOver: boolean;
}

const MenuItemContentElementEntity: React.FC<MenuItemContentElementEntityProps> = ({ content }) => {
  const rearrangeMode = useSelector((state: ReduxState) => state.menuCategory.rearrangeMode);

  const entityDroppableId = `entity-droppable-${content.entityId}`;
  const { isOver, setNodeRef: setDroppableRef } = useDroppable({
    id: entityDroppableId,
  });

  const entityDraggableId = `entity-draggable-${content.entityId}`;
  const {
    attributes,
    listeners,
    setNodeRef: setDraggableRef,
    transform,
    isDragging,
  } = useDraggable({
    id: entityDraggableId,
    disabled: !rearrangeMode,
    attributes: {},
  });

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
        height: 'auto',
        border: '1px solid red',
      }
    : { height: 'auto' };

  return (
    <>
      <div
        ref={setDroppableRef}
        style={{
          width: '100%',
          border: '1px solid blue',
        }}
      >
        <div ref={setDraggableRef} style={style} {...listeners} {...attributes}>
          Entity {content.entityId}
        </div>
        <div
          style={{
            padding: '3px',
            width: '100%',
            border: '1px solid green',
            backgroundColor: 'lightgreen',
            display: isOver ? 'block' : 'none',
          }}
        >
          drop here{' '}
        </div>
      </div>
    </>
  );
};

export default MenuItemContentElementEntity;
