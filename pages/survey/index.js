import * as React from "react";

import SurveyFinalLayout from "../../components/SurveyFinalLayout";
import DateField from "../../components/questions/DateField";

import styled from "@emotion/styled";

import { useSurvey } from "../../context/SurveyState";

const FullBackgroundSurvey = styled("div")(({ bgColor }) => ({
  background: bgColor,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  height: "100vh",
  textAlign: "center",
}));

export default function Index() {
  const survey = useSurvey();
  return (
    <>
      <FullBackgroundSurvey bgColor={survey.selectedSurveyTheme.color}>
        <SurveyFinalLayout>
          <DateField
            _id="dateField"
            placeholder={"Enter Date"}
            title={"What is your date of birth"}
          ></DateField>
        </SurveyFinalLayout>
      </FullBackgroundSurvey>
    </>
  );
}
