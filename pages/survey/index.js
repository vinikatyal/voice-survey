import * as React from "react";

import Layout from "../../components/Layout";
import SurveyHeader from "../../components/survey/SurveyHeader";
import SurveyCreateTabSection from "../../components/survey/SurveyCreateTabSection";
import SurveyQuestionSection from "../../components/survey/SurveyQuestionSection";
import SurveyThemeSection from "../../components/survey/SurveyThemeSection";

export default function Index() {
  const [currentTab, setCurrentTab] = React.useState("QUESTIONS");

  const handleChangeTab = (currentTab) => {
    setCurrentTab(currentTab);
  };

  return (
    <Layout>
      <SurveyHeader currentTab="CREATE">
        <SurveyCreateTabSection
          currentTab={currentTab}
          handleChangeTab={handleChangeTab}
        >
          {currentTab === "QUESTIONS" ? (
            <SurveyQuestionSection />
          ) : (
            <SurveyThemeSection />
          )}
        </SurveyCreateTabSection>
      </SurveyHeader>
    </Layout>
  );
}
