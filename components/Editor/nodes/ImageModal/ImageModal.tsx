import React, { useMemo } from 'react';
import Modal from '../../../Modal/Modal';
import ImageModalContent, { ImageModalContentProps } from './ImageModalContent';

interface ImageModalProps extends ImageModalContentProps {
  trigger: React.ReactNode;
  open?: boolean;
}

const ImageModal: React.FC<ImageModalProps> = ({ trigger, open, setOpen, ...contentProps }) => {
  const content = useMemo(
    () => <ImageModalContent setOpen={setOpen} {...contentProps} />,
    [contentProps, setOpen],
  );

  return <Modal open={open} onOpenChange={setOpen} size="xl" trigger={trigger} content={content} />;
};

export default ImageModal;
