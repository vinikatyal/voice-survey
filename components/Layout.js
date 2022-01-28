import * as React from "react";
import styled from "@emotion/styled";
import Head from "next/head";

const FullBackground = styled("div")(({ bgColor }) => ({
  height: "100vh",
  backgroundColor: bgColor,
}));

export default function Layout(props) {
  return (
    <FullBackground {...props}>
      <Head>
        <title>Voice Survey</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {props.children}
    </FullBackground>
  );
}
