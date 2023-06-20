import React from 'react';
import Logo from '../../components/Logo/Logo';
import { Client } from 'react-hydration-provider';
import UserDropdown from '../../components/UserDropdown/UserDropdown';
import { styled } from '../../styles/stitches.config';
import { DecorativeTitle } from '../../components/Typography/DecorativeTitle';
import { Row } from '../../components/Flex/Flex';
import Link from 'next/link';

const StyledNavbar = styled('nav', {
  backgroundColor: 'rgba(255, 255, 255, 0.8)',
  backdropFilter: 'saturate(180%) blur(8px) opacity(0)',
  boxShadow: '0 0 5px 0.1px $colors$primary900',
  position: 'sticky',
  top: '0',
  zIndex: 1000,
  width: '100%',
  height: '3rem',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: 0,
  paddingRight: '$md',
});

const Menu: React.FC = () => {
  return (
    <StyledNavbar>
      <Link href="/">
        <Row justifyContent="center" gap="sm" css={{ width: '250px' }}>
          <Logo size="2.5rem" />
          <DecorativeTitle>Talebound</DecorativeTitle>
        </Row>
      </Link>
      <Client>
        <UserDropdown />
      </Client>
    </StyledNavbar>
  );
};

export default Menu;
