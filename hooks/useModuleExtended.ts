import { PbModuleType, PbViewModule, PbWorld } from '../generated/api-types/data-contracts';
import { useMemo } from 'react';
import { useGetModuleById } from '../api/modules/useGetModuleById';
import { useGetWorldById } from '../api/worlds/useGetWorldById';
import { useSelector } from 'react-redux';
import { moduleSelectors } from '../adapters/ModuleAdapter';

const urlParts: Record<PbModuleType, string> = {
  [PbModuleType.MODULE_TYPE_WORLD]: 'worlds',
  [PbModuleType.MODULE_TYPE_SYSTEM]: 'systems',
  [PbModuleType.MODULE_TYPE_QUEST]: 'quests',
  [PbModuleType.MODULE_TYPE_CHARACTER]: 'characters',
  [PbModuleType.MODULE_TYPE_UNKNOWN]: '-',
};

interface UseModuleExtendedResponse {
  module: PbViewModule | undefined;
  world: PbWorld | undefined;
  name: string;
  moduleTypeId: number;
  urlPart: string;
}

export const useModuleExtended = (moduleId: number): UseModuleExtendedResponse => {
  useGetModuleById({ variables: moduleId });
  const module = useSelector((state) => moduleSelectors.selectById(state, moduleId));
  const { data: world } = useGetWorldById({ variables: module?.worldId ?? 0 });

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
