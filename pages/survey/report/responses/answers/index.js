import React from "react";

import get from "lodash.get";

import Container from "@mui/material/Container";

import Layout from "../../../../../components/Layout";
import SurveyHeader from "../../../../../components/survey/SurveyHeader";
import UserSurveyQuesAnsSection from "../../../../../components/survey/UserSurveyQuesAnsSection";
import BreadCrumbHeader from "../../../../../components/survey/BreadCrumbHeader";
import BreadCrumbs from "../../../../../components/survey/BreadCrumbs";

import { useSurvey } from "../../../../../context/SurveyState";
import { useRouter } from "next/router";

export default function answers() {
  const survey = useSurvey();
  const router = useRouter();
  const { id } = router.query;

  const data = get(survey, "reportData", []).find((x) => x.unique_id === id); // No error!
  return (
    <Layout>
      <SurveyHeader
        headerTitle={survey.surveyTitle}
        backRoute="/survey/report/responses"
        currentTab="REPORT"
      >
        <Container maxWidth="lg">
          <BreadCrumbHeader>
            <BreadCrumbs
              breadCrumbsList={[
                {
                  title: "All Response",
                  active: false,
                  route: "/survey/report/responses",
                },
                {
                  title: id,
                  active: true,
                  route: `/survey/report/responses/answers?id=${id}`,
                },
              ]}
            />
          </BreadCrumbHeader>
          <UserSurveyQuesAnsSection reportData={data} />
        </Container>
      </SurveyHeader>
    </Layout>
  );
}
