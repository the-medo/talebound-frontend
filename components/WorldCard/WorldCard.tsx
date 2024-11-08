import React, { useMemo } from 'react';
import { PbModuleType } from '../../generated/api-types/data-contracts';
import ImageCard, { ImageCardStatSection } from '../ImageCard/ImageCard';
import { IMAGE_DEFAULT_WORLD_THUMBNAIL } from '../../utils/images/imageDefaultUrls';
import { useGetModuleTypeAvailableTags } from '../../api/tags/useGetModuleTypeAvailableTags';
import { store } from '../../store';
import { imageSelectors } from '../../adapters/ImageAdapter';
import { useWorld } from '../../hooks/useWorld';

export const getWorldStatSections = (
  playModeCount: number,
  questCount: number,
  activityCount: number,
): ImageCardStatSection[] => [
  { label: 'Play Modes', value: playModeCount },
  { label: 'Quests', value: questCount },
  { label: 'Activity', value: activityCount },
];

interface WorldCardProps {
  worldId: number;
}

const WorldCard: React.FC<WorldCardProps> = ({ worldId }) => {
  const { world, module } = useWorld(worldId);
  const imageThumbnail = imageSelectors.selectById(store.getState(), module?.thumbnailImgId ?? 0);

  const { data: availableTags = [] } = useGetModuleTypeAvailableTags({
    variables: PbModuleType.MODULE_TYPE_WORLD,
  });

  const statSetcions = useMemo(() => getWorldStatSections(0, 0, 0), []);

  if (!world) return null;

  return (
    <ImageCard
      key={world.id}
      title={world.name ?? '- Unknown -'}
      basedOn={world.basedOn ?? ''}
      statSections={statSetcions}
      imgSrc={imageThumbnail?.url ?? IMAGE_DEFAULT_WORLD_THUMBNAIL}
      href={`/worlds/${world.id}/detail`}
      availableTags={availableTags}
      tags={[]} //module.tags ??
    />
  );
};

export default WorldCard;
