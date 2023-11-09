import React from 'react';
import AspectDiamond from '../ControlPanel/AspectDiamond';
import { worldSelectors } from '../../../adapters/WorldAdapter';
import { store } from '../../../store';

interface WorldAspectDiamondProps {
  worldId: number;
  totalCount: number;
  index: number;
}

const WorldAspectDiamond: React.FC<WorldAspectDiamondProps> = ({ worldId, totalCount, index }) => {
  const world = worldSelectors.selectById(store.getState(), worldId);

  if (!world) {
    return null;
  }

  return (
    <AspectDiamond
      key={world.id}
      imgIdx={0}
      totalCount={totalCount}
      avatarUrl={world.avatarImgUrl}
      linkUrl={`/worlds/${world.id}/detail`}
      name={world.name}
      entityId={world.id}
      index={index}
      x="right"
      y="top"
    />
  );
};

export default WorldAspectDiamond;
