import React, { Suspense } from 'react';
import Head from 'next/head';
import useNumericParam from '../../../hooks/useNumericParam';
import WorldOpened from '../../../screens/worlds/WorldOpened';
import WorldCollaborators from '../../../screens/worlds/WorldCollaborators/WorldCollaborators';

const Worlds: React.FC = () => {
  const worldId = useNumericParam('worldId');

  return (
    <>
      <Head>
        <title>Worlds - collaborators</title>
      </Head>
      {worldId && (
        <Suspense fallback={null}>
          <WorldOpened worldId={worldId} />
        </Suspense>
      )}
      {worldId && <WorldCollaborators worldId={worldId} />}
    </>
  );
};

export default Worlds;
