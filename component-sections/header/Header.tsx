import React from 'react';
import Menu from './Menu';
import InfoSection from '../../components/InfoSection';
import { styled } from '../../styles/stitches.config';

const BaseHeader = styled('div', {
  width: '100%',
  height: '310px',
  backgroundImage:
    'url("https://imagedelivery.net/zchNIWFramhipgMjPiGPQQ/efaae215-d5c5-4070-e61d-949f10521200/original")',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover',
  position: 'relative',
});

const HeaderOverview = styled('div', {
  position: 'absolute',
  backgroundColor: '$transparent40',
  width: '250px',
  top: 0,
  left: 0,
  bottom: 0,
  paddingTop: '60px',
  display: 'flex',
  gap: '$md',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',

  ['span']: {
    fontSize: '$lg',
    fontWeight: '$bold',
  },
});

const WorldIconWrapper = styled('div', {
  width: '100%',
  display: 'flex',
  justifyContent: 'space-evenly',
  alignItems: 'center',

  ['img']: {
    borderRadius: '50%',
  },
});

const Header: React.FC = () => {
  return (
    <BaseHeader>
      <Menu />
      <HeaderOverview>
        <InfoSection linkTitle={'Browse worlds'} linkHref={'/worlds'}>
          No characters
        </InfoSection>
        <InfoSection linkTitle={'Browse quests'} linkHref={'/quests'}>
          No quests
        </InfoSection>
        <WorldIconWrapper>
          <img src={'../assets/images/img1.png'} alt={'World icon'} width={50} height={50} />
          <img src={'../assets/images/img2.png'} alt={'World icon'} width={50} height={50} />
        </WorldIconWrapper>
      </HeaderOverview>
    </BaseHeader>
  );
};

export default Header;
