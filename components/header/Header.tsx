import {Navbar, styled} from "@nextui-org/react";
import React from "react";

const BaseHeader = styled('div', {
  width: '100%',
  height: '310px',
  marginTop: '-60px',
  backgroundImage: 'url("../assets/images/header.png")',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover',
  position: 'relative',
});


const StyledNavbar = styled(Navbar, {

});

interface HeaderProps {
}

const Header: React.FC<HeaderProps> = () => {
  return (
    <BaseHeader>

    </BaseHeader>
  );
}

export default Header;