import React from 'react';
import Head from 'next/head';
import useNumericParam from '../../../../hooks/useNumericParam';
import WorldOpened from '../../../../screens/worlds/WorldOpened';
import EditWorldCollaborators from '../../../../screens/worlds/EditWorldCollaborators/EditWorldCollaborators';

const Worlds: React.FC = () => {
  const worldId = useNumericParam('worldId');

  return (
    <>
      <Head>
        <title>Worlds - collaborators</title>
      </Head>
      {worldId && <WorldOpened worldId={worldId} />}
      {worldId && <EditWorldCollaborators worldId={worldId} />}
    </>
  );
};

export default Worlds;
