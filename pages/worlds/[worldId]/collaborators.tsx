import React, { Suspense } from 'react';
import Head from 'next/head';
import ModuleOpened from '../../../screens/worlds/ModuleOpened';
import ModuleCollaborators from '../../../screens/worlds/WorldCollaborators/ModuleCollaborators';
import { useUrlModuleId } from '../../../hooks/useUrlModuleId';

const Worlds: React.FC = () => {
  const moduleId = useUrlModuleId();

  return (
    <>
      <Head>
        <title>Collaborators</title>
      </Head>
      {moduleId && (
        <Suspense fallback={null}>
          <ModuleOpened moduleId={moduleId} />
        </Suspense>
      )}
      {moduleId && <ModuleCollaborators moduleId={moduleId} />}
    </>
  );
};

export default Worlds;
