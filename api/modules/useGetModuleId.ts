import { createQuery } from 'react-query-kit';
import { ModulesCollection } from '../collections';
import { TaleboundError } from '../../utils/types/error';

type UseGetModuleIdRequest = Parameters<typeof ModulesCollection.modulesGetModuleId>[0];

export const useGetModuleId = createQuery<number, UseGetModuleIdRequest, TaleboundError>({
  primaryKey: 'useGetModuleId',
  queryFn: async ({ queryKey: [_, variables] }) => {
    const { data } = await ModulesCollection.modulesGetModuleId(variables);
    return data.moduleId ?? 0;
  },
});
