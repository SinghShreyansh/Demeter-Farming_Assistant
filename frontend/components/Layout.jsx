import React, { FC } from "react";
import Head from "next/head";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Layout = ({ title, content, children }) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={content} />
        {/* <link
          rel="icon"
          href="https://res.cloudinary.com/atharva7/image/upload/v1664640503/samples/plantifylogo_ez5l1p.png"
        /> */}
        <link rel="manifest" href="/manifest.json" />
      </Head>
      <div className="">{children}</div>
    </>
  );
};

export default Layout;
