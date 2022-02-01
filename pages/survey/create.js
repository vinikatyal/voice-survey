import * as React from "react";

import Image from "next/image";

import Container from "@mui/material/Container";


import Layout from "../../components/Layout";
import SurveyHeader from "../../components/survey/SurveyHeader";

import styled from "@emotion/styled";

const CreateSection = styled(Container)(({ theme }) => ({
  marginTop: theme.spacing(3),
  width: "100%",
  display: "flex",
}));

export default function Create() {
  return (
    <Layout>
      <SurveyHeader currentTab="CREATE"></SurveyHeader>
      <CreateSection></CreateSection>
    </Layout>
  );
}
