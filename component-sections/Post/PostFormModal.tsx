import React, { useCallback, useMemo } from 'react';
import Modal from '../../components/Modal/Modal';
import { PbDataPost, PbPlacement } from '../../generated/api-types/data-contracts';
import PostForm from './PostForm';

interface PostFormModalProps {
  placement: PbPlacement;
  post?: PbDataPost;
  trigger: React.ReactNode;
  open?: boolean;
  setOpen: (v: boolean) => void;
}

const PostFormModal: React.FC<PostFormModalProps> = ({
  placement,
  post,
  trigger,
  open,
  setOpen,
}) => {
  const onFinishCallback = useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  const content = useMemo(
    () => <PostForm post={post} placement={placement} onFinishCallback={onFinishCallback} />,
    [post, onFinishCallback, placement],
  );

  return (
    <Modal
      trigger={trigger}
      open={open}
      title={post ? 'Update post' : 'Create post'}
      content={content}
      onOpenChange={setOpen}
      size="sm"
    />
  );
};

export default PostFormModal;
