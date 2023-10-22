import React from 'react';

interface MapsScreenProps {
  menuId: number;
  canEdit?: boolean;
}

const MapsScreen: React.FC<MapsScreenProps> = ({ menuId, canEdit }) => {
  return (
    <div>
      Maps {menuId} - {canEdit ? 'asdf' : 'fdsa'}
    </div>
  );
};

export default MapsScreen;
