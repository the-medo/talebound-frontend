import React from 'react';
import { usePlacement } from '../../hooks/usePlacement';
import { useGetLocations } from '../../api/locations/useGetLocations';
import LocationTable from './LocationTable';

interface LocationListProps {
  canEdit?: boolean;
}

const LocationList: React.FC<LocationListProps> = ({ canEdit }) => {
  const [placement] = usePlacement('location');

  const { data: locationsData = [] } = useGetLocations({ variables: placement });

  return (
    <div>
      <LocationTable data={locationsData} canEdit={canEdit} placement={placement} />
    </div>
  );
};

export default LocationList;
