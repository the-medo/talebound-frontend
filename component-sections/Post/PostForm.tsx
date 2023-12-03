import React, { useCallback, useState } from 'react';
import Textarea from '../../components/Textarea/Textarea';
import { useInput } from '../../hooks/useInput';
import Input from '../../components/Input/Input';
import { Col, Row } from '../../components/Flex/Flex';
import Avatar from '../../components/Avatar/Avatar';
import { Label } from '../../components/Typography/Label';
import ImageModal from '../../components/ImageModal/ImageModal';
import { PbPost } from '../../generated/api-types/data-contracts';
import { Button } from '../../components/Button/Button';
import { useImage } from '../../hooks/useImage';

const textareaPlaceholder =
  'Short description of the post. What information does this post contain?';

interface PostFormProps {
  post?: PbPost;
  canChangeTitle?: boolean;
  canChangeDescription?: boolean;
  canChangeThumbnail?: boolean;
  onFinishCallback?: () => void;
}

const PostForm: React.FC<PostFormProps> = ({
  post,
  canChangeTitle = true,
  canChangeDescription = true,
  canChangeThumbnail = true,
}) => {
  // const { mutate: createMenuItemPost, isPending, error } = useCreateMenuItemPost();

  const [showImageModal, setShowImageModal] = useState(false);

  const { image: thumbnailImage } = useImage(post?.imageThumbnailId);
  const { value: title, onChange: onChangeTitle } = useInput<string>(post?.title ?? '');
  const { value: description, onChange } = useInput<string, HTMLTextAreaElement>(
    post?.description ?? '',
  );

  const toggleImageModal = useCallback(() => {
    setShowImageModal((p) => !p);
  }, []);

  const createPostHandler = useCallback(() => {}, []);

  // const pending = isPending;
  const pending = false;

  if (!canChangeTitle && !canChangeDescription && !canChangeThumbnail) return null;

  return (
    <>
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
          <Button onClick={createPostHandler} loading={pending}>
            {post ? 'Update' : 'Create'}
          </Button>
          {/*<ErrorText error={error} />*/}
        </Col>
        {canChangeThumbnail && (
          <Col gap="md" alignItems="center" padding="xl">
            <Label css={{ width: 'auto' }}>Thumbnail</Label>
            <Avatar
              loading={pending}
              onClick={toggleImageModal}
              size="xl"
              url={thumbnailImage?.url}
            />
          </Col>
        )}
      </Row>
      <ImageModal
        open={showImageModal}
        setOpen={setShowImageModal}
        trigger={null}
        onSubmit={() => {}}
        uploadedFilename={`post-thumbnail`}
        uploadedImageTypeId={100}
      />
    </>
  );
};

export default PostForm;
