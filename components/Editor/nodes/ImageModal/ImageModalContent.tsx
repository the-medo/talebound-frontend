import React, { useCallback } from 'react';
import { LexicalEditor } from 'lexical';
import { Col, Row } from '../../../Flex/Flex';
import { Button } from '../../../Button/Button';
import ImageModalTabUrl from './ImageModalTabUrl';
import ImageModalTabUpload from './ImageModalTabUpload';
import ImageModalTabYourImages from './ImageModalTabYourImages';

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

  return (
    <Col gap="md">
      <Row gap="sm">
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
      {activeTab === ImageModalTabs.Url && <ImageModalTabUrl editor={editor} />}
      {activeTab === ImageModalTabs.Upload && <ImageModalTabUpload editor={editor} />}
      {activeTab === ImageModalTabs.YourImages && <ImageModalTabYourImages editor={editor} />}
    </Col>
  );
};

export default ImageModalContent;
