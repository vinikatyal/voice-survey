import React from "react";

import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";

import Layout from "../../components/Layout";
import SurveyHeader from "../../components/survey/SurveyHeader";

import styled from "@emotion/styled";
import { useSurvey } from "../../context/SurveyState";

const StyledCompletionRate = styled("div")({
  width: "100%",
  height: "238px",
  margin: "30px 0",
  padding: "20px 20px 21px",
  objectFit: "contain",
  borderRadius: "8px",
  border: "solid 1px #d1d1d1",
  backgroundColor: "#fff",
});
export default function report() {
  const survey = useSurvey();
  return (
    <Layout>
      <SurveyHeader
        headerTitle={survey.surveyTitle}
        backRoute="/survey/create"
        currentTab="REPORT"
      >
        <Container maxWidth="lg">
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <StyledCompletionRate>Completion rate</StyledCompletionRate>
            </Grid>
            <Grid item xs={12} sm={6}>
              <StyledCompletionRate>average sentiment</StyledCompletionRate>
            </Grid>
          </Grid>
        </Container>
      </SurveyHeader>
    </Layout>
  );
}
