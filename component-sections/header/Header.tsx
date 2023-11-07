import React, { useMemo, useState } from 'react';
import Menu from './Menu';
import { styled } from '../../styles/stitches.config';
import { HeaderTransparentSection } from '../../components/HeaderTransparentSection/HeaderTransparentSection';
import { Button } from '../../components/Button/Button';
import { BsPlus } from 'react-icons/bs';
import { useAuth } from '../../hooks/useAuth';
import { LuCompass, LuComponent, LuGlobe2, LuUsers } from 'react-icons/lu';
import { AspectBox } from './ControlPanel/AspectBox';
import { AspectBoxIcon } from './ControlPanel/AspectBoxIcon';
import AspectDiamond from './ControlPanel/AspectDiamond';
import { AspectData, generateAspectData } from './ControlPanel/utilsAspectBox';
import { UserDiamond } from './ControlPanel/UserDiamond';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { ReduxState } from '../../store';
import { DEFAULT_AVATAR_URL } from '../../utils/constants';
import { useGetUserModules } from '../../api/users/useGetUserModules';

const BaseHeader = styled('div', {
  width: '100%',
  height: '300px',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover',
  position: 'relative',
});

const Header: React.FC = () => {
  const { user } = useAuth();
  const image = useSelector((state: ReduxState) => state.global.headerImage);

  const [questData, setQuestData] = useState<AspectData>({ marker: [] });
  const [characterData, setCharacterData] = useState<AspectData>({ marker: [] });
  const [playModeData, setPlayModeData] = useState<AspectData>({ marker: [] });

  const userId = useSelector((state: ReduxState) => state.auth.user?.id);

  const { data: moduleData } = useGetUserModules({
    variables: userId ?? 0,
  });

  const worlds = moduleData?.worlds ?? [];

  return (
    <BaseHeader css={{ backgroundImage: `url("${image}")` }}>
      <Menu />
      <HeaderTransparentSection position="left">
        <AspectBox x="left" y="top">
          <AspectBoxIcon x="left" y="top" onClick={() => setQuestData(generateAspectData())}>
            <LuCompass size={20} />
          </AspectBoxIcon>
          {questData.marker.length === 0 && (
            <AspectDiamond
              imgIdx={0}
              totalCount={0}
              index={0}
              x="left"
              y="top"
              text={'No quests'}
            />
          )}
          {questData.marker.map((marker, idx) => (
            <AspectDiamond
              key={idx}
              imgIdx={marker.imgIdx}
              totalCount={questData.marker.length}
              index={idx + 1}
              x="left"
              y="top"
            />
          ))}
        </AspectBox>
        <AspectBox x="right" y="top">
          <AspectBoxIcon x="right" y="top">
            <LuGlobe2 size={20} />
          </AspectBoxIcon>
          {worlds.length === 0 && (
            <AspectDiamond
              imgIdx={0}
              totalCount={0}
              index={0}
              x="right"
              y="top"
              text={'No worlds'}
            />
          )}
          {worlds.map((w, idx) => (
            <AspectDiamond
              key={w.id}
              imgIdx={0}
              totalCount={worlds.length}
              avatarUrl={m.imageAvatar}
              linkUrl={`/worlds/${worldId}/detail`}
              name={data?.world.name}
              entityId={data?.world.id}
              index={idx + 1}
              x="right"
              y="top"
            />
          ))}
        </AspectBox>

        <AspectBox x="left" y="bottom">
          <AspectBoxIcon x="left" y="bottom" onClick={() => setCharacterData(generateAspectData())}>
            <LuUsers size={20} />
          </AspectBoxIcon>
          {characterData.marker.length === 0 && (
            <AspectDiamond
              imgIdx={0}
              totalCount={0}
              index={0}
              x="left"
              y="bottom"
              text={'No characters'}
            />
          )}
          {characterData.marker.map((marker, idx) => (
            <AspectDiamond
              key={idx}
              imgIdx={marker.imgIdx}
              totalCount={characterData.marker.length}
              index={idx + 1}
              x="left"
              y="bottom"
            />
          ))}
        </AspectBox>

        <AspectBox x="right" y="bottom">
          <AspectBoxIcon x="right" y="bottom" onClick={() => setPlayModeData(generateAspectData())}>
            <LuComponent size={20} />
          </AspectBoxIcon>

          {playModeData.marker.length === 0 && (
            <AspectDiamond
              imgIdx={0}
              totalCount={0}
              index={0}
              x="right"
              y="bottom"
              text={'No play modes'}
            />
          )}
          {playModeData.marker.map((marker, idx) => (
            <AspectDiamond
              key={idx}
              imgIdx={marker.imgIdx}
              totalCount={playModeData.marker.length}
              index={idx + 1}
              x="right"
              y="bottom"
            />
          ))}
        </AspectBox>

        <UserDiamond>
          <Link href={`/user/${user?.id}/profile`}>
            <img src={user?.img?.url ?? DEFAULT_AVATAR_URL} alt="User avatar" />
          </Link>
        </UserDiamond>
      </HeaderTransparentSection>
      <HeaderTransparentSection position="right" id="action-box" />
    </BaseHeader>
  );
};

export default Header;
