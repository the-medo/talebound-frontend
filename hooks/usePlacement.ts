import { PbPlacement } from '../generated/api-types/data-contracts';
import { useRouter } from 'next/router';

export type PlacementType = 'location' | 'map';
export type PlacementIdsToUse = keyof PbPlacement;

const parseRouterParam = (p: string | string[] | undefined): number => {
  if (!p) return 0;
  if (typeof p === 'string') return parseInt(p) ?? 0;
  if (p.length === 0) return 0;
  return parseInt(p[0]) ?? 0;
};

const idUsageForPlacementType: Record<PlacementType, PlacementIdsToUse[]> = {
  location: ['worldId', 'questId'],
  map: ['worldId', 'questId'],
};

const keyShortcuts: Record<PlacementIdsToUse, string> = {
  worldId: 'w',
  questId: 'q',
  systemId: 's',
  characterId: 'c',
};

const zeroIsUndefined = (n: number): number | undefined => (n > 0 ? n : undefined);

const savedPlacementObjects: Record<string, PbPlacement> = {};

export const usePlacement = <T extends PlacementType>(type: T): [PbPlacement, boolean] => {
  const router = useRouter();

  let valid = false;
  const keyParts: string[] = [];
  const placementObject: PbPlacement = {};

  for (const idToUse of idUsageForPlacementType[type]) {
    const id = parseRouterParam(router.query[idToUse]);
    keyParts.push(`${keyShortcuts[idToUse]}${id ?? 0}`);
    placementObject[idToUse] = zeroIsUndefined(id);
    if (id > 0) valid = true; //at least one positive ID to have valid placement
  }

  const key = keyParts.join('-');

  if (!savedPlacementObjects[key]) {
    savedPlacementObjects[key] = placementObject;
  }

  return [savedPlacementObjects[key], valid];
};
