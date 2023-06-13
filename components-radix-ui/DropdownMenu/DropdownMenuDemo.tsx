import React from 'react';
import * as DropdownMenuRadix from '@radix-ui/react-dropdown-menu';
import { AiOutlineCheck, AiOutlineDotChart, AiOutlineMenu } from 'react-icons/ai';
import { FaChevronRight } from 'react-icons/fa';
import IconButton from '../../components/IconButton/IconButton';
import { DropdownMenuItem } from './DropdownMenuItem';
import { RightSlot } from './RightSlot';
import { DropdownMenuContent } from './DropdownMenuContent';
import { DropdownMenuSubTrigger } from './DropdownMenuSubTrigger';
import { DropdownMenuSubContent } from './DropdownMenuSubContent';
import { DropdownMenuSeparator } from './DropdownMenuSeparator';
import { DropdownMenuCheckboxItem } from './DropdownMenuCheckboxItem';
import { DropdownMenuItemIndicator } from './DropdownMenuItemIndicator';
import { DropdownMenuLabel } from './DropdownMenuLabel';
import { DropdownMenuRadioItem } from './DropdownMenuRadioItem';
import { DropdownMenuArrow } from './DropdownMenuArrow';

interface DropdownMenuDemoProps {}

const DropdownMenuDemo: React.FC<DropdownMenuDemoProps> = () => {
  const [bookmarksChecked, setBookmarksChecked] = React.useState(true);
  const [urlsChecked, setUrlsChecked] = React.useState(false);
  const [person, setPerson] = React.useState('pedro');

  return (
    <DropdownMenuRadix.Root>
      <DropdownMenuRadix.Trigger asChild>
        <IconButton>
          <AiOutlineMenu />
        </IconButton>
      </DropdownMenuRadix.Trigger>

      <DropdownMenuRadix.Portal>
        <DropdownMenuContent sideOffset={5}>
          <DropdownMenuItem>
            New Tab <RightSlot>⌘+T</RightSlot>
          </DropdownMenuItem>
          <DropdownMenuItem>
            New Window <RightSlot>⌘+N</RightSlot>
          </DropdownMenuItem>
          <DropdownMenuItem disabled>
            New Private Window <RightSlot>⇧+⌘+N</RightSlot>
          </DropdownMenuItem>
          <DropdownMenuRadix.Sub>
            <DropdownMenuSubTrigger>
              More Tools
              <RightSlot>
                <FaChevronRight />
              </RightSlot>
            </DropdownMenuSubTrigger>
            <DropdownMenuRadix.Portal>
              <DropdownMenuSubContent sideOffset={2} alignOffset={-5}>
                <DropdownMenuItem>
                  Save Page As… <RightSlot>⌘+S</RightSlot>
                </DropdownMenuItem>
                <DropdownMenuItem>Create Shortcut…</DropdownMenuItem>
                <DropdownMenuItem>Name Window…</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Developer Tools</DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuRadix.Portal>
          </DropdownMenuRadix.Sub>
          <DropdownMenuSeparator />
          <DropdownMenuCheckboxItem
            checked={bookmarksChecked}
            onCheckedChange={setBookmarksChecked}
          >
            <DropdownMenuItemIndicator>
              <AiOutlineCheck />
            </DropdownMenuItemIndicator>
            Show Bookmarks <RightSlot>⌘+B</RightSlot>
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem checked={urlsChecked} onCheckedChange={setUrlsChecked}>
            <DropdownMenuItemIndicator>
              <AiOutlineCheck />
            </DropdownMenuItemIndicator>
            Show Full URLs
          </DropdownMenuCheckboxItem>
          <DropdownMenuSeparator />
          <DropdownMenuLabel>People</DropdownMenuLabel>
          <DropdownMenuRadix.RadioGroup value={person} onValueChange={setPerson}>
            <DropdownMenuRadioItem value="pedro">
              <DropdownMenuItemIndicator>
                <AiOutlineDotChart />
              </DropdownMenuItemIndicator>
              Pedro Duarte
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="colm">
              <DropdownMenuItemIndicator>
                <AiOutlineDotChart />
              </DropdownMenuItemIndicator>
              Colm Tuite
            </DropdownMenuRadioItem>
          </DropdownMenuRadix.RadioGroup>

          <DropdownMenuArrow />
        </DropdownMenuContent>
      </DropdownMenuRadix.Portal>
    </DropdownMenuRadix.Root>
  );
};

export default DropdownMenuDemo;
