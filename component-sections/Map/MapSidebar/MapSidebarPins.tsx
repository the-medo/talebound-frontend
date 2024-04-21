import React from 'react';
import { MapSidebarProps } from './MapSidebar';
import { Col, Row } from '../../../components/Flex/Flex';
import { TitleH4 } from '../../../components/Typography/Title';
import { VscLocation } from 'react-icons/vsc';
import { useGetMapPins } from '../../../api/maps/useGetMapPins';
import Loading from '../../../components/Loading/Loading';
import { Text } from '../../../components/Typography/Text';
import { Button } from '../../../components/Button/Button';
import { MapSidebarSection } from '../MapLayout/MapLayoutComponents';

interface MapSidebarPinsProps extends Omit<MapSidebarProps, 'setDisplayedLayers'> {}

const MapSidebarPins: React.FC<MapSidebarPinsProps> = ({ mapId, canEdit, displayedLayers }) => {
  const { data: mapPins, isFetching: isPendingMapPins } = useGetMapPins({ variables: mapId });

  const hasPins = (mapPins ?? []).length > 0;

  if (isPendingMapPins) return <Loading />;
  if (!hasPins && !canEdit) return null;

  return (
    <>
      <Row gap="sm">
        <VscLocation />
        <TitleH4> Locations</TitleH4>
      </Row>
      <MapSidebarSection gap="sm">
        {!hasPins && (
          <Col fullWidth alignItems="center" gap="sm">
            <Text>No locations yet</Text>
            <Button size="sm">Create</Button>
          </Col>
        )}
      </MapSidebarSection>
    </>
  );
};

export default MapSidebarPins;
