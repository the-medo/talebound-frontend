import React, { useEffect } from 'react';
import { LexicalEditor } from 'lexical';
import { useInput } from '../../../../hooks/useInput';
import Input from '../../../Input/Input';
import { Row } from '../../../Flex/Flex';
import { useDispatch, useSelector } from 'react-redux';
import { updateInlineImagePayload } from './imageModalSlice';
import { ReduxState } from '../../../../store';

interface ImageModalTabUrlProps {
  editor: LexicalEditor;
}

const ImageModalTabUrl: React.FC<ImageModalTabUrlProps> = () => {
  const dispatch = useDispatch();
  const src = useSelector((state: ReduxState) => state.imageModal.inlineImagePayload.src);
  const { value: urlValue, onChange: onChangeUrl } = useInput<string>(src);

  useEffect(() => {
    dispatch(
      updateInlineImagePayload({
        src: urlValue,
      }),
    );
  }, [dispatch, urlValue]);

  return (
    <Row gap="sm" css={{ width: '300px' }}>
      <Input
        id="imageUrl"
        label="Image URL"
        onChange={onChangeUrl}
        value={src}
        required
        fullWidth
      />
    </Row>
  );
};

export default ImageModalTabUrl;
