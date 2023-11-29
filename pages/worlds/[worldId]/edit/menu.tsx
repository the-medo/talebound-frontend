import React, { Suspense } from 'react';
import Head from 'next/head';
import useNumericParam from '../../../../hooks/useNumericParam';
import WorldOpened from '../../../../screens/worlds/WorldOpened';
import EditWorldMenu from '../../../../screens/worlds/EditWorldMenu/EditWorldMenu';

const Worlds: React.FC = () => {
  const worldId = useNumericParam('worldId');

  return (
    <>
      <Head>
        <title>Worlds - menu administration</title>
      </Head>
      {worldId && (
        <Suspense fallback={null}>
          <WorldOpened worldId={worldId} />
        </Suspense>
      )}
      {worldId && <EditWorldMenu worldId={worldId} />}
    </>
  );
};

export default Worlds;
