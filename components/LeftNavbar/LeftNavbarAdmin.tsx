import React from 'react';
import NavbarHeader from './NavbarHeader';
import { Navbar, NavbarItem, NavbarItemImg } from './navbarComponents';

const LeftNavbarAdmin: React.FC = () => {
  return (
    <Navbar>
      <NavbarHeader title="admin" />
      <NavbarItem href="/admin">
        Dashboard <NavbarItemImg src="../../assets/images/img12.png" />
      </NavbarItem>
      <NavbarHeader title="tags" />
      <NavbarItem href="/admin/world-tags">
        World tags <NavbarItemImg src="../../assets/images/img12.png" />
      </NavbarItem>
    </Navbar>
  );
};

export default LeftNavbarAdmin;
