import React from 'react';
import AvatarById from '../../../../components/AvatarById/AvatarById';
import { Row } from '../../../../components/Flex/Flex';
import { Text } from '../../../../components/Typography/Text';

interface GenericEntityRowProps {
  title?: string;
  avatarImageId?: number;
  editModeInfo?: string;
  editMode?: boolean;
}

const GenericEntityRow: React.FC<GenericEntityRowProps> = ({
  title,
  avatarImageId,
  editModeInfo,
  editMode = false,
}) => {
  return (
    <Row padding="xs" fullWidth gap="md" hoverHighlight>
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
      </Row>
    </Row>
  );
};

export default GenericEntityRow;
