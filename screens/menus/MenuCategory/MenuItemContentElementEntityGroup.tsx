import React, { useCallback, useMemo } from 'react';
import ContentSection from '../../../components/ContentSection/ContentSection';
import MenuItemContentElement from './MenuItemContentElement';
import { useDispatch, useSelector } from 'react-redux';
import { ReduxState } from '../../../store';
import { useDraggable, useDroppable } from '@dnd-kit/core';
import { DragHandle } from '../MenuAdministration/menuAdministrationComponents';
import { MdClose, MdDragIndicator, MdEdit, MdPlaylistRemove } from 'react-icons/md';
import { TitleH2 } from '../../../components/Typography/Title';
import { Col, Flex, Row } from '../../../components/Flex/Flex';
import MenuCategoryEntityDropArea from './MenuCategoryEntityDropArea';
import { DropType, isOverCheck } from './menuCategoryUtils';
import {
  EntityGroupContentHierarchyEntityGroup,
  EntityGroupObject,
} from '../../../hooks/useGetMenuItemContentHierarchy';
import { Button } from '../../../components/Button/Button';
import {
  sortGetMenuItemContent,
  useGetMenuItemContent,
} from '../../../api/menus/useGetMenuItemContent';
import { queryClient } from '../../../pages/_app';
import { inferData } from 'react-query-kit';
import {
  PbEntityGroupContent,
  PbEntityGroupDirection,
  PbEntityGroupStyle,
} from '../../../generated/api-types/data-contracts';
import { setEditEntityGroupId } from './menuCategorySlice';

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
  const dispatch = useDispatch();
  const editMode = useSelector((state: ReduxState) => state.menuCategory.editMode);
  const menuId = useSelector((state: ReduxState) => state.menuCategory.menuId);
  const menuItemId = useSelector((state: ReduxState) => state.menuCategory.menuItemId);

  const {
    attributes,
    listeners,
    setNodeRef: setDraggableRef,
    isDragging,
    active,
  } = useDraggable({
    id: content.hierarchyId,
    data: content,
    disabled: !editMode,
  });

  const canDropHere =
    !content.hierarchyId.startsWith(`${active?.id}-`) && content.hierarchyId !== active?.id;

  const { over, setNodeRef: setDroppableRef } = useDroppable({
    id: content.hierarchyId + '-drop_move',
    disabled: !canDropHere,
    data: { ...content, dropType: DropType.MOVE },
  });

  const children = useMemo(
    () => (
      <Flex
        fullWidth
        gap="sm"
        direction={
          editMode ||
          entityGroupObject[content.entityGroupId]?.direction ===
            PbEntityGroupDirection.ENTITY_GROUP_DIRECTION_VERTICAL
            ? 'column'
            : 'row'
        }
      >
        {content.children.map((c) => (
          <MenuItemContentElement
            key={c.position}
            showHandles={showHandles}
            content={c}
            entityGroupObject={entityGroupObject}
          />
        ))}
      </Flex>
    ),
    [editMode, entityGroupObject, content.entityGroupId, content.children, showHandles],
  );

  const dragHandle = useMemo(
    () =>
      editMode && !isTopLevelGroup && showHandles ? (
        <DragHandle ref={setDraggableRef} {...listeners} {...attributes}>
          <MdDragIndicator size={20} />
        </DragHandle>
      ) : null,
    [isTopLevelGroup, showHandles, attributes, listeners, editMode, setDraggableRef],
  );

  const isOver = isOverCheck(content.hierarchyId, over?.id);

  const handleRemoveGroup = useCallback(
    (deleteType: 'deleteChildren' | 'keepChildren') => {
      const getMenuItemContentQueryKey = useGetMenuItemContent.getKey({
        menuItemId,
      });

      queryClient.setQueryData<inferData<typeof useGetMenuItemContent>>(
        getMenuItemContentQueryKey,
        (oldData) => {
          if (!oldData?.contents) return;

          const foundEntityGroup = oldData.contents.find(
            (e) => e.contentEntityGroupId === content.entityGroupId,
          );
          console.log('FOUND ENTITY GROUP: ', foundEntityGroup);
          if (!foundEntityGroup) return;

          const groupChildren = oldData.contents.filter(
            (c) => c.entityGroupId === content.entityGroupId,
          );

          const childrenToDeleteIds: number[] = [];
          if (deleteType === 'deleteChildren') {
            const queue = [...groupChildren];
            while (queue.length > 0) {
              const element = queue.pop();
              if (element?.id) {
                childrenToDeleteIds.push(element.id);
                if (element.contentEntityGroupId) {
                  queue.push(
                    ...oldData.contents.filter(
                      (c) => c.entityGroupId === element.contentEntityGroupId,
                    ),
                  );
                }
              }
            }
          }

          const contents: PbEntityGroupContent[] = [];

          oldData.contents.forEach((c) => {
            if (deleteType === 'deleteChildren' && childrenToDeleteIds.includes(c.id ?? 0)) return;

            const position = c.position ?? 0;
            if (c.entityGroupId === content.entityGroupId) {
              contents.push({
                ...c,
                entityGroupId: foundEntityGroup.entityGroupId,
                position: position - 1 + content.position,
              });
            } else if (
              position > content.position &&
              foundEntityGroup.entityGroupId === c.entityGroupId
            ) {
              contents.push({
                ...c,
                position:
                  position - 1 + (deleteType === 'deleteChildren' ? 0 : groupChildren.length),
              });
            } else if (content.entityGroupId !== c.contentEntityGroupId) {
              contents.push(c);
            }
          });

          console.log('NEW CONTENTS: ', contents);

          return { ...oldData, contents: sortGetMenuItemContent(contents) };
        },
      );
    },
    [content.entityGroupId, content.position, menuItemId],
  );

  const handleEditGroup = useCallback(
    () => dispatch(setEditEntityGroupId(content.entityGroupId)),
    [content.entityGroupId, dispatch],
  );

  const handleRemoveGroupButKeepEntities = useCallback(
    () => handleRemoveGroup('keepChildren'),
    [handleRemoveGroup],
  );

  const handleRemoveGroupAndItsEntities = useCallback(
    () => handleRemoveGroup('deleteChildren'),
    [handleRemoveGroup],
  );

  return (
    <ContentSection
      direction={'column'}
      highlighted={false}
      fullWidth={!isTopLevelGroup}
      noMargin={!isTopLevelGroup}
      semiTransparent={isDragging}
      hasShadow={
        editMode ||
        entityGroupObject[content.entityGroupId]?.style ===
          PbEntityGroupStyle.ENTITY_GROUP_STYLE_FRAMED
      }
    >
      <Col gap="sm" fullWidth ref={setDroppableRef}>
        <Row justifyContent="between" semiTransparent={isDragging}>
          <Row gap="sm">
            {dragHandle}
            <TitleH2 marginBottom="none">
              {entityGroupObject[content.entityGroupId]?.name ?? `Group ${content.entityGroupId}`}
            </TitleH2>
          </Row>
          {editMode && (
            <Row gap="sm">
              <Button
                icon
                onClick={handleEditGroup}
                size="sm"
                color="primaryOutline"
                title="Edit group"
              >
                <MdEdit />
              </Button>
              {!isTopLevelGroup && (
                <>
                  <Button
                    icon
                    onClick={handleRemoveGroupButKeepEntities}
                    size="sm"
                    color="dangerOutline"
                    title="Remove with entities"
                  >
                    <MdPlaylistRemove />
                  </Button>
                  <Button
                    icon
                    onClick={handleRemoveGroupAndItsEntities}
                    size="sm"
                    color="dangerOutline"
                    title="Remove only group, entities will go to parent"
                  >
                    <MdClose />
                  </Button>
                </>
              )}
            </Row>
          )}
        </Row>
        {canDropHere && isOver && <MenuCategoryEntityDropArea content={content} />}
      </Col>
      {children}
    </ContentSection>
  );
};

export default MenuItemContentElementEntityGroup;
