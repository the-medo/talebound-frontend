import React from 'react';
import Head from 'next/head';
import useNumericParam from '../../../hooks/useNumericParam';
import WorldOpened from '../../../screens/worlds/WorldOpened';
import DetailWorld from '../../../screens/worlds/DetailWorld';

const Worlds: React.FC = () => {
  const worldId = useNumericParam('worldId');

  return (
    <>
      <Head>
        <title>World detail</title>
      </Head>
      {worldId && <WorldOpened worldId={worldId} />}
      {worldId && <DetailWorld worldId={worldId} />}
    </>
  );
};

export default Worlds;
