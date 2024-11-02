import React from 'react';
import { PbModuleType } from '../../generated/api-types/data-contracts';
import ImageCard from '../ImageCard/ImageCard';
import { IMAGE_DEFAULT_SYSTEM_THUMBNAIL } from '../../utils/images/imageDefaultUrls';
import { useGetModuleTypeAvailableTags } from '../../api/tags/useGetModuleTypeAvailableTags';
import { store } from '../../store';
import { imageSelectors } from '../../adapters/ImageAdapter';
import { useSystem } from '../../hooks/useSystem';

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
      questCount={0}
      activityCount={0}
      playModeCount={0}
      imgSrc={imageThumbnail?.url ?? IMAGE_DEFAULT_SYSTEM_THUMBNAIL}
      href={`/systems/${system.id}/detail`}
      availableTags={availableTags}
      tags={[]} //module.tags ??
    />
  );
};

export default SystemCard;
