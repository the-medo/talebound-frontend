import { createQuery } from 'react-query-kit';
import { TaleboundError } from '../../utils/types/error';
import { FetcherCollection } from '../collections';
import { PbRunFetcherRequest } from '../../generated/api-types/data-contracts';

export type RunFetcherRequestKey = keyof PbRunFetcherRequest;

// object for filtering out keys that are not valid at runtime
const fetcherKeys: Record<RunFetcherRequestKey, null> = {
  moduleIds: null,
  worldIds: null,
  systemIds: null,
  questIds: null,
  characterIds: null,
  entityIds: null,
  postIds: null,
  imageIds: null,
  locationIds: null,
  mapIds: null,
};

export function isFetcherKey(key: string | number | symbol): key is RunFetcherRequestKey {
  return key in fetcherKeys;
}

export const useRunFetcher = createQuery<number, PbRunFetcherRequest, TaleboundError>({
  primaryKey: 'useRunFetcher',
  queryFn: async ({ queryKey: [, variables] }) => {
    console.log('Inside of useRunFetcher');
    const { data } = await FetcherCollection.fetcherRunFetcher({ ...variables });
    return data.moduleId ?? 0;
  },
});
