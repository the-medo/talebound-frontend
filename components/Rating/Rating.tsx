import React from 'react';
import { Rate } from 'antd';
import { MdRectangle } from 'react-icons/md';
import { styled } from '@nextui-org/react';

const StyledRating = styled(Rate, {
  color: '$primary800',
  li: {
    marginBottom: 0,
  },
});

interface RatingProps {
  defaultValue?: number;
}

const Rating: React.FC<RatingProps> = ({ defaultValue }) => {
  return <StyledRating allowHalf character={<MdRectangle />} defaultValue={defaultValue} />;
};

export default Rating;
