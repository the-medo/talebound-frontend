import React from 'react';
import ContentSection from '../../../../components/ContentSection/ContentSection';
import MapLayerForm from './MapLayerForm';
import { Row } from '../../../../components/Flex/Flex';
import MapLayerReorder from './MapLayerReorder';

interface MapLayerAdministrationContentProps {
  mapId: number;
}

const MapLayerAdministrationContent: React.FC<MapLayerAdministrationContentProps> = ({ mapId }) => {
  return (
    <Row alignItems="start">
      <div style={{ width: '600px' }}>
        <ContentSection header="New layer">
          <MapLayerForm mapId={mapId} />
        </ContentSection>
      </div>
      <ContentSection header="Layers" fullWidth>
        <MapLayerReorder mapId={mapId} />
      </ContentSection>
    </Row>
  );
};

export default MapLayerAdministrationContent;
