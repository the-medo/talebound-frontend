import React, { useCallback } from 'react';
import { styled, Text } from '@nextui-org/react';
import Rating from '../Rating/Rating';
import { Column, Row } from '../Flex/Flex';
import { PbAverageEvaluationVote } from '../../generated/api-types/data-contracts';
import { useAuth } from '../../hooks/useAuth';
import { useCreateOrUpdateEvaluationVote } from '../../api/useCreateOrUpdateEvaluationVote';
import { labelStyle } from '../../styles/typefaces';

const EvaluationWrapper = styled(Column, {
  padding: '$md',
  width: '100%',
  gap: '$sm',
  borderRadius: '$md',
  background: '$white700',

  variants: {
    compact: {
      true: {
        padding: '$xs',
        gap: '$xs',
        borderRadius: '0',
        background: 'transparent',
      },
    },
  },
});

const EvaluationTitle = styled('p', {
  ...labelStyle,
});

interface EvaluationProps {
  data: PbAverageEvaluationVote;
  disabled?: boolean;
  compact?: boolean;
}

const Evaluation: React.FC<EvaluationProps> = ({ data, disabled, compact = false }) => {
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
    <EvaluationWrapper compact={compact}>
      <Row
        css={{
          $$gap: '1rem',
          width: '100%',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <EvaluationTitle>{data.name}</EvaluationTitle>
        <Rating onChange={handleChange} defaultValue={data.average} disabled={disabled} />
      </Row>
      {!compact && <Text span>{data.description}</Text>}
    </EvaluationWrapper>
  );
};

export default Evaluation;
