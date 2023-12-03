import { PbLocation } from '../generated/api-types/data-contracts';
import { useMemo } from 'react';
import { TaleboundError } from '../utils/types/error';
import { useGetLocationById } from '../api/locations/useGetLocationById';

interface UseLocationResponse {
  location: PbLocation | undefined;
  isFetching: boolean;
  error: TaleboundError | null;
}

export const useLocation = (locationId: number | undefined): UseLocationResponse => {
  const { data: location, isFetching, error } = useGetLocationById({ variables: locationId });

  return useMemo(
    () => ({
      location,
      isFetching,
      error,
    }),
    [location, isFetching, error],
  );
};
