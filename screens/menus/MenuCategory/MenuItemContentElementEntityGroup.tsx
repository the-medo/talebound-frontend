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
}

const MenuItemContentElementEntityGroup: React.FC<MenuItemContentElementEntityGroupProps> = ({
  content,
  entityGroupObject,
}) => {
  const rearrangeMode = useSelector((state: ReduxState) => state.menuCategory.rearrangeMode);
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
    data: content,
    disabled: !rearrangeMode,
  });

  const children = useMemo(
    () =>
      content.children.map((c) => (
        <MenuItemContentElement
          key={c.position}
          content={c}
          entityGroupObject={entityGroupObject}
        />
      )),
    [content.children, entityGroupObject /*isOver*/],
  );

  const dragHandle = useMemo(
    () =>
      rearrangeMode ? (
        <DragHandle ref={setDraggableRef} {...listeners} {...attributes}>
          <MdDragIndicator size={20} />
        </DragHandle>
      ) : null,
    [attributes, listeners, rearrangeMode, setDraggableRef],
  );

  return (
    <ContentSection direction={'column'} highlighted={false} fullWidth noMargin>
      <Row gap="sm">
        {dragHandle}
        <TitleH2 marginBottom="none">Group {content.entityGroupId}</TitleH2>
      </Row>
      {children}
    </ContentSection>
  );
};

export default MenuItemContentElementEntityGroup;
