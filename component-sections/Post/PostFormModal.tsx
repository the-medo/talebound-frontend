import React, { useCallback, useMemo } from 'react';
import Modal from '../../components/Modal/Modal';
import { PbDataPost, PbModule } from '../../generated/api-types/data-contracts';
import PostForm from './PostForm';

interface PostFormModalProps {
  module: PbModule;
  post?: PbDataPost;
  trigger: React.ReactNode;
  open?: boolean;
  setOpen: (v: boolean) => void;
}

const PostFormModal: React.FC<PostFormModalProps> = ({ module, post, trigger, open, setOpen }) => {
  const onFinishCallback = useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  const content = useMemo(
    () => <PostForm post={post} module={module} onFinishCallback={onFinishCallback} />,
    [post, onFinishCallback, module],
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
