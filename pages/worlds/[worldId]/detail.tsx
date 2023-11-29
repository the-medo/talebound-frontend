import React, { Suspense } from 'react';
import Head from 'next/head';
import useNumericParam from '../../../hooks/useNumericParam';
import WorldOpened from '../../../screens/worlds/WorldOpened';
import DetailWorld from '../../../screens/worlds/DetailWorld/DetailWorld';

const Worlds: React.FC = () => {
  const worldId = useNumericParam('worldId');

  return (
    <>
      <Head>
        <title>World detail</title>
      </Head>
      {worldId && (
        <Suspense fallback={null}>
          <WorldOpened worldId={worldId} />
        </Suspense>
      )}
      {worldId && <DetailWorld worldId={worldId} />}
    </>
  );
};

export default Worlds;
