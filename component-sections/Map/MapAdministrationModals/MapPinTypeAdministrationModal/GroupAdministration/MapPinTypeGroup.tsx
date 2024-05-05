import React, { useCallback } from 'react';
import { PbMapPinTypeGroup } from '../../../../../generated/api-types/data-contracts';
import { useUrlModuleId } from '../../../../../hooks/useUrlModuleId';
import { useGetMapPinTypesAndGroups } from '../../../../../api/maps/useGetMapPinTypesAndGroups';
import MapPinType from './MapPinType';
import {
  MapPinTypeAdministrationActionType,
  useMapPinTypeAdministrationContext,
} from '../mapPinTypeAdministrationReducer';

interface MapPinTypeGroupProps {
  data: PbMapPinTypeGroup;
}

const MapPinTypeGroup: React.FC<MapPinTypeGroupProps> = ({ data }) => {
  const moduleId = useUrlModuleId();
  const { state, dispatch } = useMapPinTypeAdministrationContext();
  const { data: mapPinTypesAndGroups, isFetching: isPending } = useGetMapPinTypesAndGroups({
    variables: moduleId,
  });

  const handleSelect = useCallback(
    () =>
      dispatch({
        type: MapPinTypeAdministrationActionType.SET_SELECTED_PIN_TYPE_GROUP_ID,
        selectedPinTypeGroupId: data.id ?? 0,
      }),
    [data.id, dispatch],
  );

  if (isPending) return null;
  return (
    <div
      style={{
        border: `2px solid ${state.selectedPinTypeGroupId === data.id ? 'green' : 'transparent'}`,
      }}
    >
      <span onClick={handleSelect}>
        #{data.id} {data.name}
      </span>
      <ul>
        {(mapPinTypesAndGroups?.pinTypes ?? []).map((t) => (
          <MapPinType key={t.id} data={t} />
        ))}
      </ul>
    </div>
  );
};

export default MapPinTypeGroup;
