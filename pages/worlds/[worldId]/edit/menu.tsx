import React, { Suspense } from 'react';
import Head from 'next/head';
import ModuleOpened from '../../../../screens/worlds/ModuleOpened';
import EditModuleMenu from '../../../../screens/worlds/EditWorldMenu/EditModuleMenu';
import { useUrlModuleId } from '../../../../hooks/useUrlModuleId';

const Worlds: React.FC = () => {
  const moduleId = useUrlModuleId();

  return (
    <>
      <Head>
        <title>Worlds - menu administration</title>
      </Head>
      {moduleId && (
        <Suspense fallback={null}>
          <ModuleOpened moduleId={moduleId} />
        </Suspense>
      )}
      {moduleId && <EditModuleMenu moduleId={moduleId} />}
    </>
  );
};

export default Worlds;
