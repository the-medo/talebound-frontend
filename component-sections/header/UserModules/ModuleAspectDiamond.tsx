import React from 'react';
import AspectDiamond from '../ControlPanel/AspectDiamond';
import { store } from '../../../store';
import { imageSelectors } from '../../../adapters/ImageAdapter';
import { useModuleExtended } from '../../../hooks/useModuleExtended';

interface ModuleAspectDiamondProps {
  moduleId: number;
  totalCount: number;
  index: number;
}

const ModuleAspectDiamond: React.FC<ModuleAspectDiamondProps> = ({
  moduleId,
  totalCount,
  index,
}) => {
  const moduleExtended = useModuleExtended(moduleId);

  const avatar = imageSelectors.selectById(
    store.getState(),
    moduleExtended.module?.avatarImgId ?? 0,
  );

  if (!moduleExtended) {
    return null;
  }

  return (
    <AspectDiamond
      key={moduleId}
      imgIdx={0}
      totalCount={totalCount}
      avatarUrl={avatar?.url}
      linkUrl={`/${moduleExtended.urlPart}/${moduleExtended.moduleTypeId}/detail`}
      name={moduleExtended.name}
      entityId={moduleExtended.moduleTypeId}
      index={index}
      x="right"
      y="top"
    />
  );
};

export default ModuleAspectDiamond;
