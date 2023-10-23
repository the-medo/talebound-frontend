import React from 'react';
import ContentSection from '../../../components/ContentSection/ContentSection';
import { Col, Row } from '../../../components/Flex/Flex';
import LocationNew from '../../../component-sections/Location/LocationNew';
import LocationList from '../../../component-sections/Location/LocationList';

interface LocationsScreenProps {
  canEdit?: boolean;
}

const LocationsScreen: React.FC<LocationsScreenProps> = ({ canEdit }) => {
  return (
    <Row gap="md" alignItems="start" wrap>
      <Col css={{ flexGrow: 5, flexBasis: '10rem' }}>
        <ContentSection flexWrap="wrap" direction="column" header={`Locations`}>
          <LocationList />
          asdf
        </ContentSection>
      </Col>
      <Col css={{ flexGrow: 0, flexBasis: '600px' }}>
        <LocationNew canEdit={canEdit} />
      </Col>
    </Row>
  );
};

export default LocationsScreen;
