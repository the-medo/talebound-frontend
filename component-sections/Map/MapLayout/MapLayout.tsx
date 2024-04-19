import React, { useRef } from 'react';
import { useMap } from '../../../hooks/useMap';
import { MapLayoutWrapper } from './MapLayoutComponents';
import { useAspectRatioResizer } from '../../../hooks/useAspectRatioResizer';

interface MapLayoutProps {
  mapId: number;
  canEdit: boolean;
}

const MapLayout: React.FC<MapLayoutProps> = ({ mapId, canEdit }) => {
  const { map: mapData, isFetching: isPendingMap } = useMap(mapId);
  const layoutRef = useRef<HTMLDivElement>(null);

  const size = useAspectRatioResizer({
    ref: layoutRef,
    baseWidth: mapData?.width,
    baseHeight: mapData?.height,
  });

  return (
    <MapLayoutWrapper
      css={{
        height: size.height + 'px',
      }}
      ref={layoutRef}
    >
      Map {mapId} {canEdit}
    </MapLayoutWrapper>
  );
};

export default MapLayout;
