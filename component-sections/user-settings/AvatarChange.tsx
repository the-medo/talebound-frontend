import React, { useCallback, useRef, useState } from 'react';
import { Column } from '../../components/Flex/Flex';
import InputFile from '../../components/InputFile/InputFile';
import { Button } from '../../components/Button/Button';
import { Avatar, Loading } from '@nextui-org/react';
import ContentSection from '../../components/ContentSection/ContentSection';
import { UploadUserAvatarRequest, useUploadUserAvatar } from '../../api/useUploadUserAvatar';
import { useAuth } from '../../hooks/useAuth';
import { updateUser } from '../../utils/auth/userSlice';
import { useDispatch } from 'react-redux';
import { DEFAULT_AVATAR_URL } from '../../utils/constants';

const AvatarChange: React.FC = () => {
  const { user } = useAuth();
  const dispatch = useDispatch();

  const doUploadAvatar = useUploadUserAvatar({
    onSuccess: (data) => {
      dispatch(
        updateUser({
          imgId: data.data.image?.id,
          img: data.data.image,
        }),
      );
    },
  });

  const [uploadArgs, setUploadArgs] = useState<UploadUserAvatarRequest>();
  const inputRef = useRef<HTMLInputElement>(null);

  const onChange: React.ChangeEventHandler<HTMLInputElement> = useCallback(
    async (event) => {
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
            userId: user?.id ?? 0,
            data: base64Data,
          });
        }
      }
    },
    [user?.id],
  );

  const handleUpload = useCallback(() => {
    if (!uploadArgs) return;
    doUploadAvatar.mutate(uploadArgs);

    setUploadArgs(undefined);
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  }, [doUploadAvatar, uploadArgs]);

  return (
    <ContentSection header="Change avatar" direction="row" justifyContent="space-between">
      <Column css={{ $$gap: '0.5rem' }}>
        <InputFile
          onChange={onChange}
          multiple={false}
          showBorder={false}
          showTitle={false}
          ref={inputRef}
        />
        <Button onClick={handleUpload}>
          {doUploadAvatar.isLoading ? <Loading color="currentColor" size="xs" /> : 'Upload'}
        </Button>
      </Column>
      <Avatar
        color="primary"
        css={{ size: '7rem', marginTop: '-1rem' }}
        src={user?.img?.url ?? DEFAULT_AVATAR_URL}
      />
    </ContentSection>
  );
};

export default AvatarChange;
