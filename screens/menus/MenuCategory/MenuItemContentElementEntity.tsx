import React from 'react';
import { EntityGroupContentHierarchyEntity } from '../../../api/menus/useGetMenuItemContent';
import ContentSection from '../../../components/ContentSection/ContentSection';
import { useSelector } from 'react-redux';
import { ReduxState } from '../../../store';
import { useDraggable } from '@dnd-kit/core';

interface MenuItemContentElementEntityProps {
  content: EntityGroupContentHierarchyEntity;
  isOver: boolean;
}

const MenuItemContentElementEntity: React.FC<MenuItemContentElementEntityProps> = ({
  content,
  isOver,
}) => {
  const rearrangeMode = useSelector((state: ReduxState) => state.menuCategory.rearrangeMode);
  const entityDraggableId = `entity-${content.entityId}`;
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: entityDraggableId,
  });

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;

  const displayDropZone = !isDragging && isOver;

  return (
    <>
      {displayDropZone ? (
        <div
          style={{
            padding: '3px',
            width: '100%',
            border: '1px solid green',
            backgroundColor: 'lightgreen',
          }}
        >
          drop here{' '}
        </div>
      ) : null}
      <div ref={setNodeRef} style={style} {...listeners} {...attributes}>
        Entity {content.entityId}
      </div>
      {displayDropZone ? (
        <div
          style={{
            padding: '3px',
            width: '100%',
            border: '1px solid green',
            backgroundColor: 'lightgreen',
          }}
        >
          {' '}
          drop or here{' '}
        </div>
      ) : null}
    </>
  );
};

export default MenuItemContentElementEntity;
