import React from 'react';
import { AspectBoxIcon } from '../ControlPanel/AspectBoxIcon';
import { LuGlobe2 } from 'react-icons/lu';
import AspectDiamond from '../ControlPanel/AspectDiamond';
import { AspectBox } from '../ControlPanel/AspectBox';
import { useSelector } from 'react-redux';
import { useGetUserModules } from '../../../api/users/useGetUserModules';
import { selectWorldsByIds } from '../../../adapters/WorldAdapter';

interface UserModuleWorldsProps {}

const UserModuleWorlds: React.FC<UserModuleWorldsProps> = () => {
  const userId = useSelector((state) => state.auth.user?.id);

  const { data: moduleData } = useGetUserModules({
    variables: userId ?? 0,
  });

  const worldIds = (moduleData?.worlds ?? []).map((m) => m.id!);

  console.log(worldIds);

  const worlds = useSelector((state) => selectWorldsByIds(state, worldIds));
  console.log(worlds);

  return (
    <AspectBox x="right" y="top">
      <AspectBoxIcon x="right" y="top">
        <LuGlobe2 size={20} />
      </AspectBoxIcon>
      {worlds.length === 0 && (
        <AspectDiamond imgIdx={0} totalCount={0} index={0} x="right" y="top" text={'No worlds'} />
      )}
      {worlds.map(
        (w, idx) =>
          w && (
            <AspectDiamond
              key={w.id}
              imgIdx={0}
              totalCount={worlds.length}
              avatarUrl={`asdf`}
              linkUrl={`/worlds/${w.id}/detail`}
              name={w.name}
              entityId={w.id}
              index={idx + 1}
              x="right"
              y="top"
            />
          ),
      )}
    </AspectBox>
  );
};

export default UserModuleWorlds;
