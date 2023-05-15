import React from 'react';
import Head from 'next/head';
import Layout from '../../components/layout/Layout';
import LeftNavbar from '../../components/navbar/LeftNavbar';
import { useAuth } from '../../hooks/useAuth';
import InputFile from '../../components/InputFile/InputFile';
import ContentSection from '../../components/ContentSection/ContentSection';
import { Button } from '../../components/Button/Button';
import { Avatar, Loading, Text } from '@nextui-org/react';
import { Column } from '../../components/Column/Column';
import PasswordChangeInputs, {
  PasswordChangeStatus,
} from '../../components/PasswordChangeInputs/PasswordChangeInputs';
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
