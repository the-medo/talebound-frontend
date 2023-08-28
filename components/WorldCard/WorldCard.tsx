import React from 'react';
import { PbWorld } from '../../generated/api-types/data-contracts';
import ImageCard from '../ImageCard/ImageCard';

interface WorldCardProps {
  world: PbWorld;
}

const WorldCard: React.FC<WorldCardProps> = ({ world }) => {
  return (
    <ImageCard
      key={world.id}
      title={world.name ?? '- Unknown -'}
      basedOn={world.basedOn ?? ''}
      questCount={world.activityQuestCount ?? 0}
      activityCount={world.activityPostCount ?? 0}
      playModeCount={world.activityResourceCount ?? 0}
      imgSrc={world.imageThumbnail ?? ''}
      href={`/worlds/${world.id}/detail`}
      tags={world.tags ?? []}
    />
  );
};

export default WorldCard;
