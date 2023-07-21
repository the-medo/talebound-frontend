import React, { useCallback, useMemo } from 'react';
import { LexicalEditor } from 'lexical';
import { useGetImages } from '../../../../api/useGetImages';
import { useAuth } from '../../../../hooks/useAuth';
import { Spin } from 'antd';
import { Row } from '../../../Flex/Flex';
import InfiniteScrollObserver from '../../../InfiniteScrollObserver/InfiniteScrollObserver';
import { imageUrlWithoutVariant, ImageVariant } from '../../../../utils/images/image_utils';
import Image from '../../../Image/Image';
import { PbImage } from '../../../../generated/api-types/data-contracts';
import { updateInlineImagePayload } from './imageModalSlice';
import { useDispatch, useSelector } from 'react-redux';
import { ReduxState } from '../../../../store';

interface ImageModalTabYourImagesProps {
  editor: LexicalEditor;
}

const ImageModalTabYourImages: React.FC<ImageModalTabYourImagesProps> = ({ editor }) => {
  const { user } = useAuth();
  const dispatch = useDispatch();
  const payload = useSelector((state: ReduxState) => state.imageModal.inlineImagePayload);

  const {
    data: imagesData,
    isFetching: isFetchingImages,
    fetchNextPage,
    hasNextPage,
  } = useGetImages({
    enabled: !!user?.id,
    variables: {
      userId: user?.id,
      imageTypeId: 100,
    },
  });

  const onClick = useCallback(
    (image: PbImage) => {
      dispatch(
        updateInlineImagePayload({
          src: image.url,
        }),
      );
    },
    [dispatch],
  );

  const selectedImageBaseUrl = useMemo(() => imageUrlWithoutVariant(payload.src), [payload.src]);

  return (
    <Spin spinning={isFetchingImages}>
      <Row gap="sm" wrap css={{ maxHeight: 300, overflowY: 'scroll' }}>
        {imagesData?.pages.map((page) =>
          page.images?.map((i) => (
            <Image
              key={i.imgGuid}
              image={i}
              onClick={onClick}
              variant={ImageVariant['150x150']}
              selected={selectedImageBaseUrl === i.baseUrl}
            />
          )),
        )}
        {hasNextPage && !isFetchingImages && (
          <InfiniteScrollObserver runOnObserve={fetchNextPage} />
        )}
      </Row>
    </Spin>
  );
};

export default ImageModalTabYourImages;
