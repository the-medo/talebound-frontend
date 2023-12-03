import { PbMap } from '../generated/api-types/data-contracts';
import { useMemo } from 'react';
import { TaleboundError } from '../utils/types/error';
import { useGetMapById } from '../api/maps/useGetMapById';

interface UseMapResponse {
  map: PbMap | undefined;
  isFetching: boolean;
  error: TaleboundError | null;
}

export const useMap = (mapId: number | undefined): UseMapResponse => {
  const { data: map, isFetching, error } = useGetMapById({ variables: mapId });

  return useMemo(
    () => ({
      map,
      isFetching,
      error,
    }),
    [map, isFetching, error],
  );
};
