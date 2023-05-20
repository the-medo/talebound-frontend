import React from 'react';
import Head from 'next/head';
import Layout from '../../components/Layout/Layout';
import LeftNavbar from '../../components/LeftNavbar/LeftNavbar';
import AvatarChange from '../../component-sections/user-settings/AvatarChange';
import PasswordChange from '../../component-sections/user-settings/PasswordChange';
import SelfEvaluation from '../../component-sections/user-settings/SelfEvaluation';
import { Column, Row } from '../../components/Flex/Flex';

interface settingsProps {}

const settings: React.FC<settingsProps> = () => {
  return (
    <>
      <Head>
        <title>User settings</title>
      </Head>
      <Layout mandatoryLogin={true} vertical={true} navbar={<LeftNavbar />}>
        <Row css={{ flexWrap: 'wrap' }}>
          <Column css={{ flexGrow: 5, flexBasis: '10rem' }}>
            <AvatarChange />
            <PasswordChange />
          </Column>
          <Column css={{ flexGrow: 1, flexBasis: '30rem' }}>
            <SelfEvaluation />
          </Column>
        </Row>
      </Layout>
    </>
  );
};

export default settings;
