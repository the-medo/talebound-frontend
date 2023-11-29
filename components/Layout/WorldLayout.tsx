import React, { PropsWithChildren, Suspense, useMemo } from 'react';
import Layout from './Layout';
import LeftNavbarWorld from '../LeftNavbar/LeftNavbarWorld';
import useNumericParam from '../../hooks/useNumericParam';
import ActionBoxWorld from '../../screens/worlds/ActionBoxWorld';
import WorldOpened from '../../screens/worlds/WorldOpened';

const WorldLayout: React.FC<PropsWithChildren> = ({ children }) => {
  const worldId = useNumericParam('worldId') ?? 0;

  const navbar = useMemo(() => <LeftNavbarWorld worldId={worldId} />, [worldId]);

  return (
    <Layout vertical={true} navbar={navbar}>
      {worldId && (
        <Suspense fallback={null}>
          <WorldOpened worldId={worldId} />
        </Suspense>
      )}
      <ActionBoxWorld worldId={worldId} />
      {children}
    </Layout>
  );
};

export default WorldLayout;
