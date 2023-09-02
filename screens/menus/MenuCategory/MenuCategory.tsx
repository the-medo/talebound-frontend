import React, { Suspense, useCallback, useMemo } from 'react';
import { useGetMenuItems } from '../../../api/menus/useGetMenuItems';
import { useMenuIdWorld } from '../../../hooks/useMenuIdWorld';
import ActionBoxWorld from '../../worlds/ActionBoxWorld';
import ContentSection from '../../../components/ContentSection/ContentSection';
import { Col, Row } from '../../../components/Flex/Flex';
import { Text } from '../../../components/Typography/Text';
import { useGetWorldById } from '../../../api/worlds/useGetWorldById';
import { TitleH2 } from '../../../components/Typography/Title';
import { Button } from '../../../components/Button/Button';
import { useCreateMenuItemPost } from '../../../api/menus/useCreateMenuItemPost';
import Loading from '../../../components/Loading/Loading';

const Post = React.lazy(() => import('../../../component-sections/Post/Post'));

interface MenuCategoryProps {
  menuItemCode: string;
  worldId: number;
}

const MenuCategory: React.FC<MenuCategoryProps> = ({ menuItemCode, worldId }) => {
  const menuId = useMenuIdWorld(worldId);
  const { data: worldData } = useGetWorldById({ variables: worldId });
  const { data: menuItemsData = [] } = useGetMenuItems({ variables: menuId, enabled: menuId > 0 });

  const createMenuItemPost = useCreateMenuItemPost();

  const menuItem = useMemo(() => {
    return menuItemsData.find((item) => item.code === menuItemCode);
  }, [menuItemCode, menuItemsData]);

  const descriptionPostId = useMemo(() => {
    return menuItem?.descriptionPostId ?? 0;
  }, [menuItem?.descriptionPostId]);

  const handleCreateDescriptionPost = useCallback(() => {
    createMenuItemPost.mutate({
      menuId: menuId,
      menuItemId: menuItem?.id ?? 0,
      body: {
        isMenuItemDescriptionPost: true,
      },
    });
  }, [createMenuItemPost, menuId, menuItem?.id]);

  if (!menuItem) {
    return <div>404 - not found!</div>;
  }

  return (
    <>
      <ActionBoxWorld worldId={worldId} activeButton="edit" />
      <Row gap="md" alignItems="start" wrap>
        <Col css={{ flexGrow: 5, flexBasis: '10rem' }}>
          <ContentSection
            flexWrap="wrap"
            direction="column"
            cornerImage={worldData?.imageThumbnail}
          >
            <TitleH2>{menuItem.name}</TitleH2>
            {descriptionPostId === 0 && (
              <Button onClick={handleCreateDescriptionPost}>Create description post</Button>
            )}
            {descriptionPostId > 0 && (
              <Suspense fallback={<Loading />}>
                <Post postId={descriptionPostId} postViewOnly={false} />
              </Suspense>
            )}
          </ContentSection>
        </Col>

        <Col css={{ flexGrow: 0, flexBasis: '600px' }}>
          <ContentSection
            flexWrap="wrap"
            direction="column"
            header="Quests"
            cornerImage={worldData?.imageThumbnail}
          >
            <Text>Currently no quests playing in this world</Text>
          </ContentSection>
        </Col>
      </Row>
      MenuCategory - {menuItemCode} {JSON.stringify(menuItemsData)}
    </>
  );
};

export default MenuCategory;
