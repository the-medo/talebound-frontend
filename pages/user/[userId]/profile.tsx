import React from 'react';
import Head from 'next/head';
import Layout from '../../../components/Layout/Layout';
import LeftNavbar from '../../../components/LeftNavbar/LeftNavbar';
import { Row } from '../../../components/Flex/Flex';
import UserProfile from '../../../component-sections/UserProfile/UserProfile';
import useNumericParam from '../../../hooks/useNumericParam';

interface profileProps {}

const profile: React.FC<profileProps> = () => {
  const userId = useNumericParam('userId');

  return (
    <>
      <Head>
        <title>User profile</title>
      </Head>
      <Layout mandatoryLogin={false} vertical={true} navbar={<LeftNavbar />}>
        <Row css={{ flexWrap: 'wrap' }}>{userId && <UserProfile userId={userId} />}</Row>
      </Layout>
    </>
  );
};

export default profile;
