import React from 'react';
import NavbarHeader from './NavbarHeader';
import { Navbar, NavbarItem, NavbarItemImg } from './navbarComponents';

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
