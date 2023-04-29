import HomepageContent from "../components/homepage/HomepageContent";
import Register from "../components/homepage/Register";
import Head from "next/head";
import Footer from "../components/footer/Footer";
import Header from "../components/header/Header";
import Menu from "../components/global/Menu";
import {Navbar} from "@nextui-org/react";
import React from "react";

export default function Home() {
  return (
    <>
      <Head>
        <title>Talebound</title>
      </Head>
      <Menu />
      <Header />
      <HomepageContent />
      <Register background />
      <Footer />
    </>
  )
}
