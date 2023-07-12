import * as Select from '@radix-ui/react-select';
import { styled } from '../../styles/stitches.config';
import Stitches from '@stitches/react';

export const SelectTrigger = styled(Select.SelectTrigger, {
  display: 'flex',
  alignItems: 'center',
  gap: '$md',
  justifyContent: 'space-between',

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

  // all: 'unset',
  // display: 'inline-flex',
  // alignItems: 'center',
  // justifyContent: 'center',
  // borderRadius: 4,
  // padding: '0 15px',
  // fontSize: 13,
  // lineHeight: 1,
  // height: 35,
  // gap: 5,
  // backgroundColor: 'white',
  // color: 'black',
  // boxShadow: `0 2px 10px black`,
  // '&:hover': { backgroundColor: '$primary200' },
  // '&:focus': { boxShadow: `0 0 0 2px black` },
  // '&[data-placeholder]': { color: '$primary500' },
});

export type SelectTriggerVariants = Stitches.VariantProps<typeof SelectTrigger>;
