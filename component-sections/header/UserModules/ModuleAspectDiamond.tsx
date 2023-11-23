import React from 'react';
import AspectDiamond from '../ControlPanel/AspectDiamond';
import { store } from '../../../store';
import { imageSelectors } from '../../../adapters/ImageAdapter';
import { useModule } from '../../../adapters/useModule';

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
  const module = useModule(moduleId);
  const avatar = imageSelectors.selectById(store.getState(), module.module?.avatarImgId ?? 0);

  if (!module) {
    return null;
  }

  return (
    <AspectDiamond
      key={moduleId}
      imgIdx={0}
      totalCount={totalCount}
      avatarUrl={avatar?.url}
      linkUrl={`/${module.urlPart}/${module.moduleTypeId}/detail`}
      name={module.name}
      entityId={module.moduleTypeId}
      index={index}
      x="right"
      y="top"
    />
  );
};

export default ModuleAspectDiamond;
