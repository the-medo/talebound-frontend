import { styled } from '../../styles/stitches.config';
import * as DropdownMenuRadix from '@radix-ui/react-dropdown-menu';

export const DropdownMenuTrigger = styled(DropdownMenuRadix.Trigger, {
  border: '3px solid transparent',
  background: 'transparent',

  variants: {
    circle: {
      true: {
        borderRadius: '100%',
      },
    },
  },

  '&:hover': {
    border: '3px solid $primary200',
  },

  '&:focus': {
    outline: 'none',
    boxShadow: '$focus',
  },
});
