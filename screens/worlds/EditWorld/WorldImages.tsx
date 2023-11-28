import React, { useCallback, useState } from 'react';
import { useUpdateWorld } from '../../../api/worlds/useUpdateWorld';
import { Col, Row } from '../../../components/Flex/Flex';
import { Label } from '../../../components/Typography/Label';
import Avatar from '../../../components/Avatar/Avatar';
import { styled } from '../../../styles/stitches.config';
import { TitleH2 } from '../../../components/Typography/Title';
import ImageModal from '../../../components/ImageModal/ImageModal';
import { PbImage } from '../../../generated/api-types/data-contracts';
import {
  IMAGE_DEFAULT_WORLD_AVATAR,
  IMAGE_DEFAULT_WORLD_HEADER,
  IMAGE_DEFAULT_WORLD_THUMBNAIL,
} from '../../../utils/images/imageDefaultUrls';
import { useWorld } from '../../../hooks/useWorld';

interface WorldImagesProps {
  worldId: number;
  disabled?: boolean;
}

const WorldImagesWrapper = styled(Row, {
  defaultVariants: {
    gap: 'md',
    justifyContent: 'between',
  },
});

const ImageColWrapper = styled(Col, {
  width: '125px',

  defaultVariants: {
    gap: 'md',
    alignItems: 'center',
    justifyContent: 'between',
  },
});

enum WorldImageType {
  imageThumbnail = 'imageThumbnail',
  imageAvatar = 'imageAvatar',
  imageHeader = 'imageHeader',
}

interface ImageTypeInfo {
  filename: string;
  imageTypeId: number;
}

const imageTypeInfo: Record<WorldImageType, ImageTypeInfo> = {
  [WorldImageType.imageThumbnail]: {
    filename: 'world-thumbnail',
    imageTypeId: 1200,
  },
  [WorldImageType.imageAvatar]: {
    filename: 'world-avatar',
    imageTypeId: 400,
  },
  [WorldImageType.imageHeader]: {
    filename: 'world-header',
    imageTypeId: 300,
  },
};

const WorldImages: React.FC<WorldImagesProps> = ({ worldId, disabled }) => {
  const { module } = useWorld(worldId);
  const [showImageModal, setShowImageModal] = useState(false);
  const [modalType, setModalType] = useState<WorldImageType>(WorldImageType.imageThumbnail);

  const updateWorldMutation = useUpdateWorld();

  const changeWorldImage = useCallback(
    (image: PbImage) => {
      updateWorldMutation.mutate({
        worldId: worldId,
        body: {
          [`${modalType}Id`]: image.id,
        },
      });
    },
    [modalType, updateWorldMutation, worldId],
  );

  const openModal = useCallback(
    (imageType: WorldImageType) => {
      if (!disabled) {
        setModalType(imageType);
        setShowImageModal(true);
      }
    },
    [disabled],
  );

  const openModalThumbnail = useCallback(
    () => openModal(WorldImageType.imageThumbnail),
    [openModal],
  );
  const openModalAvatar = useCallback(() => openModal(WorldImageType.imageAvatar), [openModal]);
  const openModalHeader = useCallback(() => openModal(WorldImageType.imageHeader), [openModal]);

  return (
    <>
      <TitleH2 css={{ marginTop: '$lg' }} marginBottom="md">
        Images
      </TitleH2>
      <WorldImagesWrapper>
        <ImageColWrapper>
          <Avatar
            onClick={openModalThumbnail}
            size="xl"
            url={module?.thumbnailImgUrl ?? IMAGE_DEFAULT_WORLD_THUMBNAIL}
          />
          <Label css={{ width: 'auto' }}>Thumbnail</Label>
        </ImageColWrapper>
        <ImageColWrapper>
          <Avatar
            onClick={openModalAvatar}
            size="xl"
            url={module?.avatarImgUrl ?? IMAGE_DEFAULT_WORLD_AVATAR}
          />
          <Label css={{ width: 'auto' }}>Avatar</Label>
        </ImageColWrapper>
        <ImageColWrapper>
          <Avatar
            onClick={openModalHeader}
            size="xl"
            url={module?.headerImgUrl ?? IMAGE_DEFAULT_WORLD_HEADER}
          />
          <Label css={{ width: 'auto' }}>Header</Label>
        </ImageColWrapper>
      </WorldImagesWrapper>
      <ImageModal
        open={showImageModal}
        setOpen={setShowImageModal}
        trigger={null}
        onSubmit={changeWorldImage}
        uploadedFilename={imageTypeInfo[modalType].filename}
        uploadedImageTypeId={imageTypeInfo[modalType].imageTypeId}
      />
    </>
  );
};

export default WorldImages;
