import HomepageHeader from '../components/header/HomepageHeader';
import Head from 'next/head';
import PagePrivacyPolicy from '../screens/privacy-policy/PagePrivacyPolicy';
import Footer from '../components/footer/Footer';

export default function PrivacyPolicy() {
  return (
    <>
      <Head>
        <title>Talebound - Privacy policy</title>
      </Head>
      <HomepageHeader />
      <PagePrivacyPolicy />
      <Footer />
    </>
  );
}
