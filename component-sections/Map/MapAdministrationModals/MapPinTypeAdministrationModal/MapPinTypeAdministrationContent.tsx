import React, { useReducer, useState } from 'react';
import ContentSection from '../../../../components/ContentSection/ContentSection';
import { Row } from '../../../../components/Flex/Flex';
import { styled } from '../../../../styles/stitches.config';
import { useGetMapPinTypesAndGroups } from '../../../../api/maps/useGetMapPinTypesAndGroups';
import { useUrlModuleId } from '../../../../hooks/useUrlModuleId';
import MapPinTypeGroup from './GroupAdministration/MapPinTypeGroup';
import {
  MapPinTypeAdministrationContext,
  mapPinTypeAdministrationInitialState,
  mapPinTypeAdministrationReducer,
} from './mapPinTypeAdministrationReducer';
import NewPinTypeGroupButton from './GroupAdministration/NewPinTypeGroupButton';
import PinBackgroundShapeSelector from './PinBackgroundShape/PinBackgroundShapeSelector';
import { PbPinShape } from '../../../../generated/api-types/data-contracts';

const ContentWrapper = styled('div', {
  width: 'calc(33% - $md/2)', //amazing computation, just saying
  minWidth: '400px',
});

interface MapPinTypeAdministrationContentProps {
  mapId: number;
}

const MapPinTypeAdministrationContent: React.FC<MapPinTypeAdministrationContentProps> = ({
  mapId,
}) => {
  const [state, dispatch] = useReducer(
    mapPinTypeAdministrationReducer,
    mapPinTypeAdministrationInitialState,
  );
  const moduleId = useUrlModuleId();
  const { data: mapPinTypesAndGroups, isFetching: isPending } = useGetMapPinTypesAndGroups({
    variables: moduleId,
  });

  const [s, setS] = useState<PbPinShape | undefined>(undefined);

  return (
    <MapPinTypeAdministrationContext.Provider value={{ state, dispatch }}>
      <Row alignItems="start" gap="md" wrap>
        <ContentWrapper>
          <ContentSection header="Pin type groups" fullWidth loading={isPending}>
            {(mapPinTypesAndGroups?.pinTypeGroups ?? []).map((x) => (
              <MapPinTypeGroup key={x.id} data={x} />
            ))}
            <NewPinTypeGroupButton moduleId={moduleId} />
          </ContentSection>
        </ContentWrapper>
      </Row>
      <PinBackgroundShapeSelector selected={s} onChange={setS} />
    </MapPinTypeAdministrationContext.Provider>
  );
};

export default MapPinTypeAdministrationContent;
