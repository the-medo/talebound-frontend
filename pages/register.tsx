import HomepageHeader from "../components/header/HomepageHeader";
import Register from "../components/homepage/Register";
import Head from "next/head";

export default function RegisterPage() {
  return (
    <>
      <Head>
        <title>Talebound - register</title>
      </Head>
      <HomepageHeader />
      <Register />
    </>
  )
}
