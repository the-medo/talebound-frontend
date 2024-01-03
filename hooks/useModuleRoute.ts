import { PbEntityType, PbViewModule, PbModuleType } from '../generated/api-types/data-contracts';
import { useRouter } from 'next/router';
import { useGetModuleId } from '../api/modules/useGetModuleId';
import { useMemo } from 'react';

export type EntityType = 'location' | 'map' | 'post';
export type ModuleIdsToUse = keyof Pick<
  PbViewModule,
  'worldId' | 'questId' | 'systemId' | 'characterId'
>;

const parseRouterParam = (p: string | string[] | undefined): number => {
  if (!p) return 0;
  if (typeof p === 'string') return parseInt(p) ?? 0;
  if (p.length === 0) return 0;
  return parseInt(p[0]) ?? 0;
};

export const modulesOfEntities: Record<PbEntityType, PbModuleType[]> = {
  [PbEntityType.ENTITY_TYPE_UNKNOWN]: [
    PbModuleType.MODULE_TYPE_WORLD,
    PbModuleType.MODULE_TYPE_QUEST,
    PbModuleType.MODULE_TYPE_SYSTEM,
    PbModuleType.MODULE_TYPE_CHARACTER,
  ],
  [PbEntityType.ENTITY_TYPE_LOCATION]: [
    PbModuleType.MODULE_TYPE_WORLD,
    PbModuleType.MODULE_TYPE_QUEST,
  ],
  [PbEntityType.ENTITY_TYPE_MAP]: [PbModuleType.MODULE_TYPE_WORLD, PbModuleType.MODULE_TYPE_QUEST],
  [PbEntityType.ENTITY_TYPE_POST]: [
    PbModuleType.MODULE_TYPE_WORLD,
    PbModuleType.MODULE_TYPE_QUEST,
    PbModuleType.MODULE_TYPE_SYSTEM,
    PbModuleType.MODULE_TYPE_CHARACTER,
  ],
  [PbEntityType.ENTITY_TYPE_IMAGE]: [
    PbModuleType.MODULE_TYPE_WORLD,
    PbModuleType.MODULE_TYPE_QUEST,
    PbModuleType.MODULE_TYPE_SYSTEM,
    PbModuleType.MODULE_TYPE_CHARACTER,
  ],
  [PbEntityType.ENTITY_TYPE_CHARACTER]: [],
};

export const entitiesOfModules: Record<PbModuleType, PbEntityType[]> = {
  [PbModuleType.MODULE_TYPE_WORLD]: [],
  [PbModuleType.MODULE_TYPE_SYSTEM]: [],
  [PbModuleType.MODULE_TYPE_QUEST]: [],
  [PbModuleType.MODULE_TYPE_CHARACTER]: [],
  [PbModuleType.MODULE_TYPE_UNKNOWN]: [],
};

for (const entityType in modulesOfEntities) {
  const et = entityType as PbEntityType;
  modulesOfEntities[et].forEach((mt) => {
    entitiesOfModules[mt].push(et);
  });
}

const idUsageForModuleType: Record<PbModuleType, ModuleIdsToUse | undefined> = {
  [PbModuleType.MODULE_TYPE_WORLD]: 'worldId',
  [PbModuleType.MODULE_TYPE_SYSTEM]: 'systemId',
  [PbModuleType.MODULE_TYPE_QUEST]: 'questId',
  [PbModuleType.MODULE_TYPE_CHARACTER]: 'characterId',
  [PbModuleType.MODULE_TYPE_UNKNOWN]: undefined,
};

const idToModuleType: Record<ModuleIdsToUse, PbModuleType> = {
  worldId: PbModuleType.MODULE_TYPE_WORLD,
  questId: PbModuleType.MODULE_TYPE_QUEST,
  systemId: PbModuleType.MODULE_TYPE_SYSTEM,
  characterId: PbModuleType.MODULE_TYPE_CHARACTER,
};

const keyShortcuts: Record<ModuleIdsToUse, string> = {
  worldId: 'w',
  questId: 'q',
  systemId: 's',
  characterId: 'c',
};

const zeroIsUndefined = (n: number): number | undefined => (n > 0 ? n : undefined);

const savedModuleObjects: Record<string, PbViewModule> = {};

export const useModuleRoute = (type: PbEntityType): [PbViewModule, number, PbModuleType] => {
  const router = useRouter();

  let moduleType: PbModuleType = PbModuleType.MODULE_TYPE_UNKNOWN;
  const keyParts: string[] = [];
  const moduleObject: PbViewModule = {};

  for (const mt of modulesOfEntities[type]) {
    const idToUse = idUsageForModuleType[mt];
    if (idToUse) {
      const id = parseRouterParam(router.query[idToUse]);
      keyParts.push(`${keyShortcuts[idToUse]}${id ?? 0}`);
      moduleObject[idToUse] = zeroIsUndefined(id);
      if (id > 0) moduleType = idToModuleType[idToUse]; //at least one positive ID to have valid module
    }
  }

  const key = keyParts.join('-');

  if (!savedModuleObjects[key]) {
    savedModuleObjects[key] = moduleObject;
  }

  const obj = savedModuleObjects[key];

  const { data: moduleId = 0 } = useGetModuleId({ variables: obj });

  return useMemo(
    () => [savedModuleObjects[key], moduleId, moduleType],
    [key, moduleId, moduleType],
  );
};
