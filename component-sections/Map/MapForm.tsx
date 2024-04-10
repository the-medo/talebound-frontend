import React, { useCallback, useState } from 'react';
import Textarea from '../../components/Textarea/Textarea';
import { useInput } from '../../hooks/useInput';
import Input from '../../components/Input/Input';
import { Col, Row } from '../../components/Flex/Flex';
import Avatar from '../../components/Avatar/Avatar';
import { Label } from '../../components/Typography/Label';
import ImageModal from '../../components/ImageModal/ImageModal';
import { PbImage } from '../../generated/api-types/data-contracts';
import { Button } from '../../components/Button/Button';
import { useImage } from '../../hooks/useImage';
import ErrorText from '../../components/ErrorText/ErrorText';
import { IMAGE_DEFAULT_WORLD_THUMBNAIL } from '../../utils/images/imageDefaultUrls';
import { useMap } from '../../hooks/useMap';
import { useCreateMap } from '../../api/maps/useCreateMap';
import { useUpdateMap } from '../../api/maps/useUpdateMap';
import MapLayerPlaceholder from './MapLayer/MapLayerPlaceholder';

const textareaPlaceholder =
  'Short description of the map. What information does this post contain?';

interface MapFormProps {
  moduleId?: number;
  mapId?: number;
  canChangeTitle?: boolean;
  canChangeDescription?: boolean;
  canChangeThumbnail?: boolean;
  onFinishCallback?: () => void;
}

const MapForm: React.FC<MapFormProps> = ({
  moduleId,
  mapId,
  canChangeTitle = true,
  canChangeDescription = true,
  canChangeThumbnail = true,
  onFinishCallback,
}) => {
  const { mutate: createMap, isPending: isPendingCreate, error: errorCreate } = useCreateMap();
  const { mutate: updateMap, isPending: isPendingUpdate, error: errorUpdate } = useUpdateMap();
  const [showImageModal, setShowImageModal] = useState(false);
  const [showMainLayerModal, setShowMainLayerModal] = useState(false);
  const [thumbnailImage, setThumbnailImage] = useState<PbImage>();
  const [mainLayerImage, setMainLayerImage] = useState<PbImage>();
  const { map: mapData, isFetching: isPendingMap } = useMap(mapId);
  const { image: imageThumbnail } = useImage(mapData?.thumbnailImageId ?? 0);

  const { value: name, onChange: onChangeName } = useInput<string>(mapData?.name ?? '');
  const { value: description, onChange } = useInput<string, HTMLTextAreaElement>(
    mapData?.description ?? '',
  );

  const toggleImageModal = useCallback(() => {
    setShowImageModal((p) => !p);
  }, []);

  const onSuccess = useCallback(() => {
    if (onFinishCallback) {
      onFinishCallback();
    }
  }, [onFinishCallback]);

  const submitMapHandler = useCallback(() => {
    if (mapId) {
      updateMap(
        {
          mapId,
          body: {
            name: canChangeTitle ? name : undefined,
            description: canChangeDescription ? description : undefined,
            thumbnailImageId: thumbnailImage?.id,
          },
        },
        { onSuccess },
      );
    } else {
      createMap(
        {
          moduleId,
          name: canChangeTitle ? name : undefined,
          description: canChangeDescription ? description : undefined,
          thumbnailImageId: thumbnailImage?.id,
        },
        { onSuccess },
      );
    }
  }, [
    canChangeDescription,
    canChangeTitle,
    createMap,
    description,
    mapId,
    moduleId,
    onSuccess,
    thumbnailImage?.id,
    name,
    updateMap,
  ]);

  const loading = isPendingMap || isPendingCreate || isPendingUpdate;
  const openMapLayerModal = () => setShowMainLayerModal(true);

  if (!canChangeTitle && !canChangeDescription && !canChangeThumbnail) return null;

  return (
    <>
      <Row fullWidth gap="md" alignItems="start">
        <Col fullWidth gap="md">
          {canChangeTitle && (
            <Input id="name" label="Name" onChange={onChangeName} value={name} required fullWidth />
          )}
          {canChangeDescription && (
            <Textarea
              id="description"
              label="Short description"
              placeholder={textareaPlaceholder}
              rows={5}
              value={description}
              onChange={onChange}
            />
          )}
          {!mapId && (
            <MapLayerPlaceholder
              image={mainLayerImage}
              onClick={openMapLayerModal}
              titleSelected="change"
              titleNotSelected="+ base map image"
            />
          )}
          <Button onClick={submitMapHandler} loading={loading}>
            {mapId ? 'Save' : 'Create'}
          </Button>
          <ErrorText error={errorCreate ?? errorUpdate} />
        </Col>
        {canChangeThumbnail && (
          <Col gap="md" alignItems="center" padding="xl">
            <Label css={{ width: 'auto' }}>Thumbnail</Label>
            <Avatar
              loading={loading}
              onClick={toggleImageModal}
              size="xl"
              url={thumbnailImage?.url ?? imageThumbnail?.url ?? IMAGE_DEFAULT_WORLD_THUMBNAIL}
            />
          </Col>
        )}
      </Row>
      <ImageModal
        open={showImageModal}
        setOpen={setShowImageModal}
        trigger={null}
        onSubmit={setThumbnailImage}
        uploadedFilename={`map-thumbnail-${mapId}`}
        uploadedImageTypeId={100}
        isNullable={true}
      />
      <ImageModal
        open={showMainLayerModal}
        setOpen={setShowMainLayerModal}
        trigger={null}
        onSubmit={setMainLayerImage}
        uploadedFilename={`map-layer-${mapId}`}
        uploadedImageTypeId={100}
        isNullable={true}
      />
    </>
  );
};

export default MapForm;
