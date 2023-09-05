import React, { useCallback } from 'react';
import ContentSection from '../../../components/ContentSection/ContentSection';
import { Reorder, useDragControls } from 'framer-motion';
import { PbMenuItemPost } from '../../../generated/api-types/data-contracts';
import { Row } from '../../../components/Flex/Flex';
import { DragHandle } from '../MenuAdministration/menuAdministrationComponents';
import { MdDragIndicator } from 'react-icons/md';

interface MenuItemPostThumbnailProps {
  data: PbMenuItemPost;
  highlighted: boolean;
  linkPrefix: string;
  currentIndex: number;
  rearrangeMode: boolean;
}

const MenuItemPostThumbnail: React.FC<MenuItemPostThumbnailProps> = ({
  data,
  highlighted,
  linkPrefix,
  currentIndex,
  rearrangeMode,
}) => {
  const { post } = data;
  const controls = useDragControls();
  const [dragging, setDragging] = React.useState(false);

  const onDragStart = useCallback(() => {
    setDragging(true);
  }, []);

  const onDragEnd = useCallback(() => {
    setDragging(false);
    // if (data.menuId && data.id) {
    //   updateMenuItem({
    //     menuId: data.menuId,
    //     menuItemId: data.id,
    //     body: {
    //       position: currentIndex,
    //     },
    //   });
    // }
  }, [currentIndex]);

  if (!post) return null;

  if (!rearrangeMode) {
    return (
      <ContentSection
        fullWidth
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
      <Row gap="md" fullWidth>
        {rearrangeMode && (
          <DragHandle dragging={dragging} onPointerDown={(e) => controls.start(e)}>
            <MdDragIndicator size={20} />
          </DragHandle>
        )}
        <ContentSection
          fullWidth
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
      </Row>
    </Reorder.Item>
  );
};

export default MenuItemPostThumbnail;
