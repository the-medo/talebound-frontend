import React from 'react';

interface LocationsScreenProps {
  menuId: number;
  canEdit?: boolean;
}

const LocationsScreen: React.FC<LocationsScreenProps> = ({ menuId, canEdit }) => {
  return (
    <div>
      Locations {menuId} - {canEdit}
    </div>
  );
};

export default LocationsScreen;
