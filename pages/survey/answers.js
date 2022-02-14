import React from "react";

import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";

import Layout from "../../components/Layout";
import SurveyHeader from "../../components/survey/SurveyHeader";

import styled from "@emotion/styled";

export default function answers() {
  return (
    <Layout>
      <SurveyHeader headerTitle="Survey's Name Here" currentTab="REPORT">
        <Container maxWidth="lg">
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
            </Grid>
            <Grid item xs={12} sm={6}>
            </Grid>
          </Grid>
        </Container>
      </SurveyHeader>
    </Layout>
  );
}
