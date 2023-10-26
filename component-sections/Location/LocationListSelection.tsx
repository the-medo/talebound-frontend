import React from 'react';
import { useGetLocations } from '../../api/locations/useGetLocations';
import LocationTable from './LocationTable';
import { PbPlacement } from '../../generated/api-types/data-contracts';

interface LocationListSelectionProps {
  placement: PbPlacement;
  onSelect: (locationId: number[]) => void;
}

const LocationListSelection: React.FC<LocationListSelectionProps> = ({ placement }) => {
  const { data: locationsData = [] } = useGetLocations({ variables: placement });

  return <LocationTable data={locationsData} placement={placement} isSelectionTable={true} />;
};

export default LocationListSelection;
