import React from "react";
import {styled} from "@nextui-org/react";
import Login from "./Login";

const Header = styled('div', {
  width: '100%',
  height: '430px',
  backgroundImage: 'url("../assets/header/header-v1.png")',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover',
  position: 'relative',
});

const HeaderHeading = styled('h1', {
  margin: '0',
  position: 'absolute',
  fontSize: '10rem',
  left: '50%',
  bottom: '$0',
  transform: 'translate(-50%, 0%)',
  fontFamily: '$decorative',
  textShadow: '1px 1px 4px rgba(255, 255, 255, 0.2)',
  transition: 'text-shadow 0.3s ease-in-out',
  backgroundImage: '$gradientDark',
  backgroundClip: 'text',
  color: 'transparent',
  display: 'inline',

  '&:hover': {
    textShadow: '1px 1px 1px rgba(0, 0, 0, 0.2)',
  }
});

const HeaderSubheading = styled('h2', {
  fontFamily: '$heading',
  margin: '0',
  position: 'absolute',
  left: '50%',
  bottom: '$8',
  transform: 'translate(-50%, 0%)',
  textShadow: '1px 1px 4px rgba(255, 255, 255, 0.2)',
  transition: 'text-shadow 0.3s ease-in-out',
  textTransform: 'uppercase',
  color: '$primary700',
  fontSize: '1.2rem',
  backgroundImage: '$gradientDark',
  backgroundClip: 'text',
  display: 'inline',
});


interface HomepageHeaderProps {
}

const HomepageHeader: React.FC<HomepageHeaderProps> = () => {
  return (
    <Header>
      <HeaderHeading>Talebound</HeaderHeading>
      <HeaderSubheading>the ultimate text-based adventure platform</HeaderSubheading>
      <Login />
    </Header>
  );
}

export default HomepageHeader;