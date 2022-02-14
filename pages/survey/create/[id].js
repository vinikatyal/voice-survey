import React, { useEffect } from "react";

import Layout from "../../../components/Layout.js";
import SurveyHeader from "../../../components/survey/SurveyHeader";
import SurveyCreateTabSection from "../../../components/survey/SurveyCreateTabSection";
import SurveyQuestionSection from "../../../components/survey/SurveyQuestionSection";
import SurveyThemeSection from "../../../components/survey/SurveyThemeSection";

import { useRouter } from "next/router";

// State Manager
import {
  useDispatchSurvey,
  useSurvey,
} from "../../../components/survey/SurveyState";

import { surveyService } from "../../../services/survey.service";

export async function getStaticPaths() {
  const paths = [{ params: { id: "questions" } }, { params: { id: "themes" } }];
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const props = {};
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

  useEffect(async () => {
    const res = await surveyService.get_survey_template_data({
      survey_type: "teacher_feedback",
    });
    dispatch({ type: "QUESTIONS", value: res.data.questions });
  }, []);

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
