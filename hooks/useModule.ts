import { PbModule } from '../generated/api-types/data-contracts';
import { useRouter } from 'next/router';

export type ModuleType = 'location' | 'map' | 'post';
export type ModuleIdsToUse = keyof PbModule;

const parseRouterParam = (p: string | string[] | undefined): number => {
  if (!p) return 0;
  if (typeof p === 'string') return parseInt(p) ?? 0;
  if (p.length === 0) return 0;
  return parseInt(p[0]) ?? 0;
};

const idUsageForModuleType: Record<ModuleType, ModuleIdsToUse[]> = {
  location: ['worldId', 'questId'],
  map: ['worldId', 'questId'],
  post: ['worldId', 'questId', 'systemId', 'characterId'],
};

const keyShortcuts: Record<ModuleIdsToUse, string> = {
  worldId: 'w',
  questId: 'q',
  systemId: 's',
  characterId: 'c',
};

const zeroIsUndefined = (n: number): number | undefined => (n > 0 ? n : undefined);

const savedModuleObjects: Record<string, PbModule> = {};

export const useModule = <T extends ModuleType>(type: T): [PbModule, boolean] => {
  const router = useRouter();

  let valid = false;
  const keyParts: string[] = [];
  const moduleObject: PbModule = {};

  for (const idToUse of idUsageForModuleType[type]) {
    const id = parseRouterParam(router.query[idToUse]);
    keyParts.push(`${keyShortcuts[idToUse]}${id ?? 0}`);
    moduleObject[idToUse] = zeroIsUndefined(id);
    if (id > 0) valid = true; //at least one positive ID to have valid module
  }

  const key = keyParts.join('-');

  if (!savedModuleObjects[key]) {
    savedModuleObjects[key] = moduleObject;
  }

  return [savedModuleObjects[key], valid];
};
