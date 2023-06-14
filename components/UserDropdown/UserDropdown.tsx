import React, { Key, useCallback } from 'react';
import * as DropdownMenuRadix from '@radix-ui/react-dropdown-menu';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { useAuth } from '../../hooks/useAuth';
import { useLogout } from '../../api/useLogout';
import { setUser } from '../../utils/auth/userSlice';
import { Avatar } from '@nextui-org/react';
import { DEFAULT_AVATAR_URL } from '../../utils/constants';
import { DropdownMenuContent } from '../../components-radix-ui/DropdownMenu/DropdownMenuContent';
import { DropdownMenuItem } from '../../components-radix-ui/DropdownMenu/DropdownMenuItem';
import { DropdownMenuSeparator } from '../../components-radix-ui/DropdownMenu/DropdownMenuSeparator';

interface UserDropdownProps {}

const UserDropdown: React.FC<UserDropdownProps> = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { user } = useAuth();

  const logout = useLogout({
    onSuccess: () => {
      console.log('Logging out...');
      dispatch(setUser(undefined));
      void router.push('/');
    },
  });

  const handleUserDropdown = useCallback(
    (key: Key) => {
      console.log('handleUserDropdown called', key);
      if (key === 'logout') {
        logout.mutate();
      } else if (key === 'settings') {
        void router.push('/user/settings');
      }
    },
    [logout, router],
  );

  return (
    <DropdownMenuRadix.Root>
      <DropdownMenuRadix.Trigger asChild>
        <Avatar
          bordered
          as="button"
          color="primary"
          size="md"
          src={user?.img?.url ?? DEFAULT_AVATAR_URL}
        />
      </DropdownMenuRadix.Trigger>

      <DropdownMenuRadix.Portal>
        <DropdownMenuContent align={'end'} sideOffset={15}>
          <DropdownMenuItem>
            Signed in as&nbsp;<strong>{user?.username}</strong>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Settings</DropdownMenuItem>
          <DropdownMenuItem>Help & Feedback</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Logout</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenuRadix.Portal>
    </DropdownMenuRadix.Root>
  );
};

export default UserDropdown;
