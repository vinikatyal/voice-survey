import * as React from "react";
import styled from "@emotion/styled";
import Head from "next/head";

const FullBackground = styled("div")(({ bgColor }) => ({
  overflow: "auto",
  height: "auto",
  backgroundColor: bgColor,
  marginBottom: "20px"
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
