import { styled } from '@nextui-org/react';
import React from 'react';

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

const Header: React.FC = () => {
  return <BaseHeader />;
};

export default Header;
