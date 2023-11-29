import React, { Suspense } from 'react';
import Head from 'next/head';
import EditWorld from '../../../../screens/worlds/EditWorld/EditWorld';
import useNumericParam from '../../../../hooks/useNumericParam';
import WorldOpened from '../../../../screens/worlds/WorldOpened';

const Worlds: React.FC = () => {
  const worldId = useNumericParam('worldId');

  return (
    <>
      <Head>
        <title>Worlds</title>
      </Head>
      {worldId && (
        <Suspense fallback={null}>
          <WorldOpened worldId={worldId} />
        </Suspense>
      )}
      {worldId && (
        <Suspense fallback={null}>
          <EditWorld worldId={worldId} />
        </Suspense>
      )}
    </>
  );
};

export default Worlds;
