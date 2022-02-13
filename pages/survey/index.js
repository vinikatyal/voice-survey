import * as React from "react";
import Head from "next/head";

import ThemeContext from "../../context/ThemeContext";
import { ThemeValues } from "../../context/ThemeContext";

import SurveyFinalLayout from "../../components/SurveyFinalLayout";
import DateField from "../../components/questions/DateField";
import EmailTextField from "../../components/questions/EmailTextField";
import SingleLineTextField from "../../components/questions/SingleLineTextfield";

export default function Index() {
  const { theme } = React.useContext(ThemeContext);
  const bg =
    theme === ThemeValues.BLUE
      ? "body {background: linear-gradient(to right, #1EA798, #2D4C93)!important;}"
      : theme === ThemeValues.RED
      ? "body {background: linear-gradient(to right, #EC2E89, #9540E4)!important;}"
      : theme === ThemeValues.YELLOW
      ? "body {background: linear-gradient(to right, #350F69, #BA824C)!important;}"
      : "";
  return (
    <>
      <Head>
        <style>{bg}</style>
      </Head>
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
    </>
  );
}
