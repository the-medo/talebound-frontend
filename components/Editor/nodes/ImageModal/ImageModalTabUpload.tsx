import React, { useCallback, useRef, useState } from 'react';
import { LexicalEditor } from 'lexical';
import { useUploadImage } from '../../../../api/useUploadImage';
import { fileInputChanged } from '../../../../utils/functions/fileInputChanged';
import { PbUploadImageRequest } from '../../../../generated/api-types/data-contracts';
import InputFile from '../../../InputFile/InputFile';
import { Button } from '../../../Button/Button';
import Loading from '../../../Loading/Loading';
import { Col, Row } from '../../../Flex/Flex';
import { useDispatch } from 'react-redux';
import { updateInlineImagePayload } from './imageModalSlice';
import ErrorText from '../../../ErrorText/ErrorText';

interface ImageModalTabUploadProps {
  editor: LexicalEditor;
}

const ImageModalTabUpload: React.FC<ImageModalTabUploadProps> = () => {
  const dispatch = useDispatch();
  const doUploadImage = useUploadImage({
    onSuccess: (data) => {
      dispatch(
        updateInlineImagePayload({
          src: data.data.url,
        }),
      );
    },
  });

  const [uploadArgs, setUploadArgs] = useState<PbUploadImageRequest>();
  const inputRef = useRef<HTMLInputElement>(null);

  const onChange: React.ChangeEventHandler<HTMLInputElement> = useCallback(
    async (event) =>
      fileInputChanged(event, (base64Data) =>
        setUploadArgs({
          filename: 'post-image',
          data: base64Data,
        }),
      ),
    [],
  );

  const handleUpload = useCallback(() => {
    if (!uploadArgs) return;
    doUploadImage.mutate(uploadArgs);

    setUploadArgs(undefined);
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  }, [doUploadImage, uploadArgs]);

  return (
    <Col gap="md">
      <InputFile
        onChange={onChange}
        multiple={false}
        showBorder={false}
        showTitle={false}
        ref={inputRef}
        disabled={doUploadImage.isLoading}
      />
      <Row gap="sm">
        <Button onClick={handleUpload} disabled={doUploadImage.isLoading}>
          {doUploadImage.isLoading ? <Loading color="currentColor" size="xs" /> : 'Upload'}
        </Button>
        <ErrorText error={doUploadImage.error} />
      </Row>
    </Col>
  );
};

export default ImageModalTabUpload;
