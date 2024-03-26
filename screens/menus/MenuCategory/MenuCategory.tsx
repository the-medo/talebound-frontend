import React, { Suspense, useCallback, useEffect, useMemo } from 'react';
import { useGetMenuItems } from '../../../api/menus/useGetMenuItems';
import ContentSection from '../../../components/ContentSection/ContentSection';
import { Col, Row } from '../../../components/Flex/Flex';
import { Button } from '../../../components/Button/Button';
import LoadingText from '../../../components/Loading/LoadingText';
import { TitleH2 } from '../../../components/Typography/Title';
import Link from 'next/link';
import ErrorText from '../../../components/ErrorText/ErrorText';
import MenuCategoryContent from './MenuCategoryContent';
import { DndContext, DragEndEvent, DragStartEvent, pointerWithin } from '@dnd-kit/core';
import { useDispatch, useSelector } from 'react-redux';
import { ReduxState } from '../../../store';
import {
  setDraggingData,
  setMenuData,
  setEditMode,
  setNewEntityGroupData,
} from './menuCategorySlice';
import { DropType } from './menuCategoryUtils';
import { EntityGroupContentHierarchy } from '../../../hooks/useGetMenuItemContentHierarchy';
import { MdEdit } from 'react-icons/md';
import { useUpdateEntityGroupContent } from '../../../api/entities/useUpdateEntityGroupContent';

const Post = React.lazy(() => import('../../../component-sections/Post/Post'));

interface MenuCategoryProps {
  menuItemCode: string;
  menuId: number;
  postId?: number;
  linkPrefix: string;
  worldImageThumbnail?: string;
  canEdit?: boolean;
}

const MenuCategory: React.FC<MenuCategoryProps> = ({
  menuItemCode,
  menuId,
  postId,
  linkPrefix,
  worldImageThumbnail,
  canEdit = false,
}) => {
  const dispatch = useDispatch();
  const editMode = useSelector((state: ReduxState) => state.menuCategory.editMode);
  const { data: menuItemsData = [] } = useGetMenuItems({ variables: menuId });

  const {
    mutate: updateEntityGroupContent,
    isPending: isPendingUpdateGroupContent,
    // isError: isErrorUpdate,
    error: errorUpdateGroupContent,
  } = useUpdateEntityGroupContent();

  const menuItem = useMemo(() => {
    return menuItemsData.find((item) => item.code === menuItemCode);
  }, [menuItemCode, menuItemsData]);

  const descriptionPostId = useMemo(() => {
    return menuItem?.descriptionPostId ?? 0;
  }, [menuItem?.descriptionPostId]);

  const displayPostId = useMemo(() => {
    if (postId === descriptionPostId || !postId) return descriptionPostId;
    return 0;
  }, [descriptionPostId, postId]);

  const createDescriptionPostHandler = useCallback(() => {}, []);

  const toggleEditMode = useCallback(() => {
    dispatch(setEditMode(!editMode));
  }, [dispatch, editMode]);

  //====================================================================================================
  const error = errorUpdateGroupContent;
  //====================================================================================================

  const handleDragStart = useCallback(
    (event: DragStartEvent) => {
      const { active } = event;
      dispatch(setDraggingData(active.data.current as EntityGroupContentHierarchy));
      console.log('START!', event.active.rect.current.initial, active);
    },
    [dispatch],
  );

  useEffect(() => {
    dispatch(
      setMenuData({
        menuId: menuId,
        menuItemId: menuItem?.id ?? 0,
      }),
    );
  }, [dispatch, menuId, menuItem?.id]);

  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      const { active: start, over: end } = event;
      dispatch(setDraggingData(undefined));
      console.log('START:', start, 'END:', end);

      if (end === null) return;

      const getParentId = (x: EntityGroupContentHierarchy, startOrEnd: 'start' | 'end'): number => {
        const hierarchyIdSplit = (
          startOrEnd === 'end' && x.type === 'GROUP'
            ? x.hierarchyId
            : x.hierarchyId.substring(0, x.hierarchyId.lastIndexOf('-'))
        ).split('g');

        return parseInt(hierarchyIdSplit[hierarchyIdSplit.length - 1]);
      };

      const s = start.data.current as EntityGroupContentHierarchy;
      const e = end.data.current as EntityGroupContentHierarchy & { dropType: DropType };

      const sParentId = getParentId(s, 'start');
      const eParentId = getParentId(e, 'end');

      let ePosition = e.type === 'GROUP' ? 1 : e.position + 1;
      if (sParentId === eParentId && e.type !== 'GROUP' && s.position <= e.position) ePosition--;

      if (e.dropType === DropType.NEW_GROUP) {
        dispatch(
          setNewEntityGroupData({
            // entityContentId: oldData.contents.find()
            contentId: s.id,
            startEntityGroupId: sParentId,
            startPosition: s.position,
            targetEntityGroupId: eParentId,
            targetPosition: ePosition,
          }),
        );
        return;
      } else {
        updateEntityGroupContent({
          menuItemId: menuItem?.id ?? 0,
          entityGroupId: sParentId,
          contentId: s.id,
          body: {
            newEntityGroupId: eParentId,
            position: ePosition,
          },
        });
      }
    },
    [dispatch, menuItem?.id, updateEntityGroupContent],
  );

  if (!menuItem) {
    return <div>404 - not found!</div>;
  }

  return (
    <>
      <Row gap="md" alignItems="start" wrap>
        <Col css={{ flexGrow: 5, flexBasis: '10rem' }}>
          {canEdit && descriptionPostId === 0 && (
            <ContentSection flexWrap="wrap" direction="column" cornerImage={worldImageThumbnail}>
              <Button onClick={createDescriptionPostHandler}>Create description post</Button>
            </ContentSection>
          )}
          {displayPostId === 0 && <TitleH2>404 - not found</TitleH2>}
          {displayPostId > 0 && (
            <Suspense fallback={<LoadingText />}>
              <Post
                customTitle={descriptionPostId === displayPostId ? menuItem.name : undefined}
                postId={displayPostId}
                canEdit={canEdit}
              />
            </Suspense>
          )}
        </Col>

        <Col css={{ flexGrow: 0, flexBasis: '600px' }}>
          <ContentSection highlighted={descriptionPostId === displayPostId}>
            <Row gap="md" fullWidth justifyContent="between">
              <Link href={linkPrefix}>
                <TitleH2>{menuItem.name}</TitleH2>
              </Link>

              {canEdit && (
                <Row gap="md">
                  <Button
                    color={editMode ? 'primaryFill' : 'primaryOutline'}
                    onClick={toggleEditMode}
                  >
                    <MdEdit />
                    Edit mode
                  </Button>
                </Row>
              )}
            </Row>
          </ContentSection>
          <DndContext
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            collisionDetection={pointerWithin}
          >
            <MenuCategoryContent
              menuItemId={menuItem?.id ?? 0}
              isPending={isPendingUpdateGroupContent}
            />
          </DndContext>
          <ErrorText error={error} />
        </Col>
      </Row>
    </>
  );
};

export default MenuCategory;
