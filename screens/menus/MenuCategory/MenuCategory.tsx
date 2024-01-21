import React, { Suspense, useCallback, useEffect, useMemo, useState } from 'react';
import { useGetMenuItems } from '../../../api/menus/useGetMenuItems';
import ContentSection from '../../../components/ContentSection/ContentSection';
import { Col, Row } from '../../../components/Flex/Flex';
import { Button } from '../../../components/Button/Button';
import LoadingText from '../../../components/Loading/LoadingText';
import { TitleH2 } from '../../../components/Typography/Title';
import { TbMenuOrder, TbPlus } from 'react-icons/tb';
import Link from 'next/link';
import { Reorder } from 'framer-motion';
import ErrorText from '../../../components/ErrorText/ErrorText';
import {
  PbEntityGroupContent,
  PbEntityGroupDirection,
  PbEntityGroupStyle,
  PbViewEntity,
} from '../../../generated/api-types/data-contracts';
import MenuCategoryContent from './MenuCategoryContent';
import { DndContext, DragEndEvent, DragStartEvent, pointerWithin } from '@dnd-kit/core';
import { useDispatch, useSelector } from 'react-redux';
import { ReduxState } from '../../../store';
import { setDraggingData, setRearrangeMode } from './menuCategorySlice';
import { useGetMenuItemContent } from '../../../api/menus/useGetMenuItemContent';
import { queryClient } from '../../../pages/_app';
import { inferData } from 'react-query-kit';
import { DropType } from './menuCategoryUtils';
import { EntityGroupContentHierarchy } from '../../../hooks/useGetMenuItemContentHierarchy';

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
  const rearrangeMode = useSelector((state: ReduxState) => state.menuCategory.rearrangeMode);
  const [createPostMode, setCreatePostMode] = React.useState(false);
  const { data: menuItemsData = [] } = useGetMenuItems({ variables: menuId });

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

  const toggleRearrangeMode = useCallback(() => {
    dispatch(setRearrangeMode(!rearrangeMode));
  }, [dispatch, rearrangeMode]);

  const toggleCreatePostMode = useCallback(() => {
    setCreatePostMode((p) => !p);
  }, []);

  //====================================================================================================
  const [items, setItems] = useState<PbViewEntity[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<unknown>();

  useEffect(() => {
    setItems([]);
  }, []);

  const onReorder = useCallback(
    (x: PbViewEntity[]) => {
      if (rearrangeMode) {
        setItems(x);
      }
    },
    [rearrangeMode],
  );
  //====================================================================================================

  const handleDragStart = useCallback(
    (event: DragStartEvent) => {
      const { active } = event;
      dispatch(setDraggingData(active.data.current as EntityGroupContentHierarchy));
      console.log('START!', event.active.rect.current.initial, active);
    },
    [dispatch],
  );

  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      const { active: start, over: end } = event;
      dispatch(setDraggingData(undefined));
      console.log('START:', start, 'END:', end);

      const getMenuItemContentQueryKey = useGetMenuItemContent.getKey({
        menuId,
        menuItemId: menuItem?.id ?? 0,
      });

      if (end === null) return;

      const getParentId = (x: EntityGroupContentHierarchy, startOrEnd: 'start' | 'end'): number => {
        const hierarchyIdSplit = (
          startOrEnd === 'end' && x.type === 'GROUP'
            ? x.hierarchyId
            : x.hierarchyId.substring(0, x.hierarchyId.lastIndexOf('-'))
        ).split('g');

        return parseInt(hierarchyIdSplit[hierarchyIdSplit.length - 1]);
      };

      queryClient.setQueryData<inferData<typeof useGetMenuItemContent>>(
        getMenuItemContentQueryKey,
        (oldData) => {
          if (!oldData?.contents) return;
          console.log('++++++++++++++++++++++++ START +++++++++++++++++++++++++++++++');
          const s = start.data.current as EntityGroupContentHierarchy;
          const e = end.data.current as EntityGroupContentHierarchy & { dropType: DropType };

          const sParentId = getParentId(s, 'start');
          const eParentId = getParentId(e, 'end');

          if (`${e.hierarchyId}-`.startsWith(s.hierarchyId)) return;
          let ePosition = e.position + 1;
          if (sParentId === eParentId && s.position <= e.position) ePosition--;
          if (e.type === 'GROUP') ePosition = 1;

          console.log(
            'sHierarchyId',
            s.hierarchyId,
            'eHierarchyId',
            e.hierarchyId,
            'ePosition: ',
            ePosition,
          );

          /* This data will be provided from API response, this is just a mockup */
          const newGroupId = Date.now();
          const newGroup: PbEntityGroupContent = {
            id: newGroupId,
            entityGroupId: eParentId,
            position: ePosition,
            contentEntityId: undefined,
            contentEntityGroupId: newGroupId,
          };

          let contents: PbEntityGroupContent[] = oldData.contents.map((c) => {
            if (
              (s.type === 'ENTITY' && c.contentEntityId === s.entityId) ||
              (s.type === 'GROUP' && c.contentEntityGroupId === s.entityGroupId)
            ) {
              return {
                ...c,
                entityGroupId: e.dropType === DropType.NEW_GROUP ? newGroupId : eParentId,
                position: e.dropType === DropType.NEW_GROUP ? 1 : ePosition,
              };
            }

            let position = c.position!;
            if (sParentId === c.entityGroupId) {
              if (position > s.position) position--;
            }
            if (eParentId === c.entityGroupId) {
              if (position >= ePosition) position++;
            }
            return { ...c, position };
          });

          if (e.dropType === DropType.NEW_GROUP) {
            contents.push(newGroup);

            oldData.groups?.push({
              id: newGroupId,
              name: `Group ${newGroupId}`,
              description: '',
              style: PbEntityGroupStyle.ENTITY_GROUP_STYLE_FRAMED,
              direction: PbEntityGroupDirection.ENTITY_GROUP_DIRECTION_VERTICAL,
            });
          }

          contents = contents.sort((a, b) => {
            const diff = a.entityGroupId! - b.entityGroupId!;
            return diff !== 0 ? diff : a.position - b.position;
          });
          console.log('Contents', contents);

          console.log('+++++++++++++++++++++++++ END ++++++++++++++++++++++++++++++++');
          return { ...oldData, contents };
        },
      );
    },
    [dispatch, menuId, menuItem?.id],
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
          <ContentSection highlighted={descriptionPostId === displayPostId && !createPostMode}>
            <Row gap="md" fullWidth justifyContent="between">
              <Link href={linkPrefix}>
                <TitleH2>{menuItem.name}</TitleH2>
              </Link>

              {canEdit && (
                <Row gap="md">
                  <Button
                    color={createPostMode ? 'primaryFill' : 'primaryOutline'}
                    onClick={toggleCreatePostMode}
                  >
                    <TbPlus />
                    Create post
                  </Button>
                  <Button
                    color={rearrangeMode ? 'primaryFill' : 'primaryOutline'}
                    onClick={toggleRearrangeMode}
                  >
                    <TbMenuOrder />
                    Rearrange
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
            <MenuCategoryContent menuId={menuId} menuItemId={menuItem?.id ?? 0} />
          </DndContext>
          <Reorder.Group as="div" axis="y" values={items} onReorder={onReorder}>
            <Col loading={loading}>
              {items.map((viewEntity) => {
                return viewEntity.id;
              })}
            </Col>
          </Reorder.Group>
          <ErrorText error={error} />
        </Col>
      </Row>
    </>
  );
};

export default MenuCategory;
