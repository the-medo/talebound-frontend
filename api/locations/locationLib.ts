import { PbLocationPlacement } from '../../generated/api-types/data-contracts';
import { GetLocationsParams } from './useGetLocations';

export const locationPlacementToParams = (input: PbLocationPlacement): GetLocationsParams => ({
  placementQuestId: input.questId,
  placementWorldId: input.worldId,
});
