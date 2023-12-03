import React, { useState } from 'react';
import { AspectBoxIcon } from '../ControlPanel/AspectBoxIcon';
import { ModuleData, generateModuleData } from '../ControlPanel/utilsAspectBox';
import { LuComponent } from 'react-icons/lu';
import AspectDiamond from '../ControlPanel/AspectDiamond';
import { AspectBox } from '../ControlPanel/AspectBox';

interface UserModuleSystemsProps {}

const UserModuleSystems: React.FC<UserModuleSystemsProps> = () => {
  const [system, setSystem] = useState<ModuleData>({ marker: [] });

  return (
    <AspectBox x="right" y="bottom">
      <AspectBoxIcon x="right" y="bottom" onClick={() => setSystem(generateModuleData())}>
        <LuComponent size={20} />
      </AspectBoxIcon>

      {system.marker.length === 0 && (
        <AspectDiamond
          imgIdx={0}
          totalCount={0}
          index={0}
          x="right"
          y="bottom"
          text={'No play modes'}
        />
      )}
      {system.marker.map((marker, idx) => (
        <AspectDiamond
          key={idx}
          imgIdx={marker.imgIdx}
          totalCount={system.marker.length}
          index={idx + 1}
          x="right"
          y="bottom"
        />
      ))}
    </AspectBox>
  );
};

export default UserModuleSystems;
