import React from 'react';
import { PbEntityGroupDirection } from '../../../../generated/api-types/data-contracts';
import { usePost } from '../../../../hooks/usePost';
import AvatarById from '../../../../components/AvatarById/AvatarById';
import { Row } from '../../../../components/Flex/Flex';

interface EntityPostProps {
  postId: number;
  groupDirection: PbEntityGroupDirection;
}

const EntityPost: React.FC<EntityPostProps> = ({ postId, groupDirection }) => {
  const { post: postData, isFetching: isPendingPost } = usePost(postId);
  const postImageId = postData?.imageThumbnailId ?? 0;

  if (isPendingPost) return null;

  if (groupDirection === PbEntityGroupDirection.ENTITY_GROUP_DIRECTION_VERTICAL) {
    return (
      <Row padding="xs" gap="md" hoverHighlight>
        <AvatarById size="md" imageId={postImageId} />
        <b>{postData?.title}</b>
      </Row>
    );
  }

  return <AvatarById size="xl" imageId={postImageId} />;
};

export default EntityPost;
