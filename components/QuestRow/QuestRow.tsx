import React, { useMemo } from 'react';
import { PbModuleType } from '../../generated/api-types/data-contracts';
import ImageCard, { ImageCardStatSection } from '../ImageCard/ImageCard';
import { IMAGE_DEFAULT_QUEST_THUMBNAIL } from '../../utils/images/imageDefaultUrls';
import { useGetModuleTypeAvailableTags } from '../../api/tags/useGetModuleTypeAvailableTags';
import { store } from '../../store';
import { imageSelectors } from '../../adapters/ImageAdapter';
import { useQuest } from '../../hooks/useQuest';
import { Col, Row } from '../Flex/Flex';
import QuestStatusButton from '../QuestStatusButton/QuestStatusButton';
import QuestCanJoinButton from '../QuestCanJoinButton/QuestCanJoinButton';
import Image from '../Image/Image';
import { ImageVariant } from '../../utils/images/imageUtils';
import { TitleH3 } from '../Typography/Title';
import { Text } from '../Typography/Text';
import TagRow from '../TagRow/TagRow';

interface QuestRowProps {
  questId: number;
}

const QuestRow: React.FC<QuestRowProps> = ({ questId }) => {
  const { quest, module } = useQuest(questId);
  const imageThumbnail = imageSelectors.selectById(store.getState(), module?.thumbnailImgId ?? 0);

  const { data: availableTags = [] } = useGetModuleTypeAvailableTags({
    variables: PbModuleType.MODULE_TYPE_QUEST,
  });

  const statusBar = useMemo(() => {
    return (
      <Row gap="sm">
        {quest?.status && <QuestStatusButton questStatus={quest.status} />}
        <QuestCanJoinButton canJoin={!!quest?.canJoin} />
      </Row>
    );
  }, [quest?.canJoin, quest?.status]);

  if (!quest) return null;

  return (
    <Row fullWidth gap="md" alignItems="start" borderBottom fullHeight>
      {imageThumbnail && (
        <Image image={imageThumbnail} onClick={() => {}} variant={ImageVariant['300x200']} />
      )}
      <Col gap="sm" fullWidth alignSelf="stretch" justifyContent="between" paddingBottom="sm">
        <Col gap="sm" fullWidth>
          <Row fullWidth gap="sm" justifyContent="between">
            <TitleH3>{quest.name}</TitleH3>
            {statusBar}
          </Row>
          <Text>{quest.shortDescription}</Text>
        </Col>
        <Row fullWidth gap="sm">
          <Text b>Tags:</Text>
          <TagRow
            availableTags={availableTags}
            tagIds={module?.tags ?? []}
            width={600}
            colorNonactive={'primaryOutline'}
          />
        </Row>
      </Col>
    </Row>
  );
};

export default QuestRow;
