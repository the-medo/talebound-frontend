import React from 'react';
import { PbEntityGroupDirection } from '../../../../generated/api-types/data-contracts';
import { usePost } from '../../../../hooks/usePost';
import AvatarById from '../../../../components/AvatarById/AvatarById';
import { Row } from '../../../../components/Flex/Flex';
import { useSelector } from 'react-redux';
import { ReduxState } from '../../../../store';
import GenericEntityRow from './GenericEntityRow';

interface EntityPostProps {
  postId: number;
  groupDirection: PbEntityGroupDirection;
}

const EntityPost: React.FC<EntityPostProps> = ({ postId, groupDirection }) => {
  const { post: postData, isFetching: isPendingPost } = usePost(postId);
  const postImageId = postData?.imageThumbnailId ?? 0;
  const editMode = useSelector((state: ReduxState) => state.menuCategory.editMode);

  if (isPendingPost) return null;

  if (groupDirection === PbEntityGroupDirection.ENTITY_GROUP_DIRECTION_VERTICAL) {
    return (
      <GenericEntityRow
        editMode={editMode}
        avatarImageId={postImageId}
        title={postData?.title}
        editModeInfo={`(Post #${postId})`}
      />
    );
  }

  return <AvatarById size="xl" imageId={postImageId} />;
};

export default EntityPost;
