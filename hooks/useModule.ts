import { PbViewModule } from '../generated/api-types/data-contracts';
import { useMemo } from 'react';
import { useGetModuleById } from '../api/modules/useGetModuleById';
import { TaleboundError } from '../utils/types/error';

interface UseModuleResponse {
  module: PbViewModule | undefined;
  isFetching: boolean;
  error: TaleboundError | null;
}

export const useModule = (moduleId: number): UseModuleResponse => {
  const { data: module, isFetching, error } = useGetModuleById({ variables: moduleId });

  return useMemo(
    () => ({
      module,
      isFetching: isFetching ?? false,
      error: error ?? null,
    }),
    [error, isFetching, module],
  );
};
