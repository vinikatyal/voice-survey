import React, { useEffect, useState } from "react";

import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import get from "lodash.get";

import Container from "@mui/material/Container";
import SpeedDial from "@mui/material/SpeedDial";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";

import MultiLineTextField from "../../../components/questions/MultiLineTextField";
import SingleLineTextField from "../../../components/questions/SingleLineTextField";
import EmailTextField from "../../../components/questions/EmailTextField";
import DateField from "../../../components/questions/DateField";

import { useSurvey } from "../../../context/SurveyState";

import CloseIcon from "@mui/icons-material/Close";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

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

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function questions() {
  const router = useRouter();
  const { id } = router.query;
  const survey = useSurvey();

  const [question, setQuestion] = useState("");
  const [open, setOpen] = useState(false);

  const VoiceInput = dynamic(
    () => import("../../../components/questions/VoiceInput"),
    { ssr: false }
  );

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

  const handleEndSurvey = async () => {
    setOpen(true);
  };

  const handleResponse = () => {};

  const handleSubmitAnother = async () => {
    setOpen(false);
    router.push(`/survey/preview/1`);
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
            handleResponse={handleResponse}
            handleEndSurvey={handleEndSurvey}
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
            handleResponse={handleResponse}
            handleEndSurvey={handleEndSurvey}
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
            handleResponse={handleResponse}
            handleEndSurvey={handleEndSurvey}
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
            handleResponse={handleResponse}
            handleEndSurvey={handleEndSurvey}
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
            handleEndSurvey={handleEndSurvey}
          />
        )}
      </StyledContainer>
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
