import React, { useMemo } from 'react';
import { LexicalEditor } from 'lexical';
import { useInput } from '../../../../hooks/useInput';
import Input from '../../../Input/Input';

interface ImageModalTabUrlProps {
  editor: LexicalEditor;
}

const ImageModalTabUrl: React.FC<ImageModalTabUrlProps> = ({ editor }) => {
  const { value: urlValue, onChange: onChangeUrl } = useInput<string>('');

  return (
    <div>
      <Input id="imageUrl" label="Image URL" onChange={onChangeUrl} fullWidth required />
    </div>
  );
};

export default ImageModalTabUrl;
