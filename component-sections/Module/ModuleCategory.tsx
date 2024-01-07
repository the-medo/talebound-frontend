import React, { Suspense } from 'react';
import { useUrlModuleId } from '../../hooks/useUrlModuleId';
import ModuleLayout from '../../components/Layout/ModuleLayout';
import MenuCategoryPage from '../Menu/MenuCategoryPage';
import { isModuleCollaborator, useMyModuleRole } from '../../hooks/useModuleAdmins';
import { useModule } from '../../hooks/useModule';

interface ModuleCategoryProps {
  postId?: number;
}

const ModuleCategory: React.FC<ModuleCategoryProps> = ({ postId }) => {
  const moduleId = useUrlModuleId();
  const { module, linkPrefix, moduleTypeId } = useModule(moduleId);
  const menuId = module?.menuId ?? 0;
  const role = useMyModuleRole(moduleId);
  const canEdit = isModuleCollaborator(role);

  return (
    <>
      <ModuleLayout>
        <Suspense fallback={null}>
          <MenuCategoryPage
            menuId={menuId}
            postId={postId}
            linkPrefix={`/${linkPrefix}/${moduleTypeId}`}
            canEdit={canEdit}
          />
        </Suspense>
      </ModuleLayout>
    </>
  );
};

export default ModuleCategory;
