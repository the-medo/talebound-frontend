import React from 'react';
import { PbModuleType } from '../../../generated/api-types/data-contracts';
import ModuleEntityNewTag from './ModuleEntityNewTag';
import ModuleEntityTagList from './ModuleEntityTagList';

interface ModuleEntityTagAdministrationProps {
  moduleType: PbModuleType;
  moduleId: number;
}

const ModuleEntityTagAdministration: React.FC<ModuleEntityTagAdministrationProps> = ({
  moduleId,
}) => {
  return (
    <>
      <ModuleEntityTagList moduleId={moduleId} />
      <ModuleEntityNewTag moduleId={moduleId} />
    </>
  );
};

export default ModuleEntityTagAdministration;
