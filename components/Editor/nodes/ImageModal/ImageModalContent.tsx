import React, { useCallback, useEffect } from 'react';
import { LexicalEditor } from 'lexical';
import { Col, Row } from '../../../Flex/Flex';
import { Button } from '../../../Button/Button';
import ImageModalTabUrl from './ImageModalTabUrl';
import ImageModalTabUpload from './ImageModalTabUpload';
import ImageModalTabYourImages from './ImageModalTabYourImages';
import { INSERT_INLINE_IMAGE_COMMAND } from '../../plugins/InlineImagePlugin';
import { useDispatch, useSelector } from 'react-redux';
import { ReduxState } from '../../../../store';
import ImageAttributes from './ImageAttributes';
import { styled } from '../../../../styles/stitches.config';
import {
  ImageVariant,
  isTaleboundCloudflareImage,
  modifyImageVariant,
} from '../../../../utils/images/image_utils';
import { TitleH4 } from '../../../Typography/Title';
import ImageVariantButtons from '../../../ImageVariantButtons/ImageVariantButtons';
import {
  resetInlineImagePayload,
  setSelectedVariant,
  updateInlineImagePayload,
} from './imageModalSlice';

enum ImageModalTabs {
  Url,
  Upload,
  YourImages,
}

interface ImageModalContentProps {
  editor: LexicalEditor;
  setOpen: (v: boolean) => void;
}

const PreviewImage = styled('img', {
  maxWidth: '1000px',
});

const ImageModalContent: React.FC<ImageModalContentProps> = ({ editor, setOpen }) => {
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = React.useState(ImageModalTabs.Url);
  const payload = useSelector((state: ReduxState) => state.imageModal.inlineImagePayload);
  const selectedVariant = useSelector((state: ReduxState) => state.imageModal.selectedVariant);
  const [isCloudflareImage, setIsCloudflareImage] = React.useState(false);

  useEffect(() => {
    setIsCloudflareImage(isTaleboundCloudflareImage(payload.src));
  }, [payload.src]);

  const handleTabClick = useCallback((tab: ImageModalTabs) => {
    setActiveTab(tab);
  }, []);

  const handleUrlTabClick = useCallback(() => handleTabClick(ImageModalTabs.Url), [handleTabClick]);
  const handleUploadTabClick = useCallback(
    () => handleTabClick(ImageModalTabs.Upload),
    [handleTabClick],
  );
  const handleYourImagesTabClick = useCallback(
    () => handleTabClick(ImageModalTabs.YourImages),
    [handleTabClick],
  );

  const handleOnClick = useCallback(() => {
    editor.dispatchCommand(INSERT_INLINE_IMAGE_COMMAND, payload);
    dispatch(resetInlineImagePayload());
    setOpen(false);
  }, [editor, payload, setOpen]);

  const handleVariantChange = useCallback(
    (variant: ImageVariant) => {
      dispatch(setSelectedVariant(variant));
    },
    [dispatch],
  );

  useEffect(() => {
    if (isTaleboundCloudflareImage(payload.src) && selectedVariant) {
      const newUrl = modifyImageVariant(payload.src, selectedVariant);
      dispatch(updateInlineImagePayload({ src: newUrl }));
    }
  }, [selectedVariant, payload.src, dispatch]);

  return (
    <Col gap="md" css={{ flexGrow: 1 }} onClick={(e) => e.stopPropagation()}>
      <Row gap="md">
        <Button
          color={activeTab === ImageModalTabs.Url ? 'primaryFill' : 'primaryOutline'}
          onClick={handleUrlTabClick}
        >
          Url
        </Button>
        <Button
          color={activeTab === ImageModalTabs.Upload ? 'primaryFill' : 'primaryOutline'}
          onClick={handleUploadTabClick}
        >
          Upload
        </Button>
        <Button
          color={activeTab === ImageModalTabs.YourImages ? 'primaryFill' : 'primaryOutline'}
          onClick={handleYourImagesTabClick}
        >
          Your images
        </Button>
      </Row>
      <hr />
      <Row gap="md" justifyContent="between" alignItems="start">
        {activeTab === ImageModalTabs.Url && <ImageModalTabUrl editor={editor} />}
        {activeTab === ImageModalTabs.Upload && <ImageModalTabUpload editor={editor} />}
        {activeTab === ImageModalTabs.YourImages && <ImageModalTabYourImages editor={editor} />}
        <Col gap="md">
          <ImageAttributes />
        </Col>
      </Row>
      <hr />
      {payload.src && (
        <Col gap="md" alignSelf="between">
          {isCloudflareImage && (
            <Row gap="md">
              <TitleH4>Variants</TitleH4>
              <ImageVariantButtons selected={selectedVariant} onClick={handleVariantChange} />
            </Row>
          )}
          <TitleH4>Preview</TitleH4>
          <Row>
            <PreviewImage src={payload.src} alt={payload.altText} />
          </Row>
          <hr />
        </Col>
      )}
      <Row gap="md" alignSelf="end">
        <Button onClick={handleOnClick}>Add image</Button>
      </Row>
    </Col>
  );
};

export default ImageModalContent;
