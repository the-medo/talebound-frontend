import React from 'react';
import { useSelector } from 'react-redux';
import { ReduxState } from '../../../store';
import { useDraggable, useDroppable } from '@dnd-kit/core';
import { MdDragIndicator } from 'react-icons/md';
import { DragHandle } from '../MenuAdministration/menuAdministrationComponents';
import { Col, Row } from '../../../components/Flex/Flex';
import MenuCategoryEntityDropArea from './MenuCategoryEntityDropArea';
import { isOverCheck } from './menuCategoryUtils';
import { EntityGroupContentHierarchyEntity } from '../../../hooks/useGetMenuItemContentHierarchy';

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
    over,
    setNodeRef: setDroppableRef,
    active,
  } = useDroppable({
    id: content.hierarchyId + '-drop_move',
    data: content,
  });
  const canDropHere =
    !content.hierarchyId.startsWith(`${active?.id}-`) && content.hierarchyId !== active?.id;

  const {
    attributes,
    listeners,
    setNodeRef: setDraggableRef,
    isDragging,
  } = useDraggable({
    id: content.hierarchyId,
    disabled: !rearrangeMode || !canDropHere,
    data: content,
  });

  const isOver = isOverCheck(content.hierarchyId, over?.id);

  return (
    <>
      <Col gap="sm" fullWidth ref={setDroppableRef}>
        <Row semiTransparent={isDragging}>
          {rearrangeMode && showHandles && (
            <DragHandle ref={setDraggableRef} {...listeners} {...attributes}>
              <MdDragIndicator size={20} />
            </DragHandle>
          )}
          Entity {content.entityId} - {content.hierarchyId} [{active?.id}]
        </Row>
        {canDropHere && isOver && <MenuCategoryEntityDropArea content={content} />}
      </Col>
    </>
  );
};

export default MenuItemContentElementEntity;
