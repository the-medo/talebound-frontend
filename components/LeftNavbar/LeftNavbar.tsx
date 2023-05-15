import { styled } from '@nextui-org/react';
import React, { useEffect } from 'react';
import { default as NextLink } from 'next/link';
import { AiFillAccountBook, AiFillAndroid, AiFillHome } from 'react-icons/ai';

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

const NavbarHeader = styled('div', {
  position: 'relative',
  width: '100%',
  height: '50px',
  color: '$primary100',

  ['& .bg']: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundImage: 'url("../../assets/menu/menu-bg-3.png")',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    opacity: 0.25,
    zIndex: 1,
  },
  ['& .content']: {
    position: 'absolute',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: 2,
    fontSize: '$4xl',
    fontFamily: '$decorative',
    backgroundImage: 'url("../../assets/menu/menu-bg-3.png")',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundClip: 'text',
    color: 'transparent',
  },
});

export type NItem = {
  label: string;
  icon?: React.ReactNode;
  href: string;
};

const testItems: NItem[] = [
  {
    label: 'Overview',
    icon: <AiFillHome />,
    href: '/',
  },
  {
    label: 'News',
    icon: <AiFillAccountBook />,
    href: '/about',
  },
  {
    label: 'Quests',
    icon: <AiFillAndroid />,
    href: '/contact',
  },
];

interface NavbarProps {}

const LeftNavbar: React.FC<NavbarProps> = () => {
  useEffect(() => {}, []);

  return (
    <Navbar>
      <NavbarHeader>
        <div className="bg" />
        <div className="content">explore</div>
      </NavbarHeader>
      <NavbarItem href="/explore/news">
        News <NavbarItemImg src="../../assets/images/img12.png" />
      </NavbarItem>
      <NavbarItem href="/explore/worlds">
        Worlds <NavbarItemImg src="../../assets/images/img24.png" />
      </NavbarItem>
      <NavbarItem href="/explore/quests">
        Quests <NavbarItemImg src="../../assets/images/img28.png" />
      </NavbarItem>

      <NavbarHeader>
        <div className="bg" />
        <div className="content">content</div>
      </NavbarHeader>
      <NavbarItem href="/content/images">
        Images <NavbarItemImg src="../../assets/images/img35.png" />
      </NavbarItem>
      <NavbarItem href="/content/posts">
        Posts <NavbarItemImg src="../../assets/images/img14.png" />
      </NavbarItem>

      <NavbarHeader>
        <div className="bg" />
        <div className="content">guides</div>
      </NavbarHeader>
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
