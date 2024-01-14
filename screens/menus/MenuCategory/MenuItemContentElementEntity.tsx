import React from 'react';
import { EntityGroupContentHierarchyEntity } from '../../../api/menus/useGetMenuItemContent';
import ContentSection from '../../../components/ContentSection/ContentSection';
import { useSelector } from 'react-redux';
import { ReduxState } from '../../../store';
import { useDraggable, useDroppable } from '@dnd-kit/core';
import { MdDragIndicator } from 'react-icons/md';
import { DragHandle } from '../MenuAdministration/menuAdministrationComponents';
import { Col, Row } from '../../../components/Flex/Flex';

interface MenuItemContentElementEntityProps {
  content: EntityGroupContentHierarchyEntity;
}

const MenuItemContentElementEntity: React.FC<MenuItemContentElementEntityProps> = ({ content }) => {
  const rearrangeMode = useSelector((state: ReduxState) => state.menuCategory.rearrangeMode);

  const entityDroppableId = `entity-droppable-${content.entityId}`;
  const { isOver, setNodeRef: setDroppableRef } = useDroppable({
    id: entityDroppableId,
    data: content,
  });

  const entityDraggableId = `entity-draggable-${content.entityId}`;
  const {
    attributes,
    listeners,
    setNodeRef: setDraggableRef,
  } = useDraggable({
    id: entityDraggableId,
    disabled: !rearrangeMode,
    data: content,
    attributes: {},
  });

  return (
    <>
      <Col fullWidth ref={setDroppableRef}>
        <Row
          style={{
            border: '1px solid blue',
          }}
        >
          {rearrangeMode && (
            <DragHandle ref={setDraggableRef} {...listeners} {...attributes}>
              <MdDragIndicator size={20} />
            </DragHandle>
          )}
          Entity {content.entityId}
        </Row>
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
      </Col>
    </>
  );
};

export default MenuItemContentElementEntity;
