import HomepageHeader from "../components/homepage/HomepageHeader";
import HomepageContent from "../components/homepage/HomepageContent";
import Register from "../components/homepage/Register";
import Head from "next/head";
import Footer from "../components/footer/Footer";

export default function Home() {
  return (
    <>
      <Head>
        <title>Talebound</title>
      </Head>
      <HomepageHeader />
      <HomepageContent />
      <Register background />
      <Footer />
    </>
  )
}
