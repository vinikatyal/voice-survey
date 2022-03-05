import React from "react";

import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";

import Layout from "../../components/Layout";
import SurveyHeader from "../../components/survey/SurveyHeader";
import UserSurveyQuesAnsSection from "../../components/survey/UserSurveyQuesAnsSection";

import styled from "@emotion/styled";

export default function answers() {
  return (
    <Layout>
      <SurveyHeader headerTitle="Survey's Name Here" currentTab="REPORT">
        <Container maxWidth="lg">
          <UserSurveyQuesAnsSection />
        </Container>
      </SurveyHeader>
    </Layout>
  );
}
