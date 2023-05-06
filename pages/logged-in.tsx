import Head from 'next/head';
import Footer from '../components/footer/Footer';
import Header from '../components/header/Header';
import Menu from '../components/global/Menu';
import React from 'react';
import { useAuth } from '../hooks/useAuth';
import { Client } from 'react-hydration-provider';

export default function Home() {
  const { user, isLoggedIn } = useAuth();

  return (
    <>
      <Head>
        <title>Talebound</title>
      </Head>
      <Menu />
      <Header />
      <Client>{user?.email}</Client>
      Logged in = {isLoggedIn ? 'true' : 'false'}
      <Footer />
    </>
  );
}
