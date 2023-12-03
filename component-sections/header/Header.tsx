import React from 'react';
import Menu from './Menu';
import { styled } from '../../styles/stitches.config';
import { HeaderTransparentSection } from '../../components/HeaderTransparentSection/HeaderTransparentSection';
import { useAuth } from '../../hooks/useAuth';
import { UserDiamond } from './ControlPanel/UserDiamond';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { ReduxState } from '../../store';
import { DEFAULT_AVATAR_URL } from '../../utils/constants';
import UserModuleQuests from './UserModules/UserModuleQuests';
import UserModuleWorlds from './UserModules/UserModuleWorlds';
import UserModuleCharacters from './UserModules/UserModuleCharacters';
import UserModuleSystems from './UserModules/UserModuleSystems';
import { useImage } from '../../hooks/useImage';

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
  const { image } = useImage(user?.imgId ?? 0);

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
