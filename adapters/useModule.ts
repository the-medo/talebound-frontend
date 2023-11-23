import { moduleSelectors } from './ModuleAdapter';
import { store } from '../store';
import { PbModule, PbModuleType, PbWorld } from '../generated/api-types/data-contracts';
import { worldSelectors } from './WorldAdapter';
import { useMemo } from 'react';

const urlParts: Record<PbModuleType, string> = {
  [PbModuleType.MODULE_TYPE_WORLD]: 'worlds',
  [PbModuleType.MODULE_TYPE_SYSTEM]: 'systems',
  [PbModuleType.MODULE_TYPE_QUEST]: 'quests',
  [PbModuleType.MODULE_TYPE_CHARACTER]: 'characters',
  [PbModuleType.MODULE_TYPE_UNKNOWN]: '-',
};

interface UseModuleResponse {
  module: PbModule | undefined;
  world: PbWorld | undefined;
  name: string;
  moduleTypeId: number;
  urlPart: string;
}

export const useModule = (moduleId: number): UseModuleResponse => {
  const module = moduleSelectors.selectById(store.getState(), moduleId);

  const world = worldSelectors.selectById(store.getState(), module?.worldId ?? 0);

  return useMemo(
    () => ({
      module,
      world,
      name: world?.name ?? '',
      moduleTypeId: world?.id ?? 0,
      urlPart: urlParts[module?.moduleType ?? PbModuleType.MODULE_TYPE_UNKNOWN],
    }),
    [module, world],
  );
};
