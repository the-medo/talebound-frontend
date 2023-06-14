import { styled } from '@stitches/react';
import * as DropdownMenuRadix from '@radix-ui/react-dropdown-menu';
import { mauve } from '@radix-ui/colors';

export const DropdownMenuSeparator = styled(DropdownMenuRadix.Separator, {
  height: 1,
  backgroundColor: mauve.mauve8,
  margin: 5,
});
