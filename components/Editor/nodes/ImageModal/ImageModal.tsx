import React, { useMemo } from 'react';
import { LexicalEditor } from 'lexical';
import Modal from '../../../Modal/Modal';
import ImageModalContent from './ImageModalContent';

interface ImageModalProps {
  editor: LexicalEditor;
  trigger: React.ReactNode;
  open?: boolean;
  setOpen: (v: boolean) => void;
}

const ImageModal: React.FC<ImageModalProps> = ({ editor, trigger, open, setOpen }) => {
  const content = useMemo(
    () => <ImageModalContent editor={editor} setOpen={setOpen} />,
    [editor, setOpen],
  );

  return <Modal open={open} onOpenChange={setOpen} size="xl" trigger={trigger} content={content} />;
};

export default ImageModal;
