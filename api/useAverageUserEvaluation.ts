import { createQuery } from 'react-query-kit';
import {
  PbEvaluationType,
  PbGetAverageUserEvaluationsByTypeResponse,
} from '../generated/api-types/data-contracts';
import { UsersCollection } from './collections';

export interface PbGetAverageUserEvaluationsByTypeRequest {
  userId: number;
  type: PbEvaluationType;
}

export const useAverageUserEvaluation = createQuery<
  PbGetAverageUserEvaluationsByTypeResponse,
  PbGetAverageUserEvaluationsByTypeRequest
>({
  primaryKey: 'useAverageUserEvaluation',
  queryFn: async ({ queryKey: [, variables] }) => {
    const { data } = await UsersCollection.taleboundGetAverageUserEvaluationsByType(
      variables.userId,
      variables.type,
    );
    return data;
  },
});
