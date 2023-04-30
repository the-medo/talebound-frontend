import HomepageHeader from "../components/header/HomepageHeader";
import Head from "next/head";
import Footer from "../components/footer/Footer";
import PageAbout from "../screens/about/PageAbout";

export default function PrivacyPolicy() {
  return (
    <>
      <Head>
        <title>Talebound - About</title>
      </Head>
      <HomepageHeader />
      <PageAbout />
      <Footer />
    </>
  )
}
