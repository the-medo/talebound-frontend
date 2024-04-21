import { styled } from '../../../styles/stitches.config';
import { Col } from '../../../components/Flex/Flex';

export const MapWrapper = styled('div', {
  width: '100%',
  display: 'flex',
  flexDirection: 'row',
  border: '2px solid red',
  transition: '0.3s all',
});

export const MapLayerContainer = styled('div', {
  height: '100%',
  display: 'flex',
  flexGrow: 1,
  position: 'relative',
  border: '2px solid blue',
  transition: '0.3s all',
});

export const MapLayerImage = styled('img', {
  position: 'absolute',
  width: '100%',
  height: '100%',
  top: 0,
  left: 0,
  border: '2px dashed yellow',
  transition: '0.3s all',
});

export const MapSidebarSolid = styled(Col, {
  height: '100%',
  transition: '0.3s all',
  border: '2px solid green',
  backgroundColor: '$white',
});

export const MapSidebarSection = styled(Col, {
  flexGrow: 1,
  minHeight: '75px',
  // flexBasis: '25%',
  transition: '0.3s all',
  border: '2px solid blue',
  backgroundColor: '$white',
  overflowY: 'auto',
});
