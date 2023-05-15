import React from 'react';
import { Column } from '../../components/Column/Column';
import InputFile from '../../components/InputFile/InputFile';
import { Button } from '../../components/Button/Button';
import { Avatar } from '@nextui-org/react';
import ContentSection from '../../components/ContentSection/ContentSection';

const AvatarChange: React.FC = () => {
  return (
    <ContentSection header="Change avatar" direction="row" justifyContent="space-between">
      <Column css={{ $$gap: '0.5rem' }}>
        <InputFile multiple={false} showBorder={false} showTitle={false} />
        <Button>Upload</Button>
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
