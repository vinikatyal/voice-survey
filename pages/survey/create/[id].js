import React, { useEffect, useState } from "react";

import { useSession } from "next-auth/react";

// common components
import Layout from "../../../components/Layout";
import SurveyHeader from "../../../components/survey/SurveyHeader";
import SurveyCreateTabSection from "../../../components/survey/SurveyCreateTabSection";
import SurveyQuestionSection from "../../../components/survey/SurveyQuestionSection";
import SurveyThemeSection from "../../../components/survey/SurveyThemeSection";

import { useRouter } from "next/router";
import get from "lodash.get";

import { surveyService } from "../../../services/survey.service";

// State Manager
import { useDispatchSurvey, useSurvey } from "../../../context/SurveyState";
import { authService } from "../../../services/auth.service";

export default function create() {
  const [logo, setLogo] = useState("");
  const { data: session, status } = useSession();

  const router = useRouter();
  const survey = useSurvey();
  const dispatch = useDispatchSurvey();

  const { id } = router.query;

  useEffect(async () => {
    if (status === "loading") return;
    else if (status === "unauthenticated") {
      router.push("/login");
      return;
    }
    if (!survey.surveyType) {
      router.push("/survey/create");
      return;
    }

    const profile = await authService.get_user_profile();
    profile.data.logo && setLogo(profile.data.logo);

    if (survey.previousSurveyType !== survey.surveyType) {
      const res = await surveyService.get_survey_template_data({
        survey_type: survey.surveyType,
      });

      const modifiedArr = survey.surveyEditId
        ? survey.questions
        : get(res.data, "questions", []).map((obj, index) => {
            return index === 0
              ? { ...obj, expandStatus: true, required: false }
              : { ...obj, expandStatus: false, required: false };
          });
      if (modifiedArr.length === 0) {
        modifiedArr.push({
          qid: 1,
          question: "",
          question_type: "text",
          required: false,
          expandStatus: true,
        });
      }
      dispatch({ type: "SET_QUESTIONS", value: modifiedArr });
      dispatch({ type: "SET_PREV_SURVEYTYPE", value: survey.surveyType });
    }
  }, [status, survey.surveyType]);

  const handleChangeTab = (currentTab) => {
    router.push(`/survey/create/${currentTab}`);
  };
  return (
    <Layout>
      <SurveyHeader
        headerTitle={survey.surveyTitle}
        backRoute="/survey/create"
        currentTab="CREATE"
      >
        <SurveyCreateTabSection
          currentTab={id}
          handleChangeTab={handleChangeTab}
        >
          {id === "questions" ? (
            <SurveyQuestionSection questions={survey.questions} />
          ) : (
            <SurveyThemeSection logo={logo} />
          )}
        </SurveyCreateTabSection>
      </SurveyHeader>
    </Layout>
  );
}
