import { styled } from '../../styles/stitches.config';
import React, { useMemo } from 'react';
import Stitches from '@stitches/react';
import { Col, Flex } from '../Flex/Flex';
import { Label } from '../Typography/Label';
import { Text } from '../Typography/Text';

export const StyledInput = styled('input', {
  fontFamily: '$heading',
  padding: '$4',
  borderRadius: '$md',
  cursor: 'pointer',
  fontSize: '$md',
  transition: 'all 0.2s ease-in-out',
  border: '1px solid transparent',
  color: '$primary900',
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

export type InputVariants = Stitches.VariantProps<typeof StyledInput>;

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement>, InputVariants {
  id: string;
  label?: string;
  labelDirection?: 'row' | 'column';
  helperText?: string;
  helperType?: 'danger' | 'warning' | 'info';
}

const Input: React.FC<InputProps> = ({
  id,
  label,
  labelDirection = 'column',
  helperText,
  helperType,
  ...otherProps
}) => {
  const labelId = `${id}-label`;
  const helperId = `${id}-helper`;

  const input = useMemo(
    () => (
      <StyledInput aria-labelledby={`${labelId} ${helperId}`} id={id} name={id} {...otherProps} />
    ),
    [id, otherProps],
  );

  return (
    <Col alignItems="end" fullWidth gap="xs">
      <Flex gap="xs" fullWidth direction={labelDirection}>
        {label && <Label id={labelId}>{label}</Label>}
        {input}
      </Flex>
      <Text color={helperType} size="xs" id={helperId}>
        &nbsp;{helperText}
      </Text>
    </Col>
  );
};

export default Input;
