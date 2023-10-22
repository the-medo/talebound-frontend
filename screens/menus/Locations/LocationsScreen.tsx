import React, { useCallback, useState } from 'react';
import { TitleH2 } from '../../../components/Typography/Title';
import ContentSection from '../../../components/ContentSection/ContentSection';
import { Col, Row } from '../../../components/Flex/Flex';
import { Button } from '../../../components/Button/Button';
import { TbPlus } from 'react-icons/tb';
import LocationNew from '../../../component-sections/Location/LocationNew';
import { usePlacement } from '../../../hooks/usePlacement';

interface LocationsScreenProps {
  menuId: number;
  canEdit?: boolean;
}

const LocationsScreen: React.FC<LocationsScreenProps> = ({ menuId, canEdit }) => {
  const [createMode, setCreateMode] = useState(false);
  const [placement, validPlacement] = usePlacement('location');

  const toggleCreateMode = useCallback(() => setCreateMode((p) => !p), []);

  return (
    <Row gap="md" alignItems="start" wrap>
      <Col css={{ flexGrow: 5, flexBasis: '10rem' }}>
        <ContentSection
          flexWrap="wrap"
          direction="column"
          header={`Locations ${menuId} - ${canEdit}`}
        ></ContentSection>
      </Col>
      <Col css={{ flexGrow: 0, flexBasis: '600px' }}>
        <ContentSection>
          <Row gap="md" fullWidth justifyContent="between">
            <TitleH2>New location</TitleH2>
            {canEdit && (
              <Row gap="md">
                <Button
                  color={createMode ? 'primaryFill' : 'primaryOutline'}
                  onClick={toggleCreateMode}
                >
                  <TbPlus />
                  Create location
                </Button>
              </Row>
            )}
          </Row>
          {createMode && validPlacement && <LocationNew placement={placement} />}
        </ContentSection>
      </Col>
    </Row>
  );
};

export default LocationsScreen;
