import React from 'react';
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
      {worldId && <WorldOpened worldId={worldId} />}
      {worldId && <EditWorld worldId={worldId} />}
    </>
  );
};

export default Worlds;
