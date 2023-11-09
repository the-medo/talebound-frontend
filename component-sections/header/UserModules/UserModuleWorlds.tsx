import React from 'react';
import { AspectBoxIcon } from '../ControlPanel/AspectBoxIcon';
import { LuGlobe2 } from 'react-icons/lu';
import AspectDiamond from '../ControlPanel/AspectDiamond';
import { AspectBox } from '../ControlPanel/AspectBox';
import { useSelector } from 'react-redux';
import { useGetUserModules } from '../../../api/users/useGetUserModules';
import WorldAspectDiamond from './WorldAspectDiamond';

interface UserModuleWorldsProps {}

const UserModuleWorlds: React.FC<UserModuleWorldsProps> = () => {
  const userId = useSelector((state) => state.auth.user?.id);

  const { data: moduleData } = useGetUserModules({
    variables: userId ?? 0,
  });

  const worldIds = (moduleData?.worlds ?? []).map((m) => m.id!);

  return (
    <AspectBox x="right" y="top">
      <AspectBoxIcon x="right" y="top">
        <LuGlobe2 size={20} />
      </AspectBoxIcon>
      {worldIds.length === 0 && (
        <AspectDiamond imgIdx={0} totalCount={0} index={0} x="right" y="top" text={'No worlds'} />
      )}
      {worldIds.map(
        (wid, idx) =>
          wid && (
            <WorldAspectDiamond
              key={wid}
              worldId={wid}
              totalCount={worldIds.length}
              index={idx + 1}
            />
          ),
      )}
    </AspectBox>
  );
};

export default UserModuleWorlds;
