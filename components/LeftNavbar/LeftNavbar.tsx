import React from 'react';
import { default as NextLink } from 'next/link';
import { styled } from '../../styles/stitches.config';
import NavbarHeader from './NavbarHeader';

const Navbar = styled('nav', {
  display: 'flex',
  flexDirection: 'column',
  width: '250px',
  minWidth: '250px',
  flexGrow: 0,
  backgroundColor: '#2f3738',
  gap: '$sm',
  opacity: 1,
});

const NavbarItemImg = styled('img', {
  width: '2.25rem',
  height: '2.25rem',
  borderRadius: '50%',
  transition: 'all 0.3s ease-in-out',
});

const NavbarItem = styled(NextLink, {
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: '$md',
  padding: '$xs',
  marginLeft: '$sm',
  marginRight: '$sm',
  color: '$primary200',
  borderRadius: '$md',
  transition: 'all 0.3s ease-in-out',
  textDecoration: 'none',
  opacity: 0.7,

  '&:hover': {
    backgroundColor: '#3e4747',
    opacity: 1,
    paddingLeft: '$md',
  },

  variants: {
    active: {
      true: {
        backgroundColor: '#3e4747',
        fontWeight: '$bold',
        opacity: 0.9,
        paddingLeft: '$lg',
        [`& ${NavbarItemImg}`]: {
          border: '2px solid currentColor',
        },
      },
    },
  },
});

const LeftNavbar: React.FC = () => {
  return (
    <Navbar>
      <NavbarHeader title="explore" />
      <NavbarItem href="/explore/news">
        News <NavbarItemImg src="../../assets/images/img12.png" />
      </NavbarItem>
      <NavbarItem href="/explore/worlds">
        Worlds <NavbarItemImg src="../../assets/images/img24.png" />
      </NavbarItem>
      <NavbarItem href="/explore/quests">
        Quests <NavbarItemImg src="../../assets/images/img28.png" />
      </NavbarItem>

      <NavbarHeader title="content" />
      <NavbarItem href="/content/images">
        Images <NavbarItemImg src="../../assets/images/img35.png" />
      </NavbarItem>
      <NavbarItem href="/content/posts">
        Posts <NavbarItemImg src="../../assets/images/img14.png" />
      </NavbarItem>

      <NavbarHeader title="guides" />
      <NavbarItem href="/guides/playing">
        Playing <NavbarItemImg src="../../assets/images/img33.png" />
      </NavbarItem>
      <NavbarItem href="/guides/world-creation">
        World creation <NavbarItemImg src="../../assets/images/img19.png" />
      </NavbarItem>
    </Navbar>
  );
};

export default LeftNavbar;
