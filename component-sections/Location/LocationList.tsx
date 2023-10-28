import React from 'react';
import { useModule } from '../../hooks/useModule';
import { useGetLocations } from '../../api/locations/useGetLocations';
import LocationTable from './LocationTable';
import { PbEntityType } from '../../generated/api-types/data-contracts';

interface LocationListProps {
  canEdit?: boolean;
}

const LocationList: React.FC<LocationListProps> = ({ canEdit }) => {
  const [module] = useModule(PbEntityType.ENTITY_TYPE_LOCATION);

  const { data: locationsData = [] } = useGetLocations({ variables: module });

  return (
    <div>
      <LocationTable data={locationsData} canEdit={canEdit} module={module} />
    </div>
  );
};

export default LocationList;
