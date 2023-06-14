import React, { Key, useCallback } from 'react';
import { Avatar, Dropdown, Link, Navbar, Text } from '@nextui-org/react';
import Logo from '../../components/Logo/Logo';
import { Client } from 'react-hydration-provider';
import { useAuth } from '../../hooks/useAuth';
import { setUser } from '../../utils/auth/userSlice';
import { useLogout } from '../../api/useLogout';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { DEFAULT_AVATAR_URL } from '../../utils/constants';
import UserDropdown from '../../components/UserDropdown/UserDropdown';
import { styled } from '../../styles/stitches.config';

const HeaderHeading = styled('h1', {
  margin: '0',
  fontSize: '2.5rem',
  lineHeight: '2.5rem',
  left: '10px',
  top: '10px',
  fontFamily: '$decorative',
  color: '$dark1',
  display: 'inline',
  padding: '$0 $8',
});

const Menu: React.FC = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { user } = useAuth();
  const collapseItems = ['Home', 'Worlds', 'Articles', 'Create'];

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
    <Navbar
      css={{ backdropFilter: 'saturate(180%) blur(var(--nextui--navbarBlur)) opacity(0)' }}
      isBordered
      isCompact
      variant="sticky"
      maxWidth="fluid"
    >
      <Navbar.Brand>
        <Navbar.Toggle aria-label="toggle navigation" showIn="xs" />
        <Logo size="3rem" />
        <HeaderHeading>Talebound</HeaderHeading>
      </Navbar.Brand>
      <Navbar.Content
        css={{
          '@xs': {
            w: '12%',
            jc: 'flex-end',
          },
        }}
      >
        <Client>
          <UserDropdown />
          <Dropdown placement="bottom-right">
            <Navbar.Item id="navbar-item-1">
              <Dropdown.Trigger>
                <Avatar
                  bordered
                  as="button"
                  color="primary"
                  size="md"
                  src={user?.img?.url ?? DEFAULT_AVATAR_URL}
                />
              </Dropdown.Trigger>
            </Navbar.Item>
            <Dropdown.Menu
              aria-label="User menu actions"
              color="primary"
              onAction={handleUserDropdown}
            >
              <Dropdown.Item key="profile" textValue="asdf" css={{ height: '$18' }}>
                <Text b color="inherit" css={{ d: 'flex' }}>
                  Signed in as
                </Text>
                <Text b color="inherit" css={{ d: 'flex' }}>
                  {user?.email}
                </Text>
              </Dropdown.Item>
              <Dropdown.Item key="settings" textValue="Settings" withDivider>
                Settings
              </Dropdown.Item>
              <Dropdown.Item key="help_and_feedback" textValue="Help & Feedback">
                Help & Feedback
              </Dropdown.Item>
              <Dropdown.Item key="logout" textValue="Logout" withDivider color="error">
                Log Out
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Client>
      </Navbar.Content>
      <Navbar.Collapse>
        {collapseItems.map((item) => (
          <Navbar.CollapseItem key={item}>
            <Link
              color="inherit"
              css={{
                minWidth: '100%',
              }}
              href="#"
            >
              {item}
            </Link>
          </Navbar.CollapseItem>
        ))}
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Menu;
