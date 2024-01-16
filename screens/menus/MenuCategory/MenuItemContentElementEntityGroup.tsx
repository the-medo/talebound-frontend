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
import { DragHandle } from '../MenuAdministration/menuAdministrationComponents';
import { MdDragIndicator } from 'react-icons/md';
import { TitleH2 } from '../../../components/Typography/Title';
import { Col, Row } from '../../../components/Flex/Flex';
import MenuCategoryEntityDropArea from './MenuCategoryEntityDropArea';
import { DropType, isOverCheck } from './menuCategoryUtils';

interface MenuItemContentElementEntityGroupProps {
  content: EntityGroupContentHierarchyEntityGroup;
  entityGroupObject: EntityGroupObject;
  showHandles: boolean;
  isTopLevelGroup?: boolean;
}

const MenuItemContentElementEntityGroup: React.FC<MenuItemContentElementEntityGroupProps> = ({
  content,
  entityGroupObject,
  showHandles,
  isTopLevelGroup = false,
}) => {
  const rearrangeMode = useSelector((state: ReduxState) => state.menuCategory.rearrangeMode);

  const { over, setNodeRef: setDroppableRef } = useDroppable({
    id: content.hierarchyId + '-drop_move',
    data: { ...content, dropType: DropType.MOVE },
  });

  const {
    attributes,
    listeners,
    setNodeRef: setDraggableRef,
    isDragging,
    active,
  } = useDraggable({
    id: content.hierarchyId,
    data: content,
    disabled: !rearrangeMode,
  });

  const canDropHere = !content.hierarchyId.startsWith(`${active?.id}-`);

  const children = useMemo(
    () =>
      content.children.map((c) => (
        <MenuItemContentElement
          key={c.position}
          showHandles={showHandles}
          content={c}
          entityGroupObject={entityGroupObject}
        />
      )),
    [showHandles, content.children, entityGroupObject /*isOver*/],
  );

  const dragHandle = useMemo(
    () =>
      rearrangeMode && !isTopLevelGroup && showHandles ? (
        <DragHandle ref={setDraggableRef} {...listeners} {...attributes}>
          <MdDragIndicator size={20} />
        </DragHandle>
      ) : null,
    [isTopLevelGroup, showHandles, attributes, listeners, rearrangeMode, setDraggableRef],
  );

  const isOver = isOverCheck(content.hierarchyId, over?.id);

  return (
    <ContentSection
      direction={'column'}
      highlighted={false}
      fullWidth={!isTopLevelGroup}
      noMargin={!isTopLevelGroup}
      semiTransparent={isDragging}
    >
      <Col gap="sm" fullWidth ref={setDroppableRef}>
        <Row gap="sm">
          {dragHandle}
          <TitleH2 marginBottom="none">Group {content.entityGroupId}</TitleH2>
        </Row>
        {canDropHere && isOver && <MenuCategoryEntityDropArea content={content} />}
      </Col>
      {children}
    </ContentSection>
  );
};

export default MenuItemContentElementEntityGroup;
