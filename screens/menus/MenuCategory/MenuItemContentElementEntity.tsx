import React from 'react';
import { EntityGroupContentHierarchyEntity } from '../../../api/menus/useGetMenuItemContent';
import { useSelector } from 'react-redux';
import { ReduxState } from '../../../store';
import { useDraggable, useDroppable } from '@dnd-kit/core';
import { MdDragIndicator } from 'react-icons/md';
import { DragHandle } from '../MenuAdministration/menuAdministrationComponents';
import { Col, Row } from '../../../components/Flex/Flex';
import MenuCategoryEntityDropArea from './MenuCategoryEntityDropArea';
import { isOverCheck } from './menuCategoryUtils';

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
    id: content.hierarchyId + '-drop-move',
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

  console.log(content.hierarchyId, over?.id, over?.data?.current?.hierarchyId);

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
          Entity {content.entityId}
        </Row>
        {canDropHere && isOver && <MenuCategoryEntityDropArea content={content} />}
      </Col>
    </>
  );
};

export default MenuItemContentElementEntity;
