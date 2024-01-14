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
  showHandles: boolean;
  content: EntityGroupContentHierarchyEntity;
}

const MenuItemContentElementEntity: React.FC<MenuItemContentElementEntityProps> = ({
  content,
  showHandles,
}) => {
  const rearrangeMode = useSelector((state: ReduxState) => state.menuCategory.rearrangeMode);

  const {
    isOver,
    setNodeRef: setDroppableRef,
    active,
  } = useDroppable({
    id: content.hierarchyId + 'asd',
    data: content,
  });
  const canDropHere = !content.hierarchyId.startsWith(`${active?.id}-`);

  const {
    attributes,
    listeners,
    setNodeRef: setDraggableRef,
    isDragging,
  } = useDraggable({
    id: content.hierarchyId,
    disabled: !rearrangeMode || !canDropHere,
    data: content,
    attributes: {},
  });

  return (
    <>
      <Col fullWidth ref={setDroppableRef}>
        <Row semiTransparent={isDragging}>
          {rearrangeMode && showHandles && (
            <DragHandle ref={setDraggableRef} {...listeners} {...attributes}>
              <MdDragIndicator size={20} />
            </DragHandle>
          )}
          Entity {content.entityId}
        </Row>
        {canDropHere && (
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
        )}
      </Col>
    </>
  );
};

export default MenuItemContentElementEntity;
