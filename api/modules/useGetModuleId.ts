import { createQuery } from 'react-query-kit';
import { ModulesCollection } from '../collections';
import { PbModule } from '../../generated/api-types/data-contracts';
import { TaleboundError } from '../../utils/types/error';

export const useGetModuleId = createQuery<number, PbModule, TaleboundError>({
  primaryKey: 'useGetModuleId',
  queryFn: async ({ queryKey: [, variables] }) => {
    const { data } = await ModulesCollection.modulesGetModuleId({ ...variables });
    return data.moduleId ?? 0;
  },
});
