import React, { useRef, useState } from 'react';
import { useMap } from '../../../hooks/useMap';
import {
  MapLayerContainer,
  MapLayerImage,
  MapSidebarSolid,
  MapWrapper,
} from './MapLayoutComponents';
import { useAspectRatioResizer } from '../../../hooks/useAspectRatioResizer';
import { useGetMapLayers } from '../../../api/maps/useGetMapLayers';
import MapSidebar from '../MapSidebar/MapSidebar';

export type DisplayedLayers = Record<number, boolean | undefined>;

interface MapLayoutProps {
  mapId: number;
  canEdit: boolean;
}

const MapLayout: React.FC<MapLayoutProps> = ({ mapId, canEdit }) => {
  const { map: mapData, isFetching: isPendingMap } = useMap(mapId);
  const { data: mapLayers, isFetching: isPendingMapLayers } = useGetMapLayers({ variables: mapId });
  const layoutRef = useRef<HTMLDivElement>(null);

  const [displayedLayers, setDisplayedLayers] = useState<DisplayedLayers>({});

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
          const layerId = ml.id;
          if (!ml.enabled || !layerId) return null;
          if (!displayedLayers[layerId] && (ml.position ?? 0) > 1) return null;
          return (
            <MapLayerImage key={layerId} src={ml.imageUrl} alt={`Map layer - ${ml.position}`} />
          );
        })}
      </MapLayerContainer>
      <MapSidebarSolid
        padding="sm"
        gap="xs"
        css={{
          width: size.finalOffset + 'px',
        }}
      >
        <MapSidebar
          mapId={mapId}
          canEdit={canEdit}
          displayedLayers={displayedLayers}
          setDisplayedLayers={setDisplayedLayers}
        />
      </MapSidebarSolid>
    </MapWrapper>
  );
};

export default MapLayout;
