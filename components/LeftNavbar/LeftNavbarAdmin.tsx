import React from 'react';
import NavbarHeader from './NavbarHeader';
import { Navbar, NavbarItem, NavbarSquare } from './navbarComponents';

const LeftNavbarAdmin: React.FC = () => {
  return (
    <Navbar>
      <NavbarHeader title="admin" />
      <NavbarItem href="/admin">
        Dashboard <NavbarSquare />
      </NavbarItem>
      <NavbarHeader title="tags" />
      <NavbarItem href="/admin/world-tags">
        World tags <NavbarSquare />
      </NavbarItem>
    </Navbar>
  );
};

export default LeftNavbarAdmin;
