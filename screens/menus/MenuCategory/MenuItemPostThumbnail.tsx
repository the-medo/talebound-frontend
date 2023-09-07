import React, { useCallback, useEffect } from 'react';
import ContentSection from '../../../components/ContentSection/ContentSection';
import { Reorder, useDragControls } from 'framer-motion';
import { PbMenuItemPost } from '../../../generated/api-types/data-contracts';
import { Row } from '../../../components/Flex/Flex';
import { DragHandle } from '../MenuAdministration/menuAdministrationComponents';
import { MdDragIndicator } from 'react-icons/md';
import { useUpdateMenuItemPost } from '../../../api/menus/useUpdateMenuItemPost';

interface MenuItemPostThumbnailProps {
  data: PbMenuItemPost;
  menuId: number;
  highlighted: boolean;
  linkPrefix: string;
  currentIndex: number;
  rearrangeMode: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setError: React.Dispatch<unknown>;
}

const MenuItemPostThumbnail: React.FC<MenuItemPostThumbnailProps> = ({
  data,
  menuId,
  highlighted,
  linkPrefix,
  currentIndex,
  rearrangeMode,
  setLoading,
  setError,
}) => {
  const { post } = data;
  const controls = useDragControls();
  const [dragging, setDragging] = React.useState(false);

  const onSettled = useCallback(() => {
    setLoading(false);
    setError(undefined);
  }, [setLoading, setError]);

  const {
    mutate: updateMenuItemPost,
    isLoading: isLoadingUpdate,
    isError: isErrorUpdate,
    error: errorUpdate,
  } = useUpdateMenuItemPost({
    onSettled,
  });

  useEffect(() => {
    if (errorUpdate) {
      setError(errorUpdate);
    }
  }, [errorUpdate, setError]);

  useEffect(() => {
    if (isLoadingUpdate) {
      setLoading(true);
    }
  }, [setLoading, isLoadingUpdate]);

  const onDragStart = useCallback(() => {
    setDragging(true);
  }, []);

  const onDragEnd = useCallback(() => {
    setDragging(false);
    if (menuId && data.menuItemId && data.postId) {
      updateMenuItemPost({
        menuId,
        menuItemId: data.menuItemId,
        postId: data.postId,
        body: {
          position: currentIndex,
        },
      });
    }
  }, [menuId, data.menuItemId, data.postId, updateMenuItemPost, currentIndex]);

  if (!post) return null;

  if (!rearrangeMode) {
    return (
      <ContentSection
        key={post.id}
        highlighted={highlighted}
        flexWrap="wrap"
        direction="column"
        cornerImage={post.imageThumbnailUrl}
        header={post.title}
        href={`${linkPrefix}/${post.id}`}
      >
        {post.description}
      </ContentSection>
    );
  }

  return (
    <Reorder.Item
      as="div"
      value={data}
      dragListener={false}
      dragControls={controls}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
    >
      <Row gap="md" fullWidth noSelect={rearrangeMode}>
        {rearrangeMode && (
          <DragHandle dragging={dragging} onPointerDown={(e) => controls.start(e)}>
            <MdDragIndicator size={20} />
          </DragHandle>
        )}
        <ContentSection
          fullWidth
          key={post.id}
          highlighted={highlighted}
          error={isErrorUpdate}
          flexWrap="wrap"
          direction="column"
          cornerImage={post.imageThumbnailUrl}
          header={post.title}
          href={`${linkPrefix}/${post.id}`}
        >
          {post.description}
        </ContentSection>
      </Row>
    </Reorder.Item>
  );
};

export default MenuItemPostThumbnail;
