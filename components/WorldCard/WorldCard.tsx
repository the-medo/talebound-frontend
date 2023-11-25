import React from 'react';
import { PbModuleType } from '../../generated/api-types/data-contracts';
import ImageCard from '../ImageCard/ImageCard';
import { IMAGE_DEFAULT_WORLD_THUMBNAIL } from '../../utils/images/imageDefaultUrls';
import { useGetModuleTypeAvailableTags } from '../../api/tags/useGetModuleTypeAvailableTags';
import { store } from '../../store';
import { imageSelectors } from '../../adapters/ImageAdapter';
import { useWorld } from '../../adapters/useWorld';

interface WorldCardProps {
  worldId: number;
}

const WorldCard: React.FC<WorldCardProps> = ({ worldId }) => {
  const { world, module } = useWorld(worldId);
  const imageThumbnail = imageSelectors.selectById(store.getState(), module?.thumbnailImgId ?? 0);

  const { data: availableTags = [] } = useGetModuleTypeAvailableTags({
    variables: PbModuleType.MODULE_TYPE_WORLD,
  });

  if (!world) return null;

  return (
    <ImageCard
      key={world.id}
      title={world.name ?? '- Unknown -'}
      basedOn={world.basedOn ?? ''}
      questCount={0}
      activityCount={0}
      playModeCount={0}
      imgSrc={imageThumbnail?.url ?? IMAGE_DEFAULT_WORLD_THUMBNAIL}
      href={`/worlds/${world.id}/detail`}
      availableTags={availableTags}
      tags={[]} //module.tags ??
    />
  );
};

export default WorldCard;
