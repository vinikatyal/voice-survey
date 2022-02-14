import * as React from "react";
import Head from "next/head";

import ThemeContext from "../../context/ThemeContext";
import { ThemeValues } from "../../context/ThemeContext";

import Layout from "../../components/Layout";

export default function Index() {
  const { theme } = React.useContext(ThemeContext);
  const bg =
    theme === ThemeValues.BLUE
      ? "body {background: linear-gradient(to right, #1EA798, #2D4C93)!important;}"
      : theme === ThemeValues.PINK
      ? "body {background: linear-gradient(to right, #EC2E89, #9540E4)!important;}"
      : theme === ThemeValues.YELLOW
      ? "body {background: linear-gradient(to right, #350F69, #BA824C)!important;}"
      : "";
  return (
    <>
      <Head>
        <style>{bg}</style>
      </Head>
      <Layout variant={theme}>My theme demo</Layout>
    </>
  );
}
