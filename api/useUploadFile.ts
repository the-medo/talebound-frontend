import { createMutation } from 'react-query-kit';
import { FilesCollection, UsersCollection } from './collections';
import { PbUpdateUserRequest, PbUploadImageRequest } from '../generated/api-types/data-contracts';

export const useUploadFile = createMutation({
  mutationFn: async (variables: PbUploadImageRequest) =>
    FilesCollection.taleboundUploadImage(variables),
});
