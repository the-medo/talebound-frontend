import React, { PropsWithChildren, Suspense, useMemo } from 'react';
import Layout from './Layout';
import LeftNavbarModule from '../LeftNavbar/LeftNavbarModule';
import useNumericParam from '../../hooks/useNumericParam';
import ActionBoxModule from '../../screens/worlds/ActionBoxModule';
import ModuleOpened from '../../screens/worlds/ModuleOpened';

const ModuleLayout: React.FC<PropsWithChildren> = ({ children }) => {
  const worldId = useNumericParam('worldId') ?? 0;

  const navbar = useMemo(() => <LeftNavbarModule moduleId={worldId} />, [worldId]);

  return (
    <Layout vertical={true} navbar={navbar}>
      {worldId && (
        <Suspense fallback={null}>
          <ModuleOpened moduleId={worldId} />
        </Suspense>
      )}
      <ActionBoxModule moduleId={worldId} />
      {children}
    </Layout>
  );
};

export default ModuleLayout;
