import { styled } from '@stitches/react';
import * as DropdownMenuRadix from '@radix-ui/react-dropdown-menu';
import { teal } from '@radix-ui/colors';
import { stylesDropdownMenuItem } from './stylesDropdownMenuItem';

export const DropdownMenuSubTrigger = styled(DropdownMenuRadix.SubTrigger, {
  '&[data-state="open"]': {
    backgroundColor: teal.teal4,
    color: teal.teal11,
  },
  ...stylesDropdownMenuItem,
});
