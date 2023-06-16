import * as CheckboxRadix from '@radix-ui/react-checkbox';
import { styled } from '../../styles/stitches.config';

export const CheckboxRoot = styled(CheckboxRadix.Root, {
  all: 'unset',
  backgroundColor: 'white',
  width: 25,
  height: 25,
  borderRadius: 4,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  boxShadow: `0 2px 10px $black`,
  '&:hover': { backgroundColor: '$black' },
  '&:focus': { boxShadow: `0 0 0 2px black` },
});
