import React, { useCallback } from 'react';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { useAuth } from '../../hooks/useAuth';
import { useLogout } from '../../api/useLogout';
import { setUser } from '../../utils/auth/userSlice';
import { DropdownMenuContent } from '../../components-radix-ui/DropdownMenu/DropdownMenuContent';
import { DropdownMenuItem } from '../../components-radix-ui/DropdownMenu/DropdownMenuItem';
import { DropdownMenuSeparator } from '../../components-radix-ui/DropdownMenu/DropdownMenuSeparator';
import Avatar from '../Avatar/Avatar';
import { DropdownMenuTrigger } from '../../components-radix-ui/DropdownMenu/DropdownMenuTrigger';
import { DropdownMenuRoot } from '../../components-radix-ui/DropdownMenu/DropdownMenuRoot';
import { DropdownMenuPortal } from '../../components-radix-ui/DropdownMenu/DropdownMenuPortal';

const UserDropdown: React.FC = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { user } = useAuth();

  const logout = useLogout({
    onSuccess: () => {
      dispatch(setUser(undefined));
      void router.push('/');
    },
  });

  const openProfile = useCallback(() => {
    void router.push(`/user/${user?.id}/profile`);
  }, [router, user?.id]);

  const openSettings = useCallback(() => {
    void router.push('/user/settings');
  }, [router]);

  const handleLogout = useCallback(() => {
    logout.mutate();
  }, [logout]);

  return (
    <DropdownMenuRoot>
      <DropdownMenuTrigger circle>
        <Avatar size="md" type="user" url={user?.img?.url} />
      </DropdownMenuTrigger>

      <DropdownMenuPortal>
        <DropdownMenuContent align={'end'} sideOffset={15}>
          <DropdownMenuItem onSelect={openProfile}>
            Signed in as&nbsp;<strong>{user?.username}</strong>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onSelect={openSettings}>Settings</DropdownMenuItem>
          <DropdownMenuItem>Help & Feedback</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onSelect={handleLogout}>Logout</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenuPortal>
    </DropdownMenuRoot>
  );
};

export default UserDropdown;
