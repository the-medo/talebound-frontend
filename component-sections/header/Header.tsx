import React from 'react';
import Menu from './Menu';
import { styled } from '../../styles/stitches.config';
import { HeaderTransparentSection } from '../../components/HeaderTransparentSection/HeaderTransparentSection';
import { Button } from '../../components/Button/Button';
import { BsPlus } from 'react-icons/bs';
import { useAuth } from '../../hooks/useAuth';
import { LuCompass, LuComponent, LuGlobe2, LuUsers } from 'react-icons/lu';
import { Boxik } from './Boxik';
import { BoxikIcon } from './BoxicIcon';

const BaseHeader = styled('div', {
  width: '100%',
  height: '300px',
  backgroundImage:
    'url("https://imagedelivery.net/zchNIWFramhipgMjPiGPQQ/efaae215-d5c5-4070-e61d-949f10521200/original")',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover',
  position: 'relative',
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

const A = styled('div', {
  display: 'flex',
  position: 'absolute',
  top: 'calc(50% + 25px)',
  left: '50%',
  transform: 'translate(-50%, -50%) rotate(45deg)',
  borderRadius: '50%',

  ['img']: {
    // borderRadius: '50%',
    width: '75px',
    height: '75px',
    outline: '2px solid $primary500',
  },
});

const IMG_SIZE = 25;
const SUB_ICON_SIZE = Math.sqrt(2 * IMG_SIZE ** 2);
const MARGIN = 7;

const SubIconWrapper = styled('div', {
  width: `${IMG_SIZE}px`,
  height: `${IMG_SIZE}px`,
  transform: 'rotate(45deg)',
  // border: '2px solid red',
  margin: `${MARGIN}px`,

  overflow: 'hidden',
});

const SubIcon = styled('img', {
  width: `${SUB_ICON_SIZE}px`,
  height: `${SUB_ICON_SIZE}px`,
  transform: ' rotate(-45deg)',
  margin: `-${MARGIN}px`,
  opacity: 0.9,
});

const Header: React.FC = () => {
  const { user } = useAuth();

  return (
    <BaseHeader>
      <Menu />
      <HeaderTransparentSection position="left">
        <Boxik x="left" y="top">
          <SubIconWrapper>
            <SubIcon
              src={
                'https://imagedelivery.net/zchNIWFramhipgMjPiGPQQ/86a41b17-730a-49ea-3cab-fd42467f7100/100x100'
              }
              alt={'World icon'}
            />
          </SubIconWrapper>
          <SubIconWrapper>
            <SubIcon
              src={
                'https://imagedelivery.net/zchNIWFramhipgMjPiGPQQ/86a41b17-730a-49ea-3cab-fd42467f7100/100x100'
              }
              alt={'World icon'}
            />
          </SubIconWrapper>
          <SubIconWrapper>
            <SubIcon
              src={
                'https://imagedelivery.net/zchNIWFramhipgMjPiGPQQ/86a41b17-730a-49ea-3cab-fd42467f7100/100x100'
              }
              alt={'World icon'}
            />
          </SubIconWrapper>
        </Boxik>
        <Boxik x="right" y="top">
          Worlds
        </Boxik>

        <Boxik x="left" y="bottom">
          Characters
        </Boxik>

        <Boxik x="right" y="bottom">
          Play modes
        </Boxik>

        <BoxikIcon x="left" y="top">
          <LuCompass size={20} />
        </BoxikIcon>
        <BoxikIcon x="right" y="top">
          <LuGlobe2 size={20} />
        </BoxikIcon>
        <BoxikIcon x="left" y="bottom">
          <LuUsers size={20} />
        </BoxikIcon>
        <BoxikIcon x="right" y="bottom">
          <LuComponent size={20} />
        </BoxikIcon>

        <A>
          <img src={user?.img?.url} alt={'World icon'} />
        </A>
        {/*<InfoSection linkTitle={'Browse worlds'} linkHref={'/worlds'}>
          No characters
        </InfoSection>
        <InfoSection linkTitle={'Browse quests'} linkHref={'/quests'}>
          No quests
        </InfoSection>
        <InfoSection linkTitle={'Browse worlds'} linkHref={'/quests'}>
          No worlds
        </InfoSection>*/}
        {/*<WorldIconWrapper>
          <img
            src={
              'https://imagedelivery.net/zchNIWFramhipgMjPiGPQQ/86a41b17-730a-49ea-3cab-fd42467f7100/100x100'
            }
            alt={'World icon'}
            width={50}
            height={50}
          />
          <img
            src={
              'https://imagedelivery.net/zchNIWFramhipgMjPiGPQQ/b5bca192-5a78-49d3-869d-e259f1b75400/public'
            }
            alt={'World icon'}
            width={50}
            height={50}
          />
        </WorldIconWrapper>*/}
      </HeaderTransparentSection>
      <HeaderTransparentSection position="right">
        <Button size="xl" color="semiGhost">
          <BsPlus />
          Create world
        </Button>
      </HeaderTransparentSection>
    </BaseHeader>
  );
};

export default Header;
