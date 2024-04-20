import React, { useRef } from 'react';
import { useMap } from '../../../hooks/useMap';
import {
  MapLayerContainer,
  MapLayerImage,
  MapSidebarSolid,
  MapWrapper,
} from './MapLayoutComponents';
import { useAspectRatioResizer } from '../../../hooks/useAspectRatioResizer';
import { useGetMapLayers } from '../../../api/maps/useGetMapLayers';

interface MapLayoutProps {
  mapId: number;
  canEdit: boolean;
}

const MapLayout: React.FC<MapLayoutProps> = ({ mapId, canEdit }) => {
  const { map: mapData, isFetching: isPendingMap } = useMap(mapId);
  const { data: mapLayers, isFetching: isPendingMapLayers } = useGetMapLayers({ variables: mapId });
  const layoutRef = useRef<HTMLDivElement>(null);

  const size = useAspectRatioResizer({
    ref: layoutRef,
    baseWidth: mapData?.width,
    offset: {
      fragment: 3,
      min: 100,
      max: 250,
    },
    baseHeight: mapData?.height,
  });

  return (
    <MapWrapper
      css={{
        height: size.height + 'px',
      }}
      ref={layoutRef}
    >
      <MapLayerContainer>
        {(mapLayers ?? []).map((ml) => {
          return <MapLayerImage key={ml.id} src={ml.imageUrl} alt={`Map layer - ${ml.position}`} />;
        })}
      </MapLayerContainer>
      <MapSidebarSolid
        css={{
          width: size.finalOffset + 'px',
        }}
      ></MapSidebarSolid>
    </MapWrapper>
  );
};

export default MapLayout;
