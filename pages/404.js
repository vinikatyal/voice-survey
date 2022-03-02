import React from "react";

import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";

import Image from "next/image";

import styled from "@emotion/styled";

const BoxCustom = styled(Container)(({}) => ({
  height: "100vh",
  width: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  textAlign: "center"
}));

const Text = styled("div")(({}) => ({
  fontWeight: "600",
  fontSize: "16px",
}));

export default function Custom404() {
  return (
    <BoxCustom container>
      <Grid item>
        <Image src={"/images/404.webp"} width={291} height={139} />
        <Text>Sorry, the page was not found!</Text>
        <a href="/login">Go back</a>
      </Grid>
    </BoxCustom>
  );
}
