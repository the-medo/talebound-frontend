import React from 'react';
import Head from 'next/head';
import Layout from '../../components/layout/Layout';
import LeftNavbar from '../../components/navbar/LeftNavbar';
import { useAuth } from '../../hooks/useAuth';
import InputFile from '../../components/InputFile/InputFile';
import ContentSection from '../../components/ContentSection/ContentSection';
import { Button } from '../../components/global/Button';
import { Avatar, Loading, Text } from '@nextui-org/react';
import { Column } from '../../components/global/Column';
import PasswordChangeInputs, {
  PasswordChangeStatus,
} from '../../components/PasswordChangeInputs/PasswordChangeInputs';

interface settingsProps {}

const settings: React.FC<settingsProps> = () => {
  const { user, isLoggedIn } = useAuth();

  const [passwordValue, setPasswordValue] = React.useState<string>('');
  const [externalButtonDisabled, setExternalButtonDisabled] = React.useState<boolean>(true);

  return (
    <>
      <Head>
        <title>User settings</title>
      </Head>
      <Layout mandatoryLogin={true} vertical={true} navbar={<LeftNavbar />}>
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
        <ContentSection header="Change password">
          <PasswordChangeInputs
            display={PasswordChangeStatus.PasswordForm}
            setPasswordValue={setPasswordValue}
            setButtonDisabled={setExternalButtonDisabled}
          />

          <Button onClick={() => {}}>Change</Button>
        </ContentSection>
      </Layout>
    </>
  );
};

export default settings;
