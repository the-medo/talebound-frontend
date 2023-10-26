import React, { Suspense, useCallback, useEffect, useMemo, useState } from 'react';
import { useGetMenuItems } from '../../../api/menus/useGetMenuItems';
import ContentSection from '../../../components/ContentSection/ContentSection';
import { Col, Row } from '../../../components/Flex/Flex';
import { Button } from '../../../components/Button/Button';
import { useCreateMenuItemPost } from '../../../api/menus/useCreateMenuItemPost';
import { useGetMenuItemPosts } from '../../../api/menus/useGetMenuItemPosts';
import LoadingText from '../../../components/Loading/LoadingText';
import { UpdatePostCacheHelper } from '../../../api/posts/useUpdatePost';
import { TitleH2 } from '../../../components/Typography/Title';
import { TbMenuOrder, TbPlus } from 'react-icons/tb';
import Link from 'next/link';
import { Reorder } from 'framer-motion';
import { PbMenuItemPost } from '../../../generated/api-types/data-contracts';
import MenuItemPostThumbnail from './MenuItemPostThumbnail';
import ErrorText from '../../../components/ErrorText/ErrorText';
import PostForm from '../../../component-sections/Post/PostForm';

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
  const createMenuItemPost = useCreateMenuItemPost();
  const { data: menuItemsData = [] } = useGetMenuItems({ variables: menuId });

  const menuItem = useMemo(() => {
    return menuItemsData.find((item) => item.code === menuItemCode);
  }, [menuItemCode, menuItemsData]);

  const menuItemId = menuItem?.id ?? 0;

  const { data: menuItemPostsData = [], isFetching: isFetchingMenuItemPosts } = useGetMenuItemPosts(
    {
      variables: {
        menuId,
        menuItemId,
      },
    },
  );

  const menuItemPost = useMemo(() => {
    return menuItemPostsData.find((item) => item.postId === postId);
  }, [postId, menuItemPostsData]);

  const descriptionPostId = useMemo(() => {
    return menuItem?.descriptionPostId ?? 0;
  }, [menuItem?.descriptionPostId]);

  const displayPostId = useMemo(() => {
    if (postId === descriptionPostId || !postId) return descriptionPostId;
    return menuItemPost?.postId ?? 0;
  }, [descriptionPostId, menuItemPost?.postId, postId]);

  const createDescriptionPostHandler = useCallback(() => {
    createMenuItemPost.mutate({
      menuId: menuId,
      menuItemId: menuItemId,
      body: {
        isMenuItemDescriptionPost: true,
      },
    });
  }, [createMenuItemPost, menuId, menuItemId]);

  const toggleRearrangeMode = useCallback(() => {
    setRearrangeMode((p) => !p);
  }, []);

  const toggleCreatePostMode = useCallback(() => {
    setCreatePostMode((p) => !p);
  }, []);

  const postCreatedCallback = useCallback(() => {
    setCreatePostMode(false);
  }, []);

  const cacheHelper: UpdatePostCacheHelper = useMemo(
    () => ({
      menuId,
      menuItemId,
    }),
    [menuId, menuItemId],
  );

  //====================================================================================================
  const [items, setItems] = useState<PbMenuItemPost[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<unknown>();

  useEffect(() => {
    setItems(menuItemPostsData);
  }, [menuItemPostsData]);

  const onReorder = useCallback(
    (x: PbMenuItemPost[]) => {
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
                cacheHelper={cacheHelper}
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
              {isFetchingMenuItemPosts && <LoadingText />}

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
            {createPostMode && (
              <PostForm
                menuId={menuId}
                menuItemId={menuItemId}
                position={menuItemPostsData.length + 1}
                onFinishCallback={postCreatedCallback}
              />
            )}
          </ContentSection>
          <Reorder.Group as="div" axis="y" values={items} onReorder={onReorder}>
            <Col loading={loading}>
              {items.map((menuItemPost, i) => {
                const { post } = menuItemPost;
                if (!post) return null;
                return (
                  <MenuItemPostThumbnail
                    key={post.id}
                    menuId={menuId}
                    data={menuItemPost}
                    highlighted={post.id === displayPostId}
                    linkPrefix={linkPrefix}
                    currentIndex={i + 1}
                    rearrangeMode={rearrangeMode}
                    setLoading={setLoading}
                    setError={setError}
                  />
                );
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
