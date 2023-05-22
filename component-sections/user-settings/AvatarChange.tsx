import React, { useCallback, useRef, useState } from 'react';
import { Column } from '../../components/Flex/Flex';
import InputFile from '../../components/InputFile/InputFile';
import { Button } from '../../components/Button/Button';
import { Avatar } from '@nextui-org/react';
import ContentSection from '../../components/ContentSection/ContentSection';
import { useUploadFile } from '../../api/useUploadFile';
import { PbUploadImageRequest } from '../../generated/api-types/data-contracts';

const AvatarChange: React.FC = () => {
  const [uploadArgs, setUploadArgs] = useState<PbUploadImageRequest>();
  const doUploadFile = useUploadFile();
  const inputRef = useRef<HTMLInputElement>(null);

  const onChange: React.ChangeEventHandler<HTMLInputElement> = useCallback(async (event) => {
    if (event.target.files) {
      const file = event.target.files[0];
      if (file) {
        const arrayBuffer = await file.arrayBuffer();

        // Convert data to base64
        let binary = '';
        const bytes = new Uint8Array(arrayBuffer);
        const len = bytes.byteLength;
        for (let i = 0; i < len; i++) {
          binary += String.fromCharCode(bytes[i]);
        }
        const base64Data = window.btoa(binary);

        setUploadArgs({
          filename: file.name,
          data: base64Data,
        });
      }
    }
  }, []);

  const handleUpload = useCallback(() => {
    if (!uploadArgs) return;
    doUploadFile.mutate(uploadArgs);

    if (inputRef.current) {
      inputRef.current.value = '';
    }
  }, [doUploadFile, uploadArgs]);

  return (
    <ContentSection header="Change avatar" direction="row" justifyContent="space-between">
      <Column css={{ $$gap: '0.5rem' }}>
        <InputFile
          ref={inputRef}
          onChange={onChange}
          multiple={false}
          showBorder={false}
          showTitle={false}
        />
        <Button onClick={handleUpload}>Upload</Button>
      </Column>
      <Avatar
        color="primary"
        css={{ size: '7rem', marginTop: '-1rem' }}
        src="/assets/images/avatar.png"
      />
    </ContentSection>
  );
};

export default AvatarChange;
