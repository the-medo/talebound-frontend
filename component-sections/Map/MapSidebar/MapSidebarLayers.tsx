import React, { useCallback } from 'react';
import { MapSidebarProps } from './MapSidebar';
import { Col, Row } from '../../../components/Flex/Flex';
import { BiLayer } from 'react-icons/bi';
import { TitleH4 } from '../../../components/Typography/Title';
import Checkbox from '../../../components/Checkbox/Checkbox';
import { useGetMapLayers } from '../../../api/maps/useGetMapLayers';
import { CheckedState } from '@radix-ui/react-checkbox';
import Loading from '../../../components/Loading/Loading';
import { Text } from '../../../components/Typography/Text';
import { Button } from '../../../components/Button/Button';
import { MapSidebarSection } from '../MapLayout/MapLayoutComponents';

interface MapSidebarLayersProps extends MapSidebarProps {}

const MapSidebarLayers: React.FC<MapSidebarLayersProps> = ({
  mapId,
  canEdit,
  displayedLayers,
  setDisplayedLayers,
}) => {
  const { data: mapLayers, isFetching: isPendingMapLayers } = useGetMapLayers({ variables: mapId });
  const hasLayers = (mapLayers ?? []).length > 1; //main layer doesn't count

  const handleChecked = useCallback(
    (checkState: CheckedState) => (id: number) => {
      setDisplayedLayers((p) => ({
        ...p,
        [id]: !!checkState,
      }));
    },
    [setDisplayedLayers],
  );

  if (isPendingMapLayers) return <Loading />;
  if (!hasLayers && !canEdit) return null;

  return (
    <>
      <Row gap="sm">
        <BiLayer />
        <TitleH4> Layers</TitleH4>
      </Row>
      <MapSidebarSection gap="sm">
        {!hasLayers && (
          <Col fullWidth alignItems="center" gap="sm">
            <Text>No layers yet</Text>
            <Button size="sm">Create</Button>
          </Col>
        )}
        {hasLayers &&
          (mapLayers ?? []).map((ml) => {
            const layerId = ml.id!;
            if (ml.position === 1) return null;

            return (
              <Row gap="sm" key={ml.id}>
                <Checkbox
                  disabled={ml.position === 1}
                  checked={displayedLayers[layerId]}
                  onCheckedChange={(ch) => handleChecked(ch)(layerId)}
                >
                  {ml.name}
                </Checkbox>
              </Row>
            );
          })}
      </MapSidebarSection>
    </>
  );
};

export default MapSidebarLayers;
