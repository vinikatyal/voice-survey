import React from "react";
import { useRouter } from "next/router";

import get from "lodash.get";
import getConfig from "next/config";

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

const { publicRuntimeConfig } = getConfig();

const SHARE_URL = publicRuntimeConfig.server.SHARE_URL;

export default function SurveyThemeSection({ logo }) {
  const router = useRouter();
  const survey = useSurvey();
  const dispatch = useDispatchSurvey();

  const handleChangeSelectedValue = (themeName) => {
    dispatch({ type: "SET_THEME", value: themeName });
  };

  const renameFile = (file, id) => {
    return new File([file], `survey_logo_${id}.${file.type.split("/")[1]}`, {
      type: file.type,
      lastModified: file.lastModified,
    });
  };

  const uploadImagesFiles = async (imageFileArr, surveyId) => {
    const formData = new FormData();
    let count = 0;
    imageFileArr.map(async (file, index) => {
      if (count < 4 && index !== imageFileArr.length - 1) {
        count++;
        formData.append("file", file);
      } else {
        count = 0;
        console.log(formData.getAll("file"));
        const mediaType = "image"
        await surveyService.update_survey_media(
          surveyId,
          formData,
          (mediaType = "image")
        );
        clearFormData();
      }
    });
    const clearFormData = () => {
      const entries = formData.entries();
      for (var pair of entries) {
        formData.delete(pair[0]);
      }
    };
    clearFormData();
  };

  const createSurvey = async () => {
    const members = survey.accessMembers
      .map((item) => {
        return item.value;
      })
      .join(",");

    const imageArray = [];
    const questions = survey.questions.map((obj, index) => {
      obj.image && imageArray.push(renameFile(obj.image, index + 1));
      const question = {
        ...obj,
        qid: index + 1,
        answer: "",
        status: "",
      };
      question.image && delete question.image;
      !question.video_url && delete question.video_url;
      return question;
    });

    const surveyPayload = {
      survey_title: survey.surveyTitle,
      access_list_emails: members || "",
      survey_type: survey.surveyType,
      survey_theme: survey.selectedSurveyTheme.name,
      welcome_text: survey.surveyWelcomeText,
      survey_questions: questions,
    };

    try {
      const surveyData = await surveyService.create_survey(surveyPayload);

      const surveyId = surveyData.code.survey_id;
      console.log(imageArray)
      await uploadImagesFiles(imageArray, surveyId);
      const link = await surveyService.generateLink(
        surveyId,
        survey.surveyType,
        `${SHARE_URL}/survey/${surveyId}`
      );

      const bitlyLink = get(
        link,
        "data.survey_share_link",
        `${SHARE_URL}/survey/${surveyId}`
      );

      if (bitlyLink) {
        dispatch({
          type: "SET_SURVEY_SHARE_LINK",
          value: bitlyLink,
        });
        toast.success("Survey created successfully", {
          position: toast.POSITION.TOP_RIGHT,
        });
        router.push("/survey/share");
      } else {
        toast.error("Error while creating link", {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    } catch (error) {
      toast.error(error.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  const editSurvey = async () => {
    const members = survey.accessMembers
      .map((item) => {
        return item.value;
      })
      .join(",");

    const questions = survey.questions.map((obj, index) => ({
      ...obj,
      qid: index + 1,
    }));

    const surveyPayload = {
      survey_title: survey.surveyTitle,
      access_list_emails: members || "",
      survey_theme: survey.selectedSurveyTheme.name,
      welcome_text: survey.surveyWelcomeText,
      survey_questions: questions,
    };

    try {
      await surveyService.edit_survey(survey.surveyEditId, surveyPayload);
      toast.success("Survey edited successfully", {
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
          <Label>Survey Logo</Label>
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
