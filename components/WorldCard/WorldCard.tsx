import React from 'react';
import { PbModuleType, PbWorld } from '../../generated/api-types/data-contracts';
import ImageCard from '../ImageCard/ImageCard';
import { IMAGE_DEFAULT_WORLD_THUMBNAIL } from '../../utils/images/imageDefaultUrls';
import { useGetModuleTypeAvailableTags } from '../../api/tags/useGetModuleTypeAvailableTags';

interface WorldCardProps {
  world: PbWorld;
}

const WorldCard: React.FC<WorldCardProps> = ({ world }) => {
  const { data: availableTags = [] } = useGetModuleTypeAvailableTags({
    variables: PbModuleType.MODULE_TYPE_WORLD,
  });

  return (
    <ImageCard
      key={world.id}
      title={world.name ?? '- Unknown -'}
      basedOn={world.basedOn ?? ''}
      questCount={world.activityQuestCount ?? 0}
      activityCount={world.activityPostCount ?? 0}
      playModeCount={world.activityResourceCount ?? 0}
      imgSrc={world.imageThumbnail ?? IMAGE_DEFAULT_WORLD_THUMBNAIL}
      href={`/worlds/${world.id}/detail`}
      availableTags={availableTags}
      tags={world.tags ?? []}
    />
  );
};

export default WorldCard;
