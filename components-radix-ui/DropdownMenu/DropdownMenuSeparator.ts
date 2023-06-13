import { styled } from '@stitches/react';
import * as DropdownMenuRadix from '@radix-ui/react-dropdown-menu';
import { teal } from '@radix-ui/colors';

export const DropdownMenuSeparator = styled(DropdownMenuRadix.Separator, {
  height: 1,
  backgroundColor: teal.teal6,
  margin: 5,
});
