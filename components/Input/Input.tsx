import { styled } from '../../styles/stitches.config';
import React from 'react';

interface StyledInputVariants {
  fullWidth?: boolean;
  transparent?: boolean;
}

export const StyledInput = styled('input', {
  fontFamily: '$heading',
  padding: '$4',
  borderRadius: '$md',
  cursor: 'pointer',
  fontSize: '$md',
  transition: 'all 0.2s ease-in-out',
  border: '1px solid transparent',
  color: '$dark1',
  backgroundColor: '$white700',

  '&:focus': {
    outline: 'none',
    boxShadow: '$md',
    border: '1px solid $white900',
  },

  variants: {
    fullWidth: {
      true: {
        width: '100%',
      },
    },
    transparent: {
      true: {
        background: '$transparent40',
        '&:hover': { backgroundColor: '$transparent70' },
        '&:focus': { backgroundColor: '$transparent70' },
      },
    },
  },
});

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    StyledInputVariants {}

const Input: React.FC<InputProps> = (props) => {
  return <StyledInput {...props} />;
};

export default Input;
