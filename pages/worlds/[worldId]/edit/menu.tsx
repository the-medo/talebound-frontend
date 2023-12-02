import React, { Suspense } from 'react';
import Head from 'next/head';
import useNumericParam from '../../../../hooks/useNumericParam';
import ModuleOpened from '../../../../screens/worlds/ModuleOpened';
import EditModuleMenu from '../../../../screens/worlds/EditWorldMenu/EditModuleMenu';

const Worlds: React.FC = () => {
  const worldId = useNumericParam('worldId');

  return (
    <>
      <Head>
        <title>Worlds - menu administration</title>
      </Head>
      {worldId && (
        <Suspense fallback={null}>
          <ModuleOpened moduleId={worldId} />
        </Suspense>
      )}
      {worldId && <EditModuleMenu moduleId={worldId} />}
    </>
  );
};

export default Worlds;
