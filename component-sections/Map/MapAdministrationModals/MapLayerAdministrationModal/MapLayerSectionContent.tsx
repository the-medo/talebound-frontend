import React from 'react';
import { PbViewMapLayer } from '../../../../generated/api-types/data-contracts';
import { Row } from '../../../../components/Flex/Flex';
import ContentSection from '../../../../components/ContentSection/ContentSection';

interface MapLayerSectionContentProps {
  mapLayer: PbViewMapLayer;
}

const MapLayerSectionContent: React.FC<MapLayerSectionContentProps> = ({ mapLayer }) => {
  return (
    <ContentSection key={mapLayer.id} fullWidth>
      <Row gap="sm">
        {mapLayer.name} - {JSON.stringify(mapLayer)}
      </Row>
    </ContentSection>
  );
};

export default MapLayerSectionContent;
