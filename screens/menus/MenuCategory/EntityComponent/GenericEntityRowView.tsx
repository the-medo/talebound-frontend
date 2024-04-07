import React, { PropsWithChildren } from 'react';
import AvatarById from '../../../../components/AvatarById/AvatarById';
import { Row } from '../../../../components/Flex/Flex';
import { Text } from '../../../../components/Typography/Text';
import RemoveEntityContentButton, { RemoveButtonWrapper } from './RemoveEntityContentButton';
import { styled } from '../../../../styles/stitches.config';

export const Wrapper = styled(Row, {
  '&:hover': {
    [`${RemoveButtonWrapper}`]: {
      opacity: 1,
    },
  },
});

interface GenericEntityRowViewProps extends PropsWithChildren {
  contentId?: number;
  title?: string;
  avatarImageId?: number;
  editModeInfo?: string;
  editMode?: boolean;
}

const GenericEntityRowView: React.FC<GenericEntityRowViewProps> = ({
  contentId,
  children,
  title,
  avatarImageId,
  editModeInfo,
  editMode = false,
}) => {
  return (
    <Wrapper padding="xs" fullWidth gap="md" hoverHighlight>
      {editMode ? children : null}
      <Row gap="md" fullWidth justifyContent="between" alignSelf="between">
        <div style={{ width: '36px' }}>
          <AvatarById size="md" imageId={avatarImageId} />
        </div>
        <Row gap="md" fullWidth justifyContent="between" alignSelf="between">
          <Text css={{ flexBasis: '100px', flexGrow: 1 }}>{title}</Text>
          {editMode && editModeInfo && (
            <Text size="sm" i css={{ flexBasis: '100px' }}>
              {editModeInfo}
            </Text>
          )}
          {editMode && contentId && (
            <RemoveButtonWrapper>
              <RemoveEntityContentButton contentId={contentId} />
            </RemoveButtonWrapper>
          )}
        </Row>
      </Row>
    </Wrapper>
  );
};

export default GenericEntityRowView;
