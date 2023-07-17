import { createMutation } from 'react-query-kit';
import { ImagesCollection } from './collections';
import { PbUploadImageRequest } from '../generated/api-types/data-contracts';

export const useUploadImage = createMutation({
  mutationFn: async (variables: PbUploadImageRequest) =>
    ImagesCollection.taleboundUploadDefaultImage(variables),
});
