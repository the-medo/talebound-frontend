import React from 'react';
import { LexicalEditor } from 'lexical';
import { useGetImages } from '../../../../api/useGetImages';
import { useAuth } from '../../../../hooks/useAuth';
import { Spin } from 'antd';
import { Row } from '../../../Flex/Flex';
import InfiniteScrollObserver from '../../../InfiniteScrollObserver/InfiniteScrollObserver';
import { ImageVariant } from '../../../../utils/images/image_utils';

interface ImageModalTabYourImagesProps {
  editor: LexicalEditor;
}

const ImageModalTabYourImages: React.FC<ImageModalTabYourImagesProps> = ({ editor }) => {
  const { user } = useAuth();

  const {
    data: imagesData,
    isLoading: isLoadingImages,
    fetchNextPage,
    hasNextPage,
  } = useGetImages({
    enabled: !!user?.id,
    variables: {
      userId: user?.id,
      imageTypeId: 100,
    },
  });

  return (
    <Spin spinning={isLoadingImages}>
      <Row gap="sm" wrap css={{ maxHeight: 300, overflowY: 'scroll' }}>
        {imagesData?.pages.map((page) =>
          page.images?.map((i) => (
            <img key={i.imgGuid} alt={i.name} src={`${i.baseUrl}/${ImageVariant['100x100']}`} />
          )),
        )}
        {hasNextPage && <InfiniteScrollObserver runOnObserve={fetchNextPage} />}
      </Row>
    </Spin>
  );
};

export default ImageModalTabYourImages;
