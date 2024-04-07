import React, { PropsWithChildren } from 'react';
import AvatarById from '../../../../components/AvatarById/AvatarById';
import { Row } from '../../../../components/Flex/Flex';
import { Text } from '../../../../components/Typography/Text';
import RemoveEntityContentButton, { RemoveButtonWrapper } from './RemoveEntityContentButton';
import { styled } from '../../../../styles/stitches.config';

export const DragHandlerWrapper = styled('div', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'absolute',
  backgroundColor: '$white',
  border: '1px solid $primary',
  transform: 'scale(0.8)',
  top: -4,
  left: -4,
  width: '32px',
  height: '32px',
});

export const Wrapper = styled('div', {
  position: 'relative',

  '&:hover': {
    [`${RemoveButtonWrapper}`]: {
      opacity: 1,
    },
  },
});

interface GenericEntityAvatarViewProps extends PropsWithChildren {
  contentId?: number;
  title?: string;
  avatarImageId?: number;
  editModeInfo?: string;
  editMode?: boolean;
}

const GenericEntityAvatarView: React.FC<GenericEntityAvatarViewProps> = ({
  children,
  contentId,
  title,
  avatarImageId,
  editModeInfo,
  editMode = false,
}) => {
  return (
    <Wrapper>
      <AvatarById size="xl" imageId={avatarImageId} />
      {editMode && children ? <DragHandlerWrapper>{children}</DragHandlerWrapper> : null}
      {editMode && contentId && (
        <RemoveButtonWrapper version="top-right-corner">
          <RemoveEntityContentButton contentId={contentId} />
        </RemoveButtonWrapper>
      )}
    </Wrapper>
  );
};

export default GenericEntityAvatarView;
