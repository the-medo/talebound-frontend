import React, { useCallback, useEffect } from 'react';
import { $getNodeByKey, LexicalEditor, NodeKey } from 'lexical';
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
  imageModifyVariant,
  ImageVariant,
  isTaleboundCloudflareImage,
} from '../../../../utils/images/image_utils';
import { TitleH4 } from '../../../Typography/Title';
import ImageVariantButtons from '../../../ImageVariantButtons/ImageVariantButtons';
import {
  resetInlineImagePayload,
  setSelectedVariant,
  updateInlineImagePayload,
} from './imageModalSlice';
import { ImageModalAction, ImageModalMode } from './imageModalLib';
import { InlineImageNode } from '../InlineImageNode/InlineImageNode';

enum ImageModalTabs {
  Url,
  Upload,
  YourImages,
}

export interface ImageModalContentProps {
  editor: LexicalEditor;
  mode?: ImageModalMode;
  nodeKey?: NodeKey;
  setOpen: (v: boolean) => void;
}

const PreviewImage = styled('img', {
  maxWidth: '1000px',
});

const ImageModalContent: React.FC<ImageModalContentProps> = ({
  editor,
  mode = ImageModalMode.Insert,
  nodeKey,
  setOpen,
}) => {
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

  const handleSubmit = useCallback(() => {
    if (mode === ImageModalMode.Update) {
      if (nodeKey) {
        const node = editor.getEditorState().read(() => $getNodeByKey(nodeKey) as InlineImageNode);
        if (node) {
          editor.update(() => {
            node.update(payload);
          });
        }
      }
    } else if (mode === ImageModalMode.Insert) {
      editor.dispatchCommand(INSERT_INLINE_IMAGE_COMMAND, payload);
    }
    dispatch(resetInlineImagePayload());
    setOpen(false);
  }, [mode, setOpen, nodeKey, payload, editor, dispatch]);

  const handleVariantChange = useCallback(
    (variant: ImageVariant) => {
      dispatch(setSelectedVariant(variant));
    },
    [dispatch],
  );

  useEffect(() => {
    if (isTaleboundCloudflareImage(payload.src) && selectedVariant) {
      const newUrl = imageModifyVariant(payload.src, selectedVariant);
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
            <Row gap="md" alignItems="start">
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
        <Button onClick={handleSubmit}>{ImageModalAction[mode]} image</Button>
      </Row>
    </Col>
  );
};

export default ImageModalContent;
