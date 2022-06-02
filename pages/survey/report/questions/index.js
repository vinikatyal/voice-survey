import React, { useEffect, useState } from "react";

import { toast } from "react-toastify";
import get from "lodash.get";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

import Layout from "@/components/Layout";
import SurveyHeader from "@/components/survey/SurveyHeader";
import BreadCrumbHeader from "@/components/survey/BreadCrumbHeader";
import BreadCrumbs from "@/components/survey/BreadCrumbs";

import SurveyQuestionsSection from "@/components/survey/report/SurveyQuestionsSection";

import { useDispatchSurvey, useSurvey } from "@/context/SurveyState";

import { surveyService } from "@/services/survey.service";

import styled from "@emotion/styled";

const CrumbButton = styled(Button)({
  marginRight: "8px",
});

const Label = styled("span")({
  color: "#707070",
  fontSize: "16px",
  fontWeight: "500",
});

const PreparingResults = styled("div")({
  fontSize: "16px",
  fontWeight: 500,
  width: "100%",
  minHeight: "100px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

export default function index() {
  const [loading, setLoading] = useState(true);
  const survey = useSurvey();
  const router = useRouter();
  const { data: session, status } = useSession();
  const [reportData, setReportData] = useState([]);
  const dispatch = useDispatchSurvey();
  useEffect(() => {
    if (!survey.surveyEditId) router.push("/dashboard");
    if (status === "loading") return;
    else if (status === "unauthenticated") {
      router.push("/login");
      return;
    }
    // redirect to home if already logged in
    let isSubscribed = true;
    // declare the async data fetching function

    if (get(survey, "surveyEditId")) {
      const fetchSurveyReportData = async () => {
        // get the data from the api
        const res = await surveyService.getQuestionLevelAnalytics(
          survey.surveyEditId,
          {
            start_date: survey.startDate,
            end_date: survey.endDate,
          }
        );

        const data = res.data;

        setLoading(false);

        if (isSubscribed) {
          dispatch({ type: "SET_QUESTION_REPORT_DATA", value: data });
          setReportData(data);
        }
      };

      // call the function
      fetchSurveyReportData()
        // make sure to catch any error
        .catch((error) => {
          toast.error(error, {
            position: toast.POSITION.TOP_RIGHT,
          });

          setLoading(false);
        });
    }

    return () => (isSubscribed = false);
  }, [status, survey.surveyEditId]);

  return (
    <Layout>
      <SurveyHeader
        headerTitle={survey.surveyTitle}
        backRoute="/survey/report"
        currentTab="REPORT"
      >
        <Container maxWidth="lg">
          <BreadCrumbHeader
            component={
              <>
                <CrumbButton
                  variant="contained"
                  size="small"
                  onClick={() => router.push("/survey/report/responses")}
                >
                  View All Response
                </CrumbButton>
              </>
            }
          >
            <BreadCrumbs breadCrumbsList={[]} />
          </BreadCrumbHeader>
          <Container maxWidth="lg" sx={{ marginTop: "30px" }}>
            <Label>Questions</Label>
            {loading ? (
              <PreparingResults>Preparing your results please wait...</PreparingResults>
            ) : (
              get(reportData, "survey_questions", []).length &&
              get(reportData, "survey_questions", []).map((q, index) => (
                <SurveyQuestionsSection
                  index={index}
                  question={q}
                  reportData={reportData}
                  dropOff={get(
                    survey,
                    "reportStats.question_wise_percent_dropoff",
                    {}
                  )}
                />
              ))
            )}
          </Container>
        </Container>
      </SurveyHeader>
    </Layout>
  );
}
