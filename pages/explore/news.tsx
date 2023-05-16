import React from 'react';
import Head from 'next/head';
import Layout from '../../components/Layout/Layout';
import LeftNavbar from '../../components/LeftNavbar/LeftNavbar';
import { Column } from '../../components/Column/Column';
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
        <Column css={{ padding: '2rem', gap: '2rem' }}>
          <InputFileModal />
        </Column>
      </Layout>
    </>
  );
};

export default news;
