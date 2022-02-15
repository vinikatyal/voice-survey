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

// themes images
import theme1 from "../../images/themes/theme1.png";
import theme2 from "../../images/themes/theme2.png";
import theme3 from "../../images/themes/theme3.png";

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
  const themes = [
    {
      id: "BLUE",
      theme: theme1,
      themeName: "Theme Blue",
    },
    {
      id: "PINK",
      theme: theme2,
      themeName: "Theme Pink",
    },
    {
      id: "YELLOW",
      theme: theme3,
      themeName: "Theme Orange",
    },
  ];

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
      survey_theme: survey.surveyTheme,
      welcome_text: survey.surveyWelcomeText,
      survey_questions: survey.questions,
    };

    try {
      const surveyRes = await surveyService.create_survey(surveyPayload);
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
          {themes.map((item, index) => (
            <ThemeItem
              key={item.id}
              id={item.id}
              theme={item.theme}
              themeName={item.themeName}
              selectedValue={survey.surveyTheme}
              handleChange={handleChangeSelectedValue}
            />
          ))}
        </Grid>
      </Grid>
      <ButtonContainer>
        <StyledButton type="submit" onClick={createSurvey} variant="contained">
          Create Survey
        </StyledButton>
      </ButtonContainer>
    </Container>
  );
}
