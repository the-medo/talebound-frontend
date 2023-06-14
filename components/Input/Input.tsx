import { styled } from '../../styles/stitches.config';
import React from 'react';

interface StyledInputVariants {
  fullWidth?: boolean;
  transparent?: boolean;
}

export const StyledInput = styled('input', {
  background: '$white100',
  fontFamily: '$heading',
  padding: '$4',
  borderRadius: '$md',
  cursor: 'pointer',
  fontSize: '$md',
  transition: 'all 0.2s ease-in-out',
  border: '0',

  '&:focus': {
    outline: 'none',
    boxShadow: '$md',
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
