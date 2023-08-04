import React from 'react';
import Head from 'next/head';
import EditWorld from '../../../screens/worlds/EditWorld/EditWorld';
import useNumericParam from '../../../hooks/useNumericParam';

const Worlds: React.FC = () => {
  const worldId = useNumericParam('worldId');

  return (
    <>
      <Head>
        <title>Worlds</title>
      </Head>
      {worldId && <EditWorld worldId={worldId} />}
    </>
  );
};

export default Worlds;
