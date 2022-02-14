import React, { useEffect } from "react";

import Layout from "../../../components/Layout.js";
import SurveyHeader from "../../../components/survey/SurveyHeader";
import SurveyCreateTabSection from "../../../components/survey/SurveyCreateTabSection";
import SurveyQuestionSection from "../../../components/survey/SurveyQuestionSection";
import SurveyThemeSection from "../../../components/survey/SurveyThemeSection";

import { useRouter } from "next/router";

// State Manager
import { useDispatchSurvey, useSurvey } from "../../../context/SurveyState.js";

export async function getStaticPaths() {
  const paths = [{ params: { id: "questions" } }, { params: { id: "themes" } }];
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const props = {};
  if (params.id === "questions") {
    const questions = await fetch(
      "https://api.jsonbin.io/b/6207aa1f1b38ee4b33b8c9d3/1",
      {
        headers: {
          "Content-Type": "application/json",
          "secret-key":
            "$2b$10$WqnXsDDorMo41yYnbkChQ.PwewUpe1CvZ0s.bfJeSWfWCgKenMgwW",
        },
      }
    );
    props["questionTypes"] = await questions.json();
  }
  params.id === "questions" && (props["currentTab"] = "questions");
  params.id === "themes" && (props["currentTab"] = "themes");
  return {
    props,
  };
}

export default function create({ currentTab, questionTypes }) {
  const router = useRouter();
  const survey = useSurvey();
  const dispatch = useDispatchSurvey();

  useEffect(() => {
    !survey.surveyTitle && router.push("/survey/create");
  }, [survey.surveyTitle]);

  useEffect(() => {
    if (survey.previousQuestionType !== survey.surveyType) {
      if (questionTypes) {
        const modifiedArr =
          questionTypes[survey.surveyType] &&
          questionTypes[survey.surveyType].map((obj, index) => {
            return index === 0
              ? { ...obj, expandStatus: true, required: false }
              : { ...obj, expandStatus: false, required: false };
          });
        modifiedArr && dispatch({ type: "SET_QUESTIONS", value: modifiedArr });
        dispatch({ type: "SET_PREV_QUESTIONTYPE", value: survey.surveyType });
      }
    }
  }, [survey.surveyType]);

  const handleChangeTab = (currentTab) => {
    router.push(`/survey/create/${currentTab}`);
  };
  return (
    <Layout>
      <SurveyHeader headerTitle={survey.surveyTitle} currentTab="CREATE">
        <SurveyCreateTabSection
          currentTab={currentTab}
          handleChangeTab={handleChangeTab}
        >
          {currentTab === "questions" ? (
            <SurveyQuestionSection questions={survey.questions} />
          ) : (
            <SurveyThemeSection />
          )}
        </SurveyCreateTabSection>
      </SurveyHeader>
    </Layout>
  );
}
