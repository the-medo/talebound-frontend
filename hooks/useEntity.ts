import { PbViewEntity } from '../generated/api-types/data-contracts';
import { useMemo } from 'react';
import { useGetEntityById } from '../api/entities/useGetEntityById';
import { TaleboundError } from '../utils/types/error';
import { useGetWorldById } from '../api/worlds/useGetWorldById';

interface UseEntityResponse {
  entity: PbViewEntity | undefined;
  isFetching: boolean;
  error: TaleboundError | null;
}

export const useEntity = (entityId: number): UseEntityResponse => {
  const { data: entity, isFetching, error } = useGetEntityById({ variables: entityId });

  return useMemo(
    () => ({
      entity,
      isFetching: isFetching ?? false,
      error: error ?? null,
    }),
    [error, isFetching, entity],
  );
};
