import { styled } from '@stitches/react';
import * as DropdownMenuRadix from '@radix-ui/react-dropdown-menu';
import { stylesDropdownMenuItem } from './stylesDropdownMenuItem';

export const DropdownMenuItem = styled(DropdownMenuRadix.Item, stylesDropdownMenuItem);
