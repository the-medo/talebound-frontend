import React from 'react';
import { Text } from '../Typography/Text';
import { styled } from '../../styles/stitches.config';
import { Col } from '../Flex/Flex';

const MiniStatisticWrapper = styled(Col, {
  padding: '$sm',
  backgroundColor: '$transparent60',
  borderRadius: '$md',
  fontSize: '$md',

  width: '100px',
  alignItems: 'center',
  justifyContent: 'center',
});

const MiniStatisticNumber = styled(Col, {
  padding: '$sm',
  fontSize: '$2xl',
  backgroundColor: '$transparent60',
  width: '60px',
  height: '60px',
  alignItems: 'center',
  justifyContent: 'center',
});

interface MiniStatisticProps {
  title?: string;
  value?: number;
}

const MiniStatistic: React.FC<MiniStatisticProps> = ({ title, value }) => {
  return (
    <MiniStatisticWrapper gap="sm">
      <Text>{title}</Text>
      <MiniStatisticNumber circle>{value}</MiniStatisticNumber>
    </MiniStatisticWrapper>
  );
};

export default MiniStatistic;
