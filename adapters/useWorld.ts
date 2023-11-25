import { moduleSelectors } from './ModuleAdapter';
import { ReduxState, store } from '../store';
import { PbModule, PbWorld } from '../generated/api-types/data-contracts';
import { worldSelectors } from './WorldAdapter';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';

interface UseWorldResponse {
  moduleId: number;
  module: PbModule | undefined;
  world: PbWorld | undefined;
}

export const useWorld = (worldId: number): UseWorldResponse => {
  const world = worldSelectors.selectById(store.getState(), worldId);
  const moduleId = useSelector((state: ReduxState) => state.mapping.worldsModule[world?.id ?? 0]);
  const module = moduleSelectors.selectById(store.getState(), moduleId);

  return useMemo(
    () => ({
      moduleId,
      module,
      world,
    }),
    [module, moduleId, world],
  );
};
