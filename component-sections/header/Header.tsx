import React, { useCallback, useState } from 'react';
import Menu from './Menu';
import { styled } from '../../styles/stitches.config';
import { HeaderTransparentSection } from '../../components/HeaderTransparentSection/HeaderTransparentSection';
import { Button } from '../../components/Button/Button';
import { BsPlus } from 'react-icons/bs';
import { useAuth } from '../../hooks/useAuth';
import { LuCompass, LuComponent, LuGlobe2, LuUsers } from 'react-icons/lu';
import { Boxik } from './Boxik';
import { BoxikIcon } from './BoxicIcon';
import MenuMarker from './MenuMarker';

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

interface BoxikData {
  marker: {
    imgIdx: number;
  }[];
}

const Header: React.FC = () => {
  const { user } = useAuth();

  const generateBoxikData = useCallback(() => {
    const randNumber = Math.floor(Math.random() * 4) + 1;
    const boxikData: BoxikData = {
      marker: [],
    };
    for (let i = 0; i < randNumber; i++) {
      boxikData.marker.push({
        imgIdx: Math.floor(Math.random() * 10),
      });
    }

    return boxikData;
  }, []);

  const [questData, setQuestData] = useState<BoxikData>(generateBoxikData());
  const [worldData, setWorldData] = useState<BoxikData>(generateBoxikData());
  const [characterData, setCharacterData] = useState<BoxikData>(generateBoxikData());
  const [playModeData, setPlayModeData] = useState<BoxikData>(generateBoxikData());

  return (
    <BaseHeader>
      <Menu />
      <HeaderTransparentSection position="left">
        <Boxik x="left" y="top">
          {questData.marker.map((marker, idx) => (
            <MenuMarker
              key={idx}
              imgIdx={marker.imgIdx}
              totalCount={questData.marker.length}
              index={idx + 1}
              x="left"
              y="top"
            />
          ))}
        </Boxik>
        <Boxik x="right" y="top">
          {worldData.marker.map((marker, idx) => (
            <MenuMarker
              key={idx}
              imgIdx={marker.imgIdx}
              totalCount={worldData.marker.length}
              index={idx + 1}
              x="right"
              y="top"
            />
          ))}
        </Boxik>

        <Boxik x="left" y="bottom">
          {characterData.marker.map((marker, idx) => (
            <MenuMarker
              key={idx}
              imgIdx={marker.imgIdx}
              totalCount={characterData.marker.length}
              index={idx + 1}
              x="left"
              y="bottom"
            />
          ))}
        </Boxik>

        <Boxik x="right" y="bottom">
          {playModeData.marker.map((marker, idx) => (
            <MenuMarker
              key={idx}
              imgIdx={marker.imgIdx}
              totalCount={playModeData.marker.length}
              index={idx + 1}
              x="right"
              y="bottom"
            />
          ))}
        </Boxik>

        <BoxikIcon x="left" y="top" onClick={() => setQuestData(generateBoxikData())}>
          <LuCompass size={20} />
        </BoxikIcon>
        <BoxikIcon x="right" y="top" onClick={() => setWorldData(generateBoxikData())}>
          <LuGlobe2 size={20} />
        </BoxikIcon>
        <BoxikIcon x="left" y="bottom" onClick={() => setCharacterData(generateBoxikData())}>
          <LuUsers size={20} />
        </BoxikIcon>
        <BoxikIcon x="right" y="bottom" onClick={() => setPlayModeData(generateBoxikData())}>
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
