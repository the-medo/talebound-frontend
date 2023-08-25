import React from 'react';
import NavbarHeader from './NavbarHeader';
import { NavbarWrapper, NavbarItem, NavbarSquare } from './navbarComponents';

const LeftNavbarAdmin: React.FC = () => {
  return (
    <NavbarWrapper>
      <NavbarHeader title="admin" />
      <NavbarItem href="/admin">
        Dashboard <NavbarSquare />
      </NavbarItem>
      <NavbarHeader title="tags" />
      <NavbarItem href="/admin/world-tags">
        World tags <NavbarSquare />
      </NavbarItem>
    </NavbarWrapper>
  );
};

export default LeftNavbarAdmin;
