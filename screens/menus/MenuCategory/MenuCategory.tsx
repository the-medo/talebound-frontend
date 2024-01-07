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
import { PbViewEntity } from '../../../generated/api-types/data-contracts';
import { useGetMenuItemContent } from '../../../api/menus/useGetMenuItemContent';

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
  const [rearrangeMode, setRearrangeMode] = React.useState(false);
  const [createPostMode, setCreatePostMode] = React.useState(false);
  const { data: menuItemsData = [] } = useGetMenuItems({ variables: menuId });

  const menuItem = useMemo(() => {
    return menuItemsData.find((item) => item.code === menuItemCode);
  }, [menuItemCode, menuItemsData]);

  const { data: menuItemContent } = useGetMenuItemContent({
    variables: { menuId, menuItemId: menuItem?.id ?? 0 },
  });

  console.log('MENU ITEM CONTENT: ', menuItemContent);

  const descriptionPostId = useMemo(() => {
    return menuItem?.descriptionPostId ?? 0;
  }, [menuItem?.descriptionPostId]);

  const displayPostId = useMemo(() => {
    if (postId === descriptionPostId || !postId) return descriptionPostId;
    return 0;
  }, [descriptionPostId, postId]);

  const createDescriptionPostHandler = useCallback(() => {}, []);

  const toggleRearrangeMode = useCallback(() => {
    setRearrangeMode((p) => !p);
  }, []);

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
