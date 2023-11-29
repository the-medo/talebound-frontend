import { ReduxState } from '../store';
import { PbViewModule, PbWorld } from '../generated/api-types/data-contracts';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useGetWorldById } from '../api/worlds/useGetWorldById';
import { TaleboundError } from '../utils/types/error';
import { useModule } from './useModule';
import { useGetModuleId } from '../api/modules/useGetModuleId';

interface UseWorldResponse {
  moduleId: number;
  module: PbViewModule | undefined;
  world: PbWorld | undefined;
  isFetching: boolean;
  error: TaleboundError | null;
}

export const useWorld = (worldId: number): UseWorldResponse => {
  const {
    data: world,
    isFetching: isFetchingWorld,
    error: errorWorld,
  } = useGetWorldById({ variables: worldId });

  const moduleId1 = useSelector((state: ReduxState) => state.mapping.worldsModule[worldId] ?? 0);

  const { data: moduleId2 } = useGetModuleId({ variables: { worldId } });

  const moduleId = moduleId1 ?? moduleId2 ?? 0;

  const { module, isFetching: isFetchingModule, error: errorModule } = useModule(moduleId);

  return useMemo(
    () => ({
      moduleId,
      module,
      world,
      isFetching: isFetchingWorld ?? isFetchingModule,
      error: errorWorld ?? errorModule,
    }),
    [errorModule, errorWorld, isFetchingModule, isFetchingWorld, module, moduleId, world],
  );
};
