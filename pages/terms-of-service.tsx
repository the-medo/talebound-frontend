import HomepageHeader from "../components/header/HomepageHeader";
import Head from "next/head";
import Footer from "../components/footer/Footer";
import PageTermsOfService from "../screens/terms-of-service/PageTermsOfService";

export default function PrivacyPolicy() {
  return (
    <>
      <Head>
        <title>Talebound - Terms of service</title>
      </Head>
      <HomepageHeader />
      <PageTermsOfService />
      <Footer />
    </>
  )
}
