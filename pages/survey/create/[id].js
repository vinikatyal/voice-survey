import React from "react";

import Layout from "../../../components/Layout.js";
import SurveyHeader from "../../../components/survey/SurveyHeader";
import SurveyCreateTabSection from "../../../components/survey/SurveyCreateTabSection";
import SurveyQuestionSection from "../../../components/survey/SurveyQuestionSection";
import SurveyThemeSection from "../../../components/survey/SurveyThemeSection";

import { useRouter } from "next/router";

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

export default function create({ currentTab }) {
  const router = useRouter();
  const handleChangeTab = (currentTab) => {
    router.push(`/survey/create/${currentTab}`);
  };
  return (
    <Layout>
      <SurveyHeader currentTab="CREATE">
        <SurveyCreateTabSection
          currentTab={currentTab}
          handleChangeTab={handleChangeTab}
        >
          {currentTab === "questions" ? (
            <SurveyQuestionSection />
          ) : (
            <SurveyThemeSection />
          )}
        </SurveyCreateTabSection>
      </SurveyHeader>
    </Layout>
  );
}
