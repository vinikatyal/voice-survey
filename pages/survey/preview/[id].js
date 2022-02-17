import React, { useEffect, useState } from "react";

import { useRouter } from "next/router";
import get from "lodash.get";

import Container from "@mui/material/Container";
import SpeedDial from "@mui/material/SpeedDial";

import MultiLineTextField from "../../../components/questions/MultiLineTextField";
import SingleLineTextField from "../../../components/questions/SingleLineTextField";
import EmailTextField from "../../../components/questions/EmailTextField";
import DateField from "../../../components/questions/DateField";
import VoiceInput from "../../../components/questions/VoiceInput";

import { useSurvey } from "../../../context/SurveyState";

import CloseIcon from "@mui/icons-material/Close";

import styled from "@emotion/styled";

// preview

const FullBackgroundSurvey = styled("div")(({ bgColor }) => ({
  background: bgColor,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  height: "100vh",
  textAlign: "center",
  padding: "50px",
}));

const StyledContainer = styled(Container)({
  backgroundColor: "white",
  minHeight: "519px",
  borderRadius: "8px",
});

export default function questions() {
  const router = useRouter();
  const { id } = router.query;
  const survey = useSurvey();

  const [question, setQuestion] = useState("");
  useEffect(() => {
    if (id) {
      const question = survey.questions.find((obj) => obj.qid == +id);
      setQuestion(question);
    } else {
      router.push("/survey/create");
    }
  }, [id]);

  const handleClose = () => {
    router.push(`/survey/create/questions`);
  };

  return (
    <FullBackgroundSurvey bgColor={survey.selectedSurveyTheme.color}>
      <SpeedDial
        ariaLabel="SpeedDial openIcon example"
        onClick={handleClose}
        sx={{
          position: "absolute",
          top: 16,
          right: 16,
        }}
        icon={<CloseIcon />}
      ></SpeedDial>
      <StyledContainer maxWidth="lg">
        {get(question, "question_type", "") === "text" && (
          <SingleLineTextField
            title={get(question, "question", "")}
            required={get(question, "required", false)}
            totalQuestions={survey.questions.length}
            id={id}
            secondaryButtonTitle={+id !== 1 && "Back"}
            primaryButtonTitle="Next"
            nextRoute={`/survey/preview/${+id + 1}`}
          />
        )}
        {get(question, "question_type", "") === "description" && (
          <MultiLineTextField
            title={get(question, "question", "")}
            required={get(question, "required", false)}
            totalQuestions={survey.questions.length}
            id={id}
            secondaryButtonTitle={+id !== 1 && "Back"}
            primaryButtonTitle="Next"
            nextRoute={`/survey/preview/${+id + 1}`}
          />
        )}
        {get(question, "question_type", "") === "email" && (
          <EmailTextField
            title={get(question, "question", "")}
            required={get(question, "required", false)}
            totalQuestions={survey.questions.length}
            id={id}
            secondaryButtonTitle={+id !== 1 && "Back"}
            primaryButtonTitle="Next"
            nextRoute={`/survey/preview/${+id + 1}`}
          />
        )}
        {get(question, "question_type", "") === "date_picker" && (
          <DateField
            title={get(question, "question", "")}
            required={get(question, "required", false)}
            totalQuestions={survey.questions.length}
            id={id}
            secondaryButtonTitle={+id !== 1 && "Back"}
            primaryButtonTitle="Next"
            nextRoute={`/survey/preview/${+id + 1}`}
          />
        )}
        {get(question, "question_type", "") === "audio" && (
          <VoiceInput
            title={get(question, "question", "")}
            required={get(question, "required", false)}
            totalQuestions={survey.questions.length}
            id={id}
            secondaryButtonTitle={+id !== 1 && "Back"}
            primaryButtonTitle="Next"
            nextRoute={`/survey/preview/${+id + 1}`}
          />
        )}
      </StyledContainer>
    </FullBackgroundSurvey>
  );
}
