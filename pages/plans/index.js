import * as React from "react";

import Image from "next/image";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import Layout from "../../components/Layout";
import Limiter from "../../components/Limiter";
import StyledButton from "../../components/StyledButton";

import styled from "@emotion/styled";

const ImageContainer = styled(Box)({
  paddingTop: "30px",
  display: "flex",
  justifyContent: "center",
});

const PlanHeader = styled(Typography)({
  marginTop: "30px",
  padding: "19px 0",
  display: "flex",
  justifyContent: "center",
  backgroundColor: "#f5f8ff",
  fontFamily: "Poppins",
  fontSize: "24px",
  fontWeight: "600",
});

const PlansSection = styled("div")({
  display: "flex",
  justifyContent: "space-around",
  marginTop: "50px",
});

const NextSection = styled("div")({
  display: " flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  paddingTop: "30px",
});

export default function Index() {
  return (
    <Layout>
      <Limiter>
        <ImageContainer>
          <Image src={"/images/logo.png"} alt="background" />
        </ImageContainer>
      </Limiter>
      <PlanHeader>Choose plan</PlanHeader>

      <Limiter>
        <PlansSection>
          <Image
            src={"/images/plan-inactive.svg"}
            alt="plan-active-svg"
          ></Image>
          <Image src={"/images/plan-active.svg"} alt="plan-active-svg"></Image>
          <Image src={"images/plan-inactive.svg"} alt="plan-active-svg"></Image>
        </PlansSection>

        <NextSection>
          <StyledButton>Next</StyledButton>
        </NextSection>
      </Limiter>
    </Layout>
  );
}
