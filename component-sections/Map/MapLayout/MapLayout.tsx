import React, { useCallback, useMemo, useRef, useState } from 'react';
import { useMap } from '../../../hooks/useMap';
import {
  MapLayerContainer,
  MapLayerImage,
  MapLayerOverlay,
  MapLayerOverlayButtons,
  MapSidebarSolid,
  MapWrapper,
} from './MapLayoutComponents';
import { useAspectRatioResizer } from '../../../hooks/useAspectRatioResizer';
import { useGetMapLayers } from '../../../api/maps/useGetMapLayers';
import MapSidebar from '../MapSidebar/MapSidebar';
import { DisplayedLayers, MapLayoutType } from '../mapUtils';
import { Button } from '../../../components/Button/Button';
import { BiLayer } from 'react-icons/bi';
import { TbArrowBarToLeft, TbArrowBarToRight } from 'react-icons/tb';
import { MdClose } from 'react-icons/md';
import { sortByPosition } from '../../../utils/functions/sortByPosition';

interface MapLayoutProps {
  mapId: number;
  canEdit: boolean;
}

const MapLayout: React.FC<MapLayoutProps> = ({ mapId, canEdit }) => {
  const { map: mapData, isFetching: isPendingMap } = useMap(mapId);
  const { data: mapLayers, isFetching: isPendingMapLayers } = useGetMapLayers({ variables: mapId });
  const layoutRef = useRef<HTMLDivElement>(null);

  const [displayedLayers, setDisplayedLayers] = useState<DisplayedLayers>({});
  const [mapLayoutType, setMapLayoutType] = useState<MapLayoutType>(MapLayoutType.HIDDEN);

  const offset = useMemo(() => {
    if (mapLayoutType === MapLayoutType.SIDEBAR) {
      return {
        fragment: 3,
        min: 100,
        max: 250,
      };
    }
    return 0;
  }, [mapLayoutType]);

  const size = useAspectRatioResizer({
    ref: layoutRef,
    baseWidth: mapData?.width,
    offset,
    baseHeight: mapData?.height,
  });

  const handleOverlay = useCallback(
    () =>
      setMapLayoutType((p) => {
        if (p === MapLayoutType.HIDDEN) return MapLayoutType.OVERLAY;
        return MapLayoutType.HIDDEN;
      }),
    [],
  );

  const handleSidebar = useCallback(
    () =>
      setMapLayoutType((p) =>
        p === MapLayoutType.SIDEBAR ? MapLayoutType.OVERLAY : MapLayoutType.SIDEBAR,
      ),
    [],
  );

  const handleClose = useCallback(() => setMapLayoutType(MapLayoutType.HIDDEN), []);
  const sortedLayers = useMemo(() => (mapLayers ?? []).sort(sortByPosition), [mapLayers]);
  let dlCount = 0;

  return (
    <MapWrapper
      css={{
        height: size.height + 'px',
      }}
      ref={layoutRef}
    >
      <MapLayerContainer>
        {sortedLayers.map((ml) => {
          const layerId = ml.id;
          if (!ml.enabled || !layerId) return null;
          if (!displayedLayers[layerId] && (ml.position ?? 0) > 1) return null;
          dlCount++;
          return (
            <MapLayerImage
              css={{ zIndex: ml.position ?? 0 }}
              key={layerId}
              src={ml.imageUrl}
              alt={`Map layer - ${ml.position}`}
            />
          );
        })}
        {mapLayoutType === MapLayoutType.OVERLAY && (
          <MapLayerOverlay>
            <MapSidebar
              mapId={mapId}
              canEdit={canEdit}
              displayedLayers={displayedLayers}
              setDisplayedLayers={setDisplayedLayers}
            />
          </MapLayerOverlay>
        )}

        <MapLayerOverlayButtons gap="sm">
          {mapLayoutType === MapLayoutType.HIDDEN && (
            <Button color="primaryOutline" onClick={handleOverlay} size="sm">
              <BiLayer /> {dlCount - 1}/{(mapLayers ?? []).length - 1}
            </Button>
          )}
          {mapLayoutType !== MapLayoutType.HIDDEN && (
            <Button icon color="primaryOutline" onClick={handleClose} size="sm">
              <MdClose />
            </Button>
          )}
          <Button icon color="primaryOutline" onClick={handleSidebar} size="sm">
            {mapLayoutType === MapLayoutType.SIDEBAR ? (
              <TbArrowBarToLeft />
            ) : (
              <TbArrowBarToRight />
              // <VscLayoutSidebarRight />
            )}
          </Button>
        </MapLayerOverlayButtons>
      </MapLayerContainer>
      {mapLayoutType === MapLayoutType.SIDEBAR && (
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
      )}
    </MapWrapper>
  );
};

export default MapLayout;
