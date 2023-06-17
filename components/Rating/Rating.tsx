import React from 'react';
import { Rate } from 'antd';
import { MdRectangle } from 'react-icons/md';
import { styled } from '../../styles/stitches.config';

const StyledRating = styled(Rate, {
  color: '$primary800',
  li: {
    marginBottom: 0,
  },
});

interface RatingProps {
  defaultValue?: number;
  disabled?: boolean;
  onChange?: (value: number) => void;
}

const Rating: React.FC<RatingProps> = ({ defaultValue, onChange, disabled }) => {
  return (
    <StyledRating
      allowHalf
      allowClear
      disabled={disabled}
      onChange={onChange}
      character={<MdRectangle />}
      defaultValue={defaultValue}
    />
  );
};

export default Rating;
