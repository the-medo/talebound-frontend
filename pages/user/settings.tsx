import React from 'react';
import Head from 'next/head';
import Layout from '../../components/Layout/Layout';
import LeftNavbar from '../../components/LeftNavbar/LeftNavbar';
import AvatarChange from '../../component-sections/user-settings/AvatarChange';
import PasswordChange from '../../component-sections/user-settings/PasswordChange';

interface settingsProps {}

const settings: React.FC<settingsProps> = () => {
  return (
    <>
      <Head>
        <title>User settings</title>
      </Head>
      <Layout mandatoryLogin={true} vertical={true} navbar={<LeftNavbar />}>
        <AvatarChange />
        <PasswordChange />
      </Layout>
    </>
  );
};

export default settings;
