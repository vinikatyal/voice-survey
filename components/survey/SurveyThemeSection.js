import React from "react";

import { useRouter } from "next/router";

// UI
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import styled from "@emotion/styled";
import ThemeItem from "../ThemeItem";
import Box from "@mui/material/Box";

import { toast } from "react-toastify";

// button
import StyledButton from "../StyledButton";

import { surveyService } from "../../services/survey.service";

// State Manager
import { useSurvey, useDispatchSurvey } from "../../context/SurveyState";
import Image from "next/image";
import { get } from "react-hook-form";

const Label = styled("span")({
  color: "#707070",
  fontSize: "16px",
  fontWeight: "500",
});

const ButtonContainer = styled("div")({
  display: "flex",
  justifyContent: "flex-end",
  alignItems: "center",
  marginTop: "30px",
});

const LogoContainer = styled(Box)({
  width: "140px",
  height: "140px",
  border: "dotted 2px #0a23fb",
  borderRadius: "8px",
  padding: "5px",
  marginTop: "10px",
});

export default function SurveyThemeSection({ logo }) {
  const router = useRouter();
  const survey = useSurvey();
  const dispatch = useDispatchSurvey();

  const handleChangeSelectedValue = (themeName) => {
    dispatch({ type: "SET_THEME", value: themeName });
  };

  const createSurvey = async () => {
    const members = survey.accessMembers
      .map((item) => {
        return item.value;
      })
      .join(",");

    const surveyPayload = {
      survey_title: survey.surveyTitle,
      access_list_emails: members || "",
      survey_type: survey.surveyType,
      survey_theme: survey.selectedSurveyTheme.name,
      welcome_text: survey.surveyWelcomeText,
      survey_questions: survey.questions,
    };

    try {
      await surveyService.create_survey(surveyPayload);
      toast.success("Survey created successfully", {
        position: toast.POSITION.TOP_RIGHT,
      });
      router.push("/dashboard");
    } catch (error) {
      toast.error(error.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  const editSurvey = () => {
    alert("Edited");
    router.push("/dashboard");
  };

  return (
    <Container maxWidth="lg">
      {logo && (
        <Grid mt={2} container direction="column">
          <Label>Select any png,svg or jpg file</Label>
          <LogoContainer>
            <Image height={140} width={140} src={logo} unoptimized={false} />
          </LogoContainer>
        </Grid>
      )}
      <Grid mt={2} container direction="column">
        <Label>Choose Theme</Label>
        <Grid container direction="row" justifyContent="space-between">
          {survey.themes.map((item, index) => (
            <ThemeItem
              key={item.id}
              theme={item}
              selectedValue={survey.selectedSurveyTheme}
              handleChange={handleChangeSelectedValue}
            />
          ))}
        </Grid>
      </Grid>
      <ButtonContainer>
        <StyledButton
          type="submit"
          onClick={survey.surveyEditId ? editSurvey : createSurvey}
          variant="contained"
        >
          {survey.surveyEditId ? "Edit Survey" : "Create Survey"}
        </StyledButton>
      </ButtonContainer>
    </Container>
  );
}
