import React from 'react';
import { Avatar, Dropdown, Link, Navbar, styled, Text } from '@nextui-org/react';
import Logo from './Logo';

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
  const collapseItems = ['Home', 'Worlds', 'Articles', 'Create'];

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
      <Navbar.Content enableCursorHighlight hideIn="xs" variant="highlight-solid">
        <Navbar.Link href="#">Home</Navbar.Link>
        <Navbar.Link isActive href="#">
          Worlds
        </Navbar.Link>
        <Navbar.Link href="#">Articles</Navbar.Link>
        <Navbar.Link href="#">Create</Navbar.Link>
      </Navbar.Content>
      <Navbar.Content
        css={{
          '@xs': {
            w: '12%',
            jc: 'flex-end',
          },
        }}
      >
        <Dropdown placement="bottom-right">
          <Navbar.Item>
            <Dropdown.Trigger>
              <Avatar
                bordered
                as="button"
                color="primary"
                size="md"
                src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
              />
            </Dropdown.Trigger>
          </Navbar.Item>
          <Dropdown.Menu
            aria-label="User menu actions"
            color="primary"
            onAction={(actionKey) => console.log({ actionKey })}
          >
            <Dropdown.Item key="profile" css={{ height: '$18' }}>
              <Text b color="inherit" css={{ d: 'flex' }}>
                Signed in as
              </Text>
              <Text b color="inherit" css={{ d: 'flex' }}>
                zoey@example.com
              </Text>
            </Dropdown.Item>
            <Dropdown.Item key="settings" withDivider>
              Settings
            </Dropdown.Item>
            <Dropdown.Item key="help_and_feedback">Help & Feedback</Dropdown.Item>
            <Dropdown.Item key="logout" withDivider color="error">
              Log Out
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
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
