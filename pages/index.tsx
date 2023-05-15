import HomepageContent from '../component-sections/homepage/HomepageContent';
import Register from '../component-sections/homepage/Register';
import Head from 'next/head';
import Layout from '../components/layout/Layout';
import { Client } from 'react-hydration-provider';
import React from 'react';

export default function Home() {
  return (
    <>
      <Head>
        <title>Talebound</title>
      </Head>
      <Layout vertical>
        <HomepageContent />
        <Client>
          <Register background />
        </Client>
      </Layout>
    </>
  );
}
