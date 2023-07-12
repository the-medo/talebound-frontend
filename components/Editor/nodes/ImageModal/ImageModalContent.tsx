import React, { useCallback } from 'react';
import { LexicalEditor } from 'lexical';
import { Col, Row } from '../../../Flex/Flex';
import { Button } from '../../../Button/Button';
import ImageModalTabUrl from './ImageModalTabUrl';
import ImageModalTabUpload from './ImageModalTabUpload';
import ImageModalTabYourImages from './ImageModalTabYourImages';
import { INSERT_INLINE_IMAGE_COMMAND } from '../../plugins/InlineImagePlugin';
import { useSelector } from 'react-redux';
import { ReduxState } from '../../../../store';
import ImageAttributes from './ImageAttributes';

enum ImageModalTabs {
  Url,
  Upload,
  YourImages,
}

interface ImageModalContentProps {
  editor: LexicalEditor;
}

const ImageModalContent: React.FC<ImageModalContentProps> = ({ editor }) => {
  const [activeTab, setActiveTab] = React.useState(ImageModalTabs.Url);
  const payload = useSelector((state: ReduxState) => state.imageModal.inlineImagePayload);

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
    // onClose();
  }, [payload, editor]);

  return (
    <>
      <Row gap="md">
        <Col gap="md" css={{ flexGrow: 1 }}>
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
          <Row gap="md" justifyContent="between">
            {activeTab === ImageModalTabs.Url && <ImageModalTabUrl editor={editor} />}
            {activeTab === ImageModalTabs.Upload && <ImageModalTabUpload editor={editor} />}
            {activeTab === ImageModalTabs.YourImages && <ImageModalTabYourImages editor={editor} />}
            <Col gap="md">
              <ImageAttributes />
            </Col>
          </Row>
        </Col>
      </Row>
      <Button onClick={handleOnClick}>Add image</Button>
    </>
  );
};

export default ImageModalContent;
