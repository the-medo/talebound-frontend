import React from 'react';
import { styled, Text } from '@nextui-org/react';
import Rating from '../Rating/Rating';
import { Column, Row } from '../Flex/Flex';

const EvaluationWrapper = styled(Column, {
  padding: '$sm',
  width: '100%',
  gap: '$sm',
});

const EvaluationTitle = styled(Text, {});

interface EvaluationProps {
  title: string;
  description: string;
  value?: number;
}

const Evaluation: React.FC<EvaluationProps> = ({ title, description, value }) => {
  return (
    <EvaluationWrapper>
      <Row css={{ width: '100%', justifyContent: 'space-between', alignItems: 'center' }}>
        <EvaluationTitle h5>{title}</EvaluationTitle>
        <Rating defaultValue={value} />
      </Row>
      <Text small i>
        {description}
      </Text>
    </EvaluationWrapper>
  );
};

export default Evaluation;
