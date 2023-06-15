import React from 'react';
import ContentSection from '../../components/ContentSection/ContentSection';
import Evaluation from '../../components/Evaluation/Evaluation';
import { Text } from '@nextui-org/react';
import { useGetAverageUserEvaluationByType } from '../../api/useGetAverageUserEvaluationByType';
import { useAuth } from '../../hooks/useAuth';
import { PbEvaluationType } from '../../generated/api-types/data-contracts';
import { Flex } from '../../components/Flex/Flex';
import Loading from '../../components/Loading/Loading';

interface SelfEvaluationProps {}

const SelfEvaluation: React.FC<SelfEvaluationProps> = () => {
  const { user } = useAuth();

  const { data, isLoading, error } = useGetAverageUserEvaluationByType({
    variables: {
      userId: user?.id ?? 0,
      type: PbEvaluationType.Self,
    },
    suspense: true,
  });

  return (
    <ContentSection header="Your experience" direction="column">
      <Text>
        Knowing more about your strengths, experience, and areas of interest can help us facilitate
        better connections and gameplay experiences. Take a moment to reflect and rate your own
        expertise in the following areas:
      </Text>
      {isLoading && (
        <Flex css={{ alignSelf: 'center' }}>
          <Loading color="secondary" /> Loading...
        </Flex>
      )}
      {data?.averageEvaluationVote?.map((evaluation) => (
        <Evaluation data={evaluation} />
      ))}
    </ContentSection>
  );
};

export default SelfEvaluation;
