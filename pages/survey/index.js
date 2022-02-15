import * as React from "react";

import ThemeContext from "../../context/ThemeContext";
import { ThemeValues } from "../../context/ThemeContext";

import SurveyFinalLayout from "../../components/SurveyFinalLayout";
import DateField from "../../components/questions/DateField";
import EmailTextField from "../../components/questions/EmailTextField";
import SingleLineTextField from "../../components/questions/SingleLineTextfield";

import styled from "@emotion/styled";

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
  const { theme } = React.useContext(ThemeContext);
  const bg =
    theme === ThemeValues.BLUE
      ? "linear-gradient(to right, #1EA798, #2D4C93)!important;"
      : theme === ThemeValues.PINK
      ? "inear-gradient(to right, #EC2E89, #9540E4)!important;"
      : theme === ThemeValues.YELLOW
      ? "linear-gradient(to right, #350F69, #BA824C)!important;"
      : "#fff";
  return (
    <>
      <FullBackgroundSurvey bgColor={bg}>
        <SurveyFinalLayout variant={theme}>
          <SingleLineTextField
            _id="dateField"
            placeholder={"Enter Name"}
            title={"What is your Name"}
          ></SingleLineTextField>
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
