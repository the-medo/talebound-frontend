import React from 'react';
import { usePlacement } from '../../hooks/usePlacement';
import { useGetLocations } from '../../api/locations/useGetLocations';

interface LocationListProps {}

const LocationList: React.FC<LocationListProps> = () => {
  const [placement] = usePlacement('location');

  const { data: locationsData = [] } = useGetLocations({ variables: placement });

  return (
    <div>
      {JSON.stringify(placement)}
      {locationsData.map((l) => (
        <div key={l.id}>
          {l.name} - {l.description}
        </div>
      ))}
    </div>
  );
};

export default LocationList;
