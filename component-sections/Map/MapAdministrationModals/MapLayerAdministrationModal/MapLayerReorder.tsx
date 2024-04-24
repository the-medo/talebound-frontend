import React from 'react';
import { useGetMapLayers } from '../../../../api/maps/useGetMapLayers';
import { Row } from '../../../../components/Flex/Flex';
import ContentSection from '../../../../components/ContentSection/ContentSection';

interface MapLayerReorderProps {
  mapId?: number;
}

const MapLayerReorder: React.FC<MapLayerReorderProps> = ({ mapId }) => {
  const { data: mapLayers, isFetching: isPendingMapLayers } = useGetMapLayers({ variables: mapId });
  const hasLayers = (mapLayers ?? []).length > 0; //main layer doesn't count

  return (
    <>
      {hasLayers &&
        (mapLayers ?? [])
          .sort((ml1, ml2) => ml2.position! - ml1.position!)
          .map((ml) => {
            return (
              <ContentSection key={ml.id} fullWidth>
                <Row gap="sm">{ml.name}</Row>
              </ContentSection>
            );
          })}
    </>
  );
};

export default MapLayerReorder;
