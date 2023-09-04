import React, { useCallback, useState } from 'react';
import ContentSection from '../../components/ContentSection/ContentSection';
import Textarea from '../../components/Textarea/Textarea';
import { useGetPostById } from '../../api/posts/useGetPostById';
import { useInput } from '../../hooks/useInput';
import Input from '../../components/Input/Input';
import { Col, Row } from '../../components/Flex/Flex';
import Avatar from '../../components/Avatar/Avatar';
import { IMAGE_DEFAULT_WORLD_THUMBNAIL } from '../../utils/images/imageDefaultUrls';
import { Label } from '../../components/Typography/Label';
import ImageModal from '../../components/ImageModal/ImageModal';
import { PbImage } from '../../generated/api-types/data-contracts';
import { UpdatePostCacheHelper, useUpdatePost } from '../../api/posts/useUpdatePost';
import ErrorText from '../../components/ErrorText/ErrorText';
import { Button } from '../../components/Button/Button';

const textareaPlaceholder =
  'Short description of the post. What information does this post contain?';

interface PostEditModeProps {
  postId: number;
  cacheHelper?: UpdatePostCacheHelper;
  canChangeTitle?: boolean;
  canChangeDescription?: boolean;
  canChangeThumbnail?: boolean;
}

const PostEditMode: React.FC<PostEditModeProps> = ({
  postId,
  cacheHelper,
  canChangeTitle = true,
  canChangeDescription = true,
  canChangeThumbnail = true,
}) => {
  const { mutate: updatePost, isLoading, error } = useUpdatePost();
  const [showImageModal, setShowImageModal] = useState(false);
  const { data: postData, isLoading: isLoadingPost } = useGetPostById({
    enabled: postId > 0,
    variables: postId,
  });

  const { value: title, onChange: onChangeTitle } = useInput<string>(postData?.post?.title ?? '');
  const { value: description, onChange } = useInput<string, HTMLTextAreaElement>(
    postData?.post?.description ?? '',
  );

  const toggleImageModal = useCallback(() => {
    setShowImageModal((p) => !p);
  }, []);

  const changeThumbnailImage = useCallback(
    (image: PbImage) => {
      if (canChangeThumbnail) {
        updatePost({
          postId,
          cacheHelper,
          body: {
            imageThumbnailId: image.id,
          },
        });
      }
    },
    [cacheHelper, canChangeThumbnail, postId, updatePost],
  );

  const updatePostHandler = useCallback(() => {
    updatePost({
      postId,
      cacheHelper,
      body: {
        title: canChangeTitle ? title : undefined,
        description: canChangeDescription ? description : undefined,
      },
    });
  }, [cacheHelper, canChangeDescription, canChangeTitle, description, postId, title, updatePost]);

  const loading = isLoadingPost || isLoading;

  if (!canChangeTitle && !canChangeDescription && !canChangeThumbnail) return null;

  return (
    <ContentSection flexWrap="wrap" direction="column">
      <Row fullWidth gap="md" alignItems="start">
        <Col fullWidth gap="md">
          {canChangeTitle && (
            <Input
              id="title"
              label="Title"
              onChange={onChangeTitle}
              value={title}
              required
              fullWidth
            />
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
          <Button onClick={updatePostHandler} loading={loading}>
            Save
          </Button>
          <ErrorText error={error} />
        </Col>
        {canChangeThumbnail && (
          <Col gap="md" alignItems="center" padding="xl">
            <Label css={{ width: 'auto' }}>Thumbnail</Label>
            <Avatar
              loading={loading}
              onClick={toggleImageModal}
              size="xl"
              url={postData?.post?.imageThumbnailUrl ?? IMAGE_DEFAULT_WORLD_THUMBNAIL}
            />
          </Col>
        )}
      </Row>
      <ImageModal
        open={showImageModal}
        setOpen={setShowImageModal}
        trigger={null}
        onSubmit={changeThumbnailImage}
        uploadedFilename={`post-thumbnail-${postId}`}
        uploadedImageTypeId={100}
      />
    </ContentSection>
  );
};

export default PostEditMode;
