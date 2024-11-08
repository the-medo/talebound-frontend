import React from 'react';
import { PbModuleType } from '../../generated/api-types/data-contracts';
import ImageCard, { ImageCardStatSection } from '../ImageCard/ImageCard';
import { IMAGE_DEFAULT_SYSTEM_THUMBNAIL } from '../../utils/images/imageDefaultUrls';
import { useGetModuleTypeAvailableTags } from '../../api/tags/useGetModuleTypeAvailableTags';
import { store } from '../../store';
import { imageSelectors } from '../../adapters/ImageAdapter';
import { useSystem } from '../../hooks/useSystem';

export const getSystemStatSections = (
  characterCount: number,
  questCount: number,
  activityCount: number,
): ImageCardStatSection[] => [
  { label: 'Characters', value: characterCount },
  { label: 'Quests', value: questCount },
  { label: 'Activity', value: activityCount },
];

interface SystemCardProps {
  systemId: number;
}

const SystemCard: React.FC<SystemCardProps> = ({ systemId }) => {
  const { system, module } = useSystem(systemId);
  const imageThumbnail = imageSelectors.selectById(store.getState(), module?.thumbnailImgId ?? 0);

  const { data: availableTags = [] } = useGetModuleTypeAvailableTags({
    variables: PbModuleType.MODULE_TYPE_SYSTEM,
  });

  if (!system) return null;

  return (
    <ImageCard
      key={system.id}
      title={system.name ?? '- Unknown -'}
      basedOn={system.basedOn ?? ''}
      statSections={[]}
      imgSrc={imageThumbnail?.url ?? IMAGE_DEFAULT_SYSTEM_THUMBNAIL}
      href={`/systems/${system.id}/detail`}
      availableTags={availableTags}
      tags={[]} //module.tags ??
    />
  );
};

export default SystemCard;
