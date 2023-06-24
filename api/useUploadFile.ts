import { createMutation } from 'react-query-kit';
import { FilesCollection } from './collections';
import { PbUploadImageRequest } from '../generated/api-types/data-contracts';

export const useUploadFile = createMutation({
  mutationFn: async (variables: PbUploadImageRequest) =>
    FilesCollection.taleboundUploadImage(variables),
});
