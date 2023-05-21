import React, { useCallback } from 'react';
import { styled, Text } from '@nextui-org/react';
import Rating from '../Rating/Rating';
import { Column, Row } from '../Flex/Flex';
import { PbAverageEvaluationVote } from '../../generated/api-types/data-contracts';
import { useAuth } from '../../hooks/useAuth';
import { useCreateOrUpdateEvaluationVote } from '../../api/useCreateOrUpdateEvaluationVote';

const EvaluationWrapper = styled(Column, {
  padding: '$sm',
  width: '100%',
  gap: '$sm',
});

const EvaluationTitle = styled(Text, {});

interface EvaluationProps {
  data: PbAverageEvaluationVote;
  disabled?: boolean;
}

const Evaluation: React.FC<EvaluationProps> = ({ data, disabled }) => {
  const { user } = useAuth();

  const doVote = useCreateOrUpdateEvaluationVote();

  const handleChange = useCallback(
    (value: number) => {
      if (disabled) return;
      if (!data.userId) return;
      if (!user?.id) return;
      if (!data.evaluationId) return;

      doVote.mutate({
        userId: data.userId,
        userIdVoter: user.id,
        evaluationId: data.evaluationId,
        value,
      });
    },
    [disabled, data.userId, data.evaluationId, doVote, user?.id],
  );

  return (
    <EvaluationWrapper>
      <Row css={{ width: '100%', justifyContent: 'space-between', alignItems: 'center' }}>
        <EvaluationTitle h5>{data.name}</EvaluationTitle>
        <Rating onChange={handleChange} defaultValue={data.average} disabled={disabled} />
      </Row>
      <Text small i>
        {data.description}
      </Text>
    </EvaluationWrapper>
  );
};

export default Evaluation;
