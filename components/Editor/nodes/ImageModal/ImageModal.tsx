import React, { useMemo } from 'react';
import { LexicalEditor } from 'lexical';
import Modal from '../../../Modal/Modal';
import ImageModalContent from './ImageModalContent';

interface ImageModalProps {
  editor: LexicalEditor;
  trigger: React.ReactNode;
}

const ImageModal: React.FC<ImageModalProps> = ({ editor, trigger }) => {
  const content = useMemo(() => <ImageModalContent editor={editor} />, [editor]);

  return <Modal size="md" trigger={trigger} content={content} />;
};

export default ImageModal;
