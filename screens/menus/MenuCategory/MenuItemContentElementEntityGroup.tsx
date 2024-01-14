import React, { useMemo } from 'react';
import {
  EntityGroupContentHierarchyEntityGroup,
  EntityGroupObject,
} from '../../../api/menus/useGetMenuItemContent';
import ContentSection from '../../../components/ContentSection/ContentSection';
import MenuItemContentElement from './MenuItemContentElement';
import { useSelector } from 'react-redux';
import { ReduxState } from '../../../store';
import { useDraggable } from '@dnd-kit/core';
import { DragHandle } from '../MenuAdministration/menuAdministrationComponents';
import { MdDragIndicator } from 'react-icons/md';
import { TitleH2 } from '../../../components/Typography/Title';
import { Row } from '../../../components/Flex/Flex';

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
  // const { isOver, setNodeRef: setDroppableRef } = useDroppable({
  //   id: `entity-group-droppable-${content.entityGroupId}`,
  // });
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

  return (
    <ContentSection
      direction={'column'}
      highlighted={false}
      fullWidth={!isTopLevelGroup}
      noMargin={!isTopLevelGroup}
      semiTransparent={isDragging}
    >
      <Row gap="sm">
        {dragHandle}
        <TitleH2 marginBottom="none">Group {content.entityGroupId}</TitleH2>
      </Row>
      {children}
    </ContentSection>
  );
};

export default MenuItemContentElementEntityGroup;
