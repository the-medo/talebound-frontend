import React, { useState } from 'react';
import { AspectBoxIcon } from '../ControlPanel/AspectBoxIcon';
import { ModuleData, generateModuleData } from '../ControlPanel/utilsAspectBox';
import { LuCompass } from 'react-icons/lu';
import AspectDiamond from '../ControlPanel/AspectDiamond';
import { AspectBox } from '../ControlPanel/AspectBox';

interface UserModuleQuestsProps {}

const UserModuleQuests: React.FC<UserModuleQuestsProps> = () => {
  const [questData, setQuestData] = useState<ModuleData>({ marker: [] });

  return (
    <AspectBox x="left" y="top">
      <AspectBoxIcon x="left" y="top" onClick={() => setQuestData(generateModuleData())}>
        <LuCompass size={20} />
      </AspectBoxIcon>
      {questData.marker.length === 0 && (
        <AspectDiamond imgIdx={0} totalCount={0} index={0} x="left" y="top" text={'No quests'} />
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
  );
};

export default UserModuleQuests;
