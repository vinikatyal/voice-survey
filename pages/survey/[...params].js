import React, { useEffect, useState } from "react";


import { toast } from "react-toastify";
import get from "lodash.get";

import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import produce from "immer";

import { useDispatchSurvey, useSurvey } from "../../context/SurveyState";
import { surveyService } from "../../services/survey.service";
import styled from "@emotion/styled";

import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";

import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

import SingleLineTextField from "../../components/questions/SingleLineTextField";
import MultiLineTextField from "../../components/questions/MultiLineTextField";
import EmailTextField from "../../components/questions/EmailTextField";
import DateField from "../../components/questions/DateField";
import WelcomeText from "../../components/questions/WelcomeText";

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

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function survey() {
  const dispatch = useDispatchSurvey();
  const survey = useSurvey();
  const router = useRouter();
  const { params } = router.query;
  const [question, setQuestion] = useState("");
  const [surveyId, setSurveyId] = useState("");
  const [questionId, setQuestionId] = useState("");
  const [open, setOpen] = useState(false);

  const VoiceInput = dynamic(() =>
    import("../../components/questions/VoiceInput")
  );

  useEffect(() => {
    if (params) {
      if (params.length === 1) {
        getSurveyDetails(params[0]);
        setSurveyId(params[0]);
      }
      if (params.length === 2) {
        setSurveyId(params[0]);
        setQuestionId(params[1]);
        const question = survey.questions.find(
          (obj) => obj.question_number == +params[1]
        );
        if (!question) router.push(`/survey/${params[0]}`);
        setQuestion(question);
      }
    }
  }, [params]);

  const getSurveyDetails = async (survey_id) => {
    try {
      const surveyDetails = await surveyService.get_survey_details(survey_id);

      dispatch({
        type: "SET_QUESTIONS",
        value: surveyDetails.data.survey_questions,
      });
      const selectedSurveyTheme = survey.themes.find(
        (obj) => obj.name === surveyDetails.data.survey_theme
      );
      dispatch({
        type: "SET_THEME",
        value: selectedSurveyTheme,
      });

      dispatch({
        type: "SET_WELCOME_TEXT",
        value: get(surveyDetails.data, "welcome_text", ""),
      });
    } catch (error) {
      toast.error(error.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  const handleResponse = async (response) => {
    const next = produce(survey.questions, (draft) => {
      const question = draft.find(
        (question) => question.question_number === +questionId
      );
      question["answer"] = response;
    });
    dispatch({ type: "SET_QUESTIONS", value: next });
  };
  const handleNameResponse = async (response) => {
    dispatch({ type: "SET_SURVEY_USER_NAME", value: response });
  };

  const handleEndSurvey = async () => {
    setOpen(true);
  };
  const handleSubmitAnother = async () => {
    setOpen(false);
    dispatch({ type: "SET_SURVEY_USER_NAME", value: "" });
    router.push(`/survey/${surveyId}`);
  };

  return (
    <FullBackgroundSurvey bgColor={survey.selectedSurveyTheme.color}>
      {surveyId && !questionId && (
        <StyledContainer maxWidth="lg">
          <Grid container mt={5}>
            <Grid item md={12}>
              <Typography fontSize={28} color="#00063e" fontWeight={700}>
                {survey.surveyWelcomeText || "Get start by clicking next!"}
              </Typography>
            </Grid>
          </Grid>
          <WelcomeText
            value={get(survey, "surveyUserName", "")}
            totalQuestions={survey.questions.length}
            id={"1"}
            primaryButtonTitle="Next"
            nextRoute={`/survey/${surveyId}/${survey.questions[0].question_number}`}
            handleResponse={handleNameResponse}
          />
        </StyledContainer>
      )}

      {questionId && (
        <StyledContainer maxWidth="lg">
          {get(question, "question_type", "") === "text" && (
            <SingleLineTextField
              title={get(question, "question", "")}
              value={get(question, "answer", "")}
              required={get(question, "required", false)}
              totalQuestions={survey.questions.length}
              id={questionId}
              secondaryButtonTitle={"Back"}
              primaryButtonTitle="Next"
              nextRoute={`/survey/${surveyId}/${+questionId + 1}`}
              handleEndSurvey={handleEndSurvey}
              handleResponse={handleResponse}
            />
          )}
          {get(question, "question_type", "") === "description" && (
            <MultiLineTextField
              title={get(question, "question", "")}
              value={get(question, "answer", "")}
              required={get(question, "required", false)}
              totalQuestions={survey.questions.length}
              id={questionId}
              secondaryButtonTitle={+questionId !== 1 && "Back"}
              primaryButtonTitle="Next"
              nextRoute={`/survey/${surveyId}/${+questionId + 1}`}
              handleEndSurvey={handleEndSurvey}
              handleResponse={handleResponse}
            />
          )}
          {get(question, "question_type", "") === "email" && (
            <EmailTextField
              title={get(question, "question", "")}
              value={get(question, "answer", "")}
              required={get(question, "required", false)}
              totalQuestions={survey.questions.length}
              id={questionId}
              secondaryButtonTitle={+questionId !== 1 && "Back"}
              primaryButtonTitle="Next"
              nextRoute={`/survey/${surveyId}/${+questionId + 1}`}
              handleEndSurvey={handleEndSurvey}
              handleResponse={handleResponse}
            />
          )}
          {get(question, "question_type", "") === "date_picker" && (
            <DateField
              title={get(question, "question", "")}
              value={get(question, "answer", "")}
              required={get(question, "required", false)}
              totalQuestions={survey.questions.length}
              id={questionId}
              secondaryButtonTitle={+questionId !== 1 && "Back"}
              primaryButtonTitle="Next"
              nextRoute={`/survey/${surveyId}/${+questionId + 1}`}
              handleEndSurvey={handleEndSurvey}
              handleResponse={handleResponse}
            />
          )}
          {get(question, "question_type", "") === "audio" && (
            <VoiceInput
              title={get(question, "question", "")}
              value={get(question, "answer", "")}
              required={get(question, "required", false)}
              totalQuestions={survey.questions.length}
              id={questionId}
              secondaryButtonTitle={+questionId !== 1 && "Back"}
              primaryButtonTitle="Next"
              nextRoute={`/survey/${surveyId}/${+questionId + 1}`}
              handleEndSurvey={handleEndSurvey}
              handleResponse={handleResponse}
            />
          )}
        </StyledContainer>
      )}
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>
          <Grid container alignItems={"center"}>
            <CheckCircleOutlineIcon sx={{ color: "green", fontSize: "50px" }} />
            <Typography fontSize={36} ml={2}>
              Thank You!
            </Typography>
          </Grid>
        </DialogTitle>
        <DialogContent>
          <Grid>
            <Typography>Your response was submitted successfully</Typography>
            <Button
              sx={{ marginTop: "20px" }}
              onClick={handleSubmitAnother}
              variant="contained"
            >
              Submit another response
            </Button>
          </Grid>
          <DialogContentText id="alert-dialog-slide-description"></DialogContentText>
        </DialogContent>
      </Dialog>
    </FullBackgroundSurvey>
  );
}
