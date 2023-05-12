import { styled } from '@nextui-org/react';
import React, { useEffect } from 'react';
import { default as NextLink } from 'next/link';
import { AiFillAccountBook, AiFillAndroid, AiFillHome } from 'react-icons/ai';

const Navbar = styled('nav', {
  display: 'flex',
  flexDirection: 'column',
  width: '200px',
  flexGrow: 0,
  backgroundColor: '#2f3738',
  gap: '$sm',
  padding: '$sm',
  opacity: 1,
});

const NavbarItem = styled(NextLink, {
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'flex-start',
  gap: '$md',
  padding: '$sm',
  color: '$primary200',
  borderRadius: '$md',
  transition: 'all 0.5s ease-in-out',
  textDecoration: 'none',
  '&:hover': {
    backgroundColor: '$primary200',
    color: '#2f3738',
  },
  '&:active': {
    backgroundColor: '$primary200',
    color: '$primary',
  },
  variants: {
    active: {
      true: {
        backgroundColor: '$primary200',
        color: '#2f3738',
        fontWeight: '$bold',
      },
    },
  },
});

export type NItem = {
  label: string;
  icon?: React.ReactNode;
  href: string;
};

const testItems: NItem[] = [
  {
    label: 'Home',
    icon: <AiFillHome />,
    href: '/',
  },
  {
    label: 'About',
    icon: <AiFillAccountBook />,
    href: '/about',
  },
  {
    label: 'Contact',
    icon: <AiFillAndroid />,
    href: '/contact',
  },
];

interface NavbarProps {}

const LeftNavbar: React.FC<NavbarProps> = () => {
  useEffect(() => {}, []);

  return (
    <Navbar>
      {testItems.map((item, i) => (
        <NavbarItem active={i === 0} href={item.href}>
          {item.icon} {item.label}
        </NavbarItem>
      ))}
    </Navbar>
  );
};

export default LeftNavbar;
