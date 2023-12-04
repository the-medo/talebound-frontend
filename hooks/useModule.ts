import { PbModuleType, PbViewModule } from '../generated/api-types/data-contracts';
import { useMemo } from 'react';
import { useGetModuleById } from '../api/modules/useGetModuleById';
import { TaleboundError } from '../utils/types/error';
import { useSelector } from 'react-redux';
import { moduleSelectors } from '../adapters/ModuleAdapter';

interface UseModuleResponse {
  module: PbViewModule | undefined;
  moduleTypeId: number | undefined;
  linkPrefix: string | undefined;
  isFetching: boolean;
  error: TaleboundError | null;
}

export const useModule = (moduleId: number): UseModuleResponse => {
  const { isFetching, error } = useGetModuleById({ variables: moduleId });
  const module = useSelector((state) => moduleSelectors.selectById(state, moduleId));

  const moduleTypeId = useMemo(() => {
    if (!module?.moduleType) return undefined;
    switch (module?.moduleType) {
      case PbModuleType.MODULE_TYPE_WORLD:
        return module?.worldId ?? 0;
      default:
        throw new Error(`Module type ${module?.moduleType} not implemented yet`);
    }
  }, [module?.moduleType, module?.worldId]);

  const linkPrefix = useMemo(() => {
    if (!module?.moduleType) return undefined;
    switch (module?.moduleType) {
      case PbModuleType.MODULE_TYPE_WORLD:
        return 'worlds';
      default:
        throw new Error(`Module type ${module?.moduleType} not implemented yet`);
    }
  }, [module?.moduleType]);

  return useMemo(
    () => ({
      module,
      moduleTypeId,
      linkPrefix,
      isFetching: isFetching ?? false,
      error: error ?? null,
    }),
    [error, isFetching, linkPrefix, module, moduleTypeId],
  );
};
