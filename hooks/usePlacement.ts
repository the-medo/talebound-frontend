import { PbLocationPlacement, PbMapPlacement } from '../generated/api-types/data-contracts';
import { useRouter } from 'next/router';

export type PlacementType = 'location' | 'map';

type PlacementReturnTypes = {
  location: PbLocationPlacement;
  map: PbMapPlacement;
};

const parseRouterParam = (p: string | string[] | undefined): number => {
  if (!p) return 0;
  if (typeof p === 'string') return parseInt(p) ?? 0;
  if (p.length === 0) return 0;
  return parseInt(p[0]) ?? 0;
};

const zeroIsUndefined = (n: number): number | undefined => (n > 0 ? n : undefined);

const savedPlacementObjects: {
  location: Record<string, PbLocationPlacement>;
  map: Record<string, PbMapPlacement>;
} = {
  location: {},
  map: {},
};

export const usePlacement = <T extends PlacementType>(
  type: T,
): [PlacementReturnTypes[T], boolean] => {
  const router = useRouter();

  const worldId = parseRouterParam(router.query['worldId']);
  const questId = parseRouterParam(router.query['questId']);
  // const systemId = parseRouterParam(router.query['systemId']);
  // const characterId = parseRouterParam(router.query['characterId']);

  let valid = true;

  if (type === 'location') {
    const key = `w${worldId}-q${questId}`;
    if (worldId === 0 && questId === 0) valid = false;

    if (!savedPlacementObjects['location'][key]) {
      savedPlacementObjects['location'][key] = {
        worldId: zeroIsUndefined(worldId),
        questId: zeroIsUndefined(questId),
      };
    }

    return [savedPlacementObjects['location'][key], valid];
  } else if (type === 'map') {
    const key = `w${worldId}-q${questId}`;
    if (worldId === 0 && questId === 0) valid = false;

    if (!savedPlacementObjects['map'][key]) {
      savedPlacementObjects['map'][key] = {
        worldId: zeroIsUndefined(worldId),
        questId: zeroIsUndefined(questId),
      };
    }

    return [savedPlacementObjects['map'][key], valid];
  }

  return [{}, false];
};
