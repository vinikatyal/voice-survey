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
// import VoiceInput from "../../components/questions/VoiceInput";

import Image from "next/image";

const FullBackgroundSurvey = styled("div")(({ bgColor }) => ({
  overflow: "auto",
  minHeight: "100vh",
  background: bgColor,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  textAlign: "center",
  padding: "50px",
}));

const StyledDiv = styled("div")({
  width: "100%",
  minHeight: "519px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  padding: "20px 10px",
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
  const [uniqueId, setUniqueId] = useState("");
  const [questionId, setQuestionId] = useState("");
  const [open, setOpen] = useState(false);

  const VoiceInput = dynamic(
    () => import("../../components/questions/VoiceInput"),
    { ssr: false }
  );

  useEffect(() => {
    if (params) {
      if (params.length === 1) {
        setQuestionId("");
        getSurveyDetails(params[0]);
        setSurveyId(params[0]);
      }
      if (params.length === 2) {
        setSurveyId(params[0]);
        setQuestionId(params[1]);
        const question = survey.questions.find((obj) => obj.qid == +params[1]);
        if (!question) router.push(`/survey/${params[0]}`);
        setQuestion(question);
      }
    }
  }, [params]);

  const getSurveyDetails = async (survey_id) => {
    try {
      const surveyDetails = await surveyService.get_survey_details_link(
        survey_id
      );

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
      setUniqueId(get(surveyDetails, "id"));
    } catch (error) {
      toast.error(error.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  const handleResponse = async (response) => {
    try {
      const payload = {
        qid: question.qid,
      };

      question.question_type === "audio"
        ? ((payload["qtype"] = "audio"),
          (payload["answer_audio_file"] = response))
        : ((payload["qtype"] = question.question_type),
          (payload["user_answer"] = response));

      const res = await surveyService.update_user_answer(uniqueId, payload);
    } catch (error) {
      toast.error(error.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
      return false;
    }
    const next = produce(survey.questions, (draft) => {
      const question = draft.find((question) => question.qid === +questionId);
      question["answer"] = response;
    });
    dispatch({ type: "SET_QUESTIONS", value: next });
    return true;
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
    <FullBackgroundSurvey
      bgColor={get(survey, "selectedSurveyTheme.color", "BLUE")}
    >
      <Grid container>
        <Grid item xs={12} mb={12}>
          <Image src={"/images/logo.png"} width={169} height={70} />
        </Grid>
      </Grid>
      {surveyId && !questionId && (
        <Container
          maxWidth="lg"
          sx={{ backgroundColor: "white", borderRadius: "8px" }}
        >
          <StyledDiv>
            <Grid container mt={5} spacing={8}>
              <Grid item xs={12}>
                <Typography variant="h2">
                  {survey.surveyWelcomeText || "Get start by clicking next!"}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Image src={"/survey/mic.svg"} width={50} height={50} />
              </Grid>
            </Grid>
            <WelcomeText
              value={get(survey, "surveyUserName", "")}
              totalQuestions={survey.questions.length}
              id={"1"}
              primaryButtonTitle="Next"
              nextRoute={`/survey/${surveyId}/${survey.questions[0].qid}`}
              handleResponse={handleNameResponse}
            />
          </StyledDiv>
        </Container>
      )}

      {questionId && (
        <Container
          maxWidth="lg"
          sx={{ backgroundColor: "white", borderRadius: "8px" }}
        >
          <StyledDiv>
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
                secondaryButtonTitle={"Back"}
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
                secondaryButtonTitle={"Back"}
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
                secondaryButtonTitle={"Back"}
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
                secondaryButtonTitle={"Back"}
                primaryButtonTitle="Next"
                nextRoute={`/survey/${surveyId}/${+questionId + 1}`}
                handleEndSurvey={handleEndSurvey}
                handleResponse={handleResponse}
              />
            )}
          </StyledDiv>
        </Container>
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
