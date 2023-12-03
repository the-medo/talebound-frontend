import React, { useState } from 'react';
import { AspectBoxIcon } from '../ControlPanel/AspectBoxIcon';
import { ModuleData, generateModuleData } from '../ControlPanel/utilsAspectBox';
import { LuUsers } from 'react-icons/lu';
import AspectDiamond from '../ControlPanel/AspectDiamond';
import { AspectBox } from '../ControlPanel/AspectBox';

interface UserModuleCharactersProps {}

const UserModuleCharacters: React.FC<UserModuleCharactersProps> = () => {
  const [characterData, setCharacterData] = useState<ModuleData>({ marker: [] });

  return (
    <AspectBox x="left" y="bottom">
      <AspectBoxIcon x="left" y="bottom" onClick={() => setCharacterData(generateModuleData())}>
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
  );
};

export default UserModuleCharacters;
