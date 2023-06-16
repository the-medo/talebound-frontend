import React from 'react';
import Head from 'next/head';
import Layout from '../../components/Layout/Layout';
import LeftNavbar from '../../components/LeftNavbar/LeftNavbar';
import { Col } from '../../components/Flex/Flex';
import InputFileModal from '../../components/InputFileModal/InputFileModal';

interface newsProps {}

const news: React.FC<newsProps> = () => {
  return (
    <>
      <Head>
        <title>Talebound</title>
      </Head>
      <Layout mandatoryLogin={true}>
        <LeftNavbar />
        <Col gap="lg" padding="lg">
          <InputFileModal />
        </Col>
      </Layout>
    </>
  );
};

export default news;
