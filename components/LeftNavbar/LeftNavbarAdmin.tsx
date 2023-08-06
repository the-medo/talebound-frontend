import React from 'react';
import NavbarHeader from './NavbarHeader';
import { Navbar, NavbarItem, NavbarItemImg } from './navbarComponents';

const LeftNavbarAdmin: React.FC = () => {
  return (
    <Navbar>
      <NavbarHeader title="admin" />
      <NavbarItem href="/explore/news">
        World tags <NavbarItemImg src="../../assets/images/img12.png" />
      </NavbarItem>
    </Navbar>
  );
};

export default LeftNavbarAdmin;
