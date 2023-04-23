import React from "react";
import {HeaderNavigation} from "../global/HeaderNavigation";
import {NavigationItem} from "../global/NavigationItem";

interface HomepageNavigationProps {
}

const HomepageNavigation: React.FC<HomepageNavigationProps> = () => {
  return (
    <HeaderNavigation>
      <ul>
        <li> <NavigationItem href="/">Home</NavigationItem> </li>
        <li> <NavigationItem href="/">About</NavigationItem> </li>
        <li> <NavigationItem href="/">Worlds</NavigationItem> </li>
        <li> <NavigationItem href="/register">Register</NavigationItem> </li>
      </ul>
    </HeaderNavigation>
  );
}

export default HomepageNavigation;