import React from 'react';

interface MapsScreenProps {
  canEdit?: boolean;
}

const MapsScreen: React.FC<MapsScreenProps> = ({ canEdit }) => {
  return <div>Maps - {canEdit ? 'asdf' : 'fdsa'}</div>;
};

export default MapsScreen;
