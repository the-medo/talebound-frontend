import React from 'react';
import Head from 'next/head';
import Layout from '../../components/layout/Layout';
import LeftNavbar from '../../components/navbar/LeftNavbar';
import { useAuth } from '../../hooks/useAuth';
import InputFile from '../../components/InputFile/InputFile';
import ContentSection from '../../components/ContentSection/ContentSection';
import { Button } from '../../components/global/Button';
import { Avatar } from '@nextui-org/react';
import { Column } from '../../components/global/Column';

interface settingsProps {}

const settings: React.FC<settingsProps> = () => {
  const { user, isLoggedIn } = useAuth();

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
            bordered
            as="button"
            color="primary"
            css={{ size: '7rem', marginTop: '-1rem' }}
            src="/assets/images/avatar.png"
          />
        </ContentSection>
        <ContentSection header="Change password">
          <InputFile multiple={false} showBorder={false} showTitle={false} />
        </ContentSection>
      </Layout>
    </>
  );
};

export default settings;
