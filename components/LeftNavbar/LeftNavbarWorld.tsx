import React from 'react';
import { useGetWorldById } from '../../api/worlds/useGetWorldById';
import Navbar from './Navbar';

interface LeftNavbarWorldProps {
  worldId: number;
}

const LeftNavbarWorld: React.FC<LeftNavbarWorldProps> = ({ worldId }) => {
  const { data: worldData } = useGetWorldById({ variables: worldId });
  const menuId = worldData?.worldMenuId ?? 0;

  return <Navbar menuId={menuId} urlPrefix={`/worlds/${worldId}`} />;
};

export default LeftNavbarWorld;
