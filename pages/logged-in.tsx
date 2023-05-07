import Head from 'next/head';
import Footer from '../components/footer/Footer';
import Header from '../components/header/Header';
import Menu from '../components/global/Menu';
import React from 'react';
import { useAuth } from '../hooks/useAuth';
import { Client } from 'react-hydration-provider';
import Layout from '../components/layout/Layout';

export default function Home() {
  const { user, isLoggedIn } = useAuth();

  return (
    <>
      <Head>
        <title>Talebound</title>
      </Head>
      <Layout>
        <Client>{user?.email}</Client>
        <Client>Logged in = {isLoggedIn ? 'true' : 'false'}</Client>
      </Layout>
    </>
  );
}
