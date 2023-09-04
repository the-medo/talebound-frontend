import React, { Suspense, useCallback, useMemo } from 'react';
import { useGetMenuItems } from '../../../api/menus/useGetMenuItems';
import ContentSection from '../../../components/ContentSection/ContentSection';
import { Col, Row } from '../../../components/Flex/Flex';
import { Button } from '../../../components/Button/Button';
import { useCreateMenuItemPost } from '../../../api/menus/useCreateMenuItemPost';
import { useGetMenuItemPosts } from '../../../api/menus/useGetMenuItemPosts';
import LoadingText from '../../../components/Loading/LoadingText';

const Post = React.lazy(() => import('../../../component-sections/Post/Post'));

interface MenuCategoryProps {
  menuItemCode: string;
  menuId: number;
  postId?: number;
  linkPrefix: string;
  worldImageThumbnail?: string;
}

const MenuCategory: React.FC<MenuCategoryProps> = ({
  menuItemCode,
  menuId,
  postId,
  linkPrefix,
  worldImageThumbnail,
}) => {
  const { data: menuItemsData = [] } = useGetMenuItems({ variables: menuId, enabled: menuId > 0 });

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
      enabled: menuItemId > 0,
    },
  );

  const createMenuItemPost = useCreateMenuItemPost();

  const descriptionPostId = useMemo(() => {
    return menuItem?.descriptionPostId ?? 0;
  }, [menuItem?.descriptionPostId]);

  const displayPostId = postId ?? descriptionPostId;

  const createDescriptionPostHandler = useCallback(() => {
    createMenuItemPost.mutate({
      menuId: menuId,
      menuItemId: menuItemId,
      body: {
        isMenuItemDescriptionPost: true,
      },
    });
  }, [createMenuItemPost, menuId, menuItemId]);

  const createPostHandler = useCallback(() => {
    createMenuItemPost.mutate({
      menuId: menuId,
      menuItemId: menuItemId,
      body: {
        position: menuItemPostsData.length + 1,
      },
    });
  }, [createMenuItemPost, menuId, menuItemId, menuItemPostsData.length]);

  const canEdit = true;

  if (!menuItem) {
    return <div>404 - not found!</div>;
  }

  return (
    <>
      <Row gap="md" alignItems="start" wrap>
        <Col css={{ flexGrow: 5, flexBasis: '10rem' }}>
          {displayPostId === 0 && (
            <ContentSection flexWrap="wrap" direction="column" cornerImage={worldImageThumbnail}>
              <Button onClick={createDescriptionPostHandler}>Create description post</Button>
            </ContentSection>
          )}
          {displayPostId > 0 && (
            <Suspense fallback={<LoadingText />}>
              <Post customTitle={menuItem.name} postId={displayPostId} canEdit={canEdit} />
            </Suspense>
          )}
        </Col>

        <Col css={{ flexGrow: 0, flexBasis: '600px' }}>
          {isFetchingMenuItemPosts && <LoadingText />}
          {menuItemPostsData.map((menuItemPost) => {
            const { post } = menuItemPost;
            if (!post) return null;
            return (
              <ContentSection
                key={post.id}
                flexWrap="wrap"
                direction="column"
                cornerImage={post.imageThumbnailUrl}
                header={post.title}
                href={`/${linkPrefix}/${post.id}`}
              >
                {post.description}
              </ContentSection>
            );
          })}
          <ContentSection flexWrap="wrap" direction="column">
            <Button onClick={createPostHandler}>New post</Button>
          </ContentSection>
        </Col>
      </Row>
    </>
  );
};

export default MenuCategory;
