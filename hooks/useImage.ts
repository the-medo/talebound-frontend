import { PbImage } from '../generated/api-types/data-contracts';
import { useMemo } from 'react';
import { TaleboundError } from '../utils/types/error';
import { useGetImageById } from '../api/images/useGetImageById';

interface UseImageResponse {
  image: PbImage | undefined;
  isFetching: boolean;
  error: TaleboundError | null;
}

export const useImage = (imageId: number | undefined): UseImageResponse => {
  const { data: image, isFetching, error } = useGetImageById({ variables: imageId });

  return useMemo(
    () => ({
      image,
      isFetching,
      error,
    }),
    [image, isFetching, error],
  );
};
