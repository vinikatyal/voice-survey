import React from "react";

import { useSurvey } from "../../../context/SurveyState";

import Container from "@mui/material/Container";

import Layout from "../../../components/Layout";
import SurveyHeader from "../../../components/survey/SurveyHeader";
import UserSurveyQuesAnsSection from "../../../components/survey/UserSurveyQuesAnsSection";

import styled from "@emotion/styled";

export default function answers() {
  const survey = useSurvey();
  return (
    <Layout>
      <SurveyHeader
        headerTitle={survey.surveyTitle}
        backRoute="/survey/create"
        currentTab="REPORT"
      >
        <Container maxWidth="lg">
          <UserSurveyQuesAnsSection />
        </Container>
      </SurveyHeader>
    </Layout>
  );
}
