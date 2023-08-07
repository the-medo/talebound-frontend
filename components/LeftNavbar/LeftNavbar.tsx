import React from 'react';
import NavbarHeader from './NavbarHeader';
import { Navbar, NavbarItem, NavbarSquare } from './navbarComponents';

const LeftNavbar: React.FC = () => {
  return (
    <Navbar>
      <NavbarHeader title="explore" />
      <NavbarItem href="/news">
        News <NavbarSquare />
      </NavbarItem>
      <NavbarItem href="/worlds">
        Worlds <NavbarSquare />
      </NavbarItem>
      <NavbarItem href="/quests">
        Quests <NavbarSquare />
      </NavbarItem>

      <NavbarHeader title="content" />
      <NavbarItem href="/content/images">
        Images <NavbarSquare />
      </NavbarItem>
      <NavbarItem href="/content/posts">
        Posts <NavbarSquare />
      </NavbarItem>

      <NavbarHeader title="guides" />
      <NavbarItem href="/guides/playing">
        Playing <NavbarSquare />
      </NavbarItem>
      <NavbarItem href="/guides/world-creation">
        World creation <NavbarSquare />
      </NavbarItem>
    </Navbar>
  );
};

export default LeftNavbar;
