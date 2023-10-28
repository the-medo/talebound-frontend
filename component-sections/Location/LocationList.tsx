import React from 'react';
import { useModule } from '../../hooks/useModule';
import { useGetLocations } from '../../api/locations/useGetLocations';
import LocationTable from './LocationTable';

interface LocationListProps {
  canEdit?: boolean;
}

const LocationList: React.FC<LocationListProps> = ({ canEdit }) => {
  const [module] = useModule('location');

  const { data: locationsData = [] } = useGetLocations({ variables: module });

  return (
    <div>
      <LocationTable data={locationsData} canEdit={canEdit} module={module} />
    </div>
  );
};

export default LocationList;
