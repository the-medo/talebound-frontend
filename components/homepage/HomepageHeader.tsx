import React from "react";
import {styled} from "@nextui-org/react";
import Login from "./Login";
import HomepageNavigation from "./HomepageNavigation";

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
  bottom: '80px',
  transform: 'translate(-50%, 0%)',
  fontFamily: 'Astloch,serif',
  textShadow: '1px 1px 4px rgba(255, 255, 255, 0.2)',
  transition: 'text-shadow 0.3s ease-in-out',
  backgroundImage: 'linear-gradient(301deg, rgb(21 64 57) 0%, rgb(20 52 47) 100%)',
  backgroundClip: 'text',
  color: 'transparent',
  display: 'inline',

  '&:hover': {
    textShadow: '1px 1px 1px rgba(0, 0, 0, 0.2)',
  }
});

const HeaderSubheading = styled('h2', {
  fontFamily: 'Gudea,sans-serif',
  margin: '0',
  position: 'absolute',
  left: '50%',
  bottom: '75px',
  transform: 'translate(-50%, 0%)',
  textShadow: '1px 1px 4px rgba(255, 255, 255, 0.2)',
  transition: 'text-shadow 0.3s ease-in-out',
  textTransform: 'uppercase',
  color: '#2c554e',
  fontSize: '1.2rem',
  backgroundImage: 'linear-gradient(301deg, rgb(21 64 57) 0%, rgb(20 52 47) 100%)',
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
      <HomepageNavigation />
      <Login />
    </Header>
  );
}

export default HomepageHeader;