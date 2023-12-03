import React, { PropsWithChildren, Suspense, useMemo } from 'react';
import Layout from './Layout';
import LeftNavbarModule from '../LeftNavbar/LeftNavbarModule';
import ActionBoxModule from '../../screens/worlds/ActionBoxModule';
import ModuleOpened from '../../screens/worlds/ModuleOpened';
import { useUrlModuleId } from '../../hooks/useUrlModuleId';

const ModuleLayout: React.FC<PropsWithChildren> = ({ children }) => {
  const moduleId = useUrlModuleId();

  const navbar = useMemo(() => <LeftNavbarModule moduleId={moduleId} />, [moduleId]);

  return (
    <Layout vertical={true} navbar={navbar}>
      {moduleId && (
        <Suspense fallback={null}>
          <ModuleOpened moduleId={moduleId} />
        </Suspense>
      )}
      <ActionBoxModule moduleId={moduleId} />
      {children}
    </Layout>
  );
};

export default ModuleLayout;
