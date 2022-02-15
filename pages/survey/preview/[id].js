import React, { useEffect, useState } from "react";

import { useRouter } from "next/router";

import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import SpeedDial from "@mui/material/SpeedDial";
import Typography from "@mui/material/Typography";

import CloseIcon from "@mui/icons-material/Close";

import { useSurvey } from "../../../context/SurveyState";

import styled from "@emotion/styled";

import StyledButton from "../../../components/StyledButton";

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

  const handleNext = () => {
    router.push(`/survey/preview/${+id + 1}`);
  };
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
        <Grid
          container
          height="100%"
          direction="column"
          justifyContent="space-around"
          alignItems="center"
        >
          <Grid item>
            <Typography color="#00063e" fontSize="28px" fontWeight="500">
              {question.question || ""}
            </Typography>
          </Grid>
          <Grid item>
            <Button
              sx={{ width: "140px", marginRight: "30px" }}
              variant="outlined"
            >
              Back
            </Button>
            <StyledButton
              disabled={+id === survey.questions.length}
              onClick={handleNext}
            >
              Next
            </StyledButton>
          </Grid>
        </Grid>
      </StyledContainer>
    </FullBackgroundSurvey>
  );
}
