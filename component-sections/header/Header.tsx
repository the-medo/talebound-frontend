import React, { useState } from 'react';
import Menu from './Menu';
import { styled } from '../../styles/stitches.config';
import { HeaderTransparentSection } from '../../components/HeaderTransparentSection/HeaderTransparentSection';
import { useAuth } from '../../hooks/useAuth';
import { LuCompass, LuComponent, LuGlobe2, LuUsers } from 'react-icons/lu';
import { AspectBox } from './ControlPanel/AspectBox';
import { AspectBoxIcon } from './ControlPanel/AspectBoxIcon';
import AspectDiamond from './ControlPanel/AspectDiamond';
import { ModuleData, generateModuleData } from './ControlPanel/utilsAspectBox';
import { UserDiamond } from './ControlPanel/UserDiamond';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { ReduxState, store } from '../../store';
import { DEFAULT_AVATAR_URL } from '../../utils/constants';
import { useGetUserModules } from '../../api/users/useGetUserModules';
import UserModuleQuests from './UserModules/UserModuleQuests';
import UserModuleWorlds from './UserModules/UserModuleWorlds';
import UserModuleCharacters from './UserModules/UserModuleCharacters';
import UserModuleSystems from './UserModules/UserModuleSystems';
import { imageSelectors } from '../../adapters/ImageAdapter';

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
  const headerImage = useSelector((state: ReduxState) => state.global.headerImage);
  const image = imageSelectors.selectById(store.getState(), user?.imgId ?? 0);

  return (
    <BaseHeader css={{ backgroundImage: `url("${headerImage}")` }}>
      <Menu />
      <HeaderTransparentSection position="left">
        <UserModuleQuests />
        <UserModuleWorlds />
        <UserModuleSystems />
        <UserModuleCharacters />
        <UserDiamond>
          <Link href={`/user/${user?.id}/profile`}>
            <img src={image?.url ?? DEFAULT_AVATAR_URL} alt="User avatar" />
          </Link>
        </UserDiamond>
      </HeaderTransparentSection>
      <HeaderTransparentSection position="right" id="action-box" />
    </BaseHeader>
  );
};

export default Header;
