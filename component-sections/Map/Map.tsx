import React from 'react';

interface MapProps {
  mapId: number;
  canEdit: boolean;
  isModal?: boolean;
}

const Map: React.FC<MapProps> = ({ mapId, canEdit, isModal = false }) => {
  return (
    <div>
      Map {mapId} {canEdit} {isModal}
    </div>
  );
};

export default Map;
