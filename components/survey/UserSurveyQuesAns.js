import React from "react";

// UI
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";

import { SentimentCh } from "../../pages/survey/report";

import styled from "@emotion/styled";

// styled components

const QuestionAccordion = styled(Accordion)(() => ({
  boxShadow: "0 2px 6px 0 rgba(113, 125, 129, 0.16)",
  border: "solid 1px #dcdcdc",
  backgroundColor: "#fff",
  borderRadius: "5px",
}));
const QuestionAccordionSummary = styled("div")(() => ({
  display: "flex",
  width: "100%",
  justifyContent: "space-between",
  alignItems: "center",
}));

const QuestionAccordionBody = styled("div")(() => ({
  width: "100%",
  display: "flex",
}));
const StyledQuestionHead = styled("div")({
  display: "flex",
  justifyContent: "flex-start",
  alignItems: "center",
  width: "70%",
});

const StyledQuestionHeadEndSlot = styled(Grid)({
  display: "flex",
  alignItems: "center",
});

const QuestionTypeDiv = styled("div")({
  fontSize: "14px",
  borderRadius: "20px",
  color: "#0a23fb",
  paddingTop: "5px",
  paddingBottom: "5px",
  paddingLeft: "10px",
  paddingRight: "10px",
  backgroundColor: "#EFF2FF",
});

const StyledAnswerBody = styled("div")({
  width: "100%",
  display: "flex",
  flexDirection: "column",
  padding: "20px",
});

const StyledAnswerTableHead = styled("div")({
  width: "100%",
  display: "flex",
  fontSize: "14px",
  color: "#707070",
});

const StyledAnswerTableBody = styled("div")({
  width: "100%",
  fontSize: "16px",
  display: "flex",
  flexDirection: "column",
  color: "#9a9cb5",
  borderRadius: "4px",
  backgroundColor: "#f8f9fd",
  margin: "6px 0 0",
  padding: "10px 20px 21px",
});

const Answer = styled("div")({
  width: "40%",
});

const Date = styled("div")({
  width: "20%",
});

const Lead = styled("div")({
  width: "20%",
});

const Sentiment = styled("div")({
  width: "20%",
});

const SingleSentiment = styled("div")({
  position: "relative",
  display: "flex",
  alignItems: "center",
});

const SentimentChip = styled(Chip)({
  color: "#fff",
});

const StyledAnswerRow = styled("div")({
  display: "flex",
  width: "100%",
  flexDirection: "row",
});

const StyledAnswerColumn = styled("div")({
  display: "flex",
  width: "100%",
  flexDirection: "column",
});

const StyledAnswerRowBody = styled("div")({
  display: "flex",
  width: "100%",
  margin: "5px 0 0",
  padding: "21px 622px 20px 20px",
  borderRadius: "8px",
  backgroundColor: "#fff",
  color: "#707070",
});

const SentimentDiv = ({ sentimentTitle }) => (
  <React.Fragment>
    <SingleSentiment>
      <Typography fontSize={30} mr={1}>
        {sentimentTitle === "Positive"
          ? "😀"
          : sentimentTitle === "Negative"
          ? "🙁"
          : "🙄"}
      </Typography>
      <SentimentChip
        label={sentimentTitle}
        color={
          sentimentTitle === "Positive"
            ? "success"
            : sentimentTitle === "Negative"
            ? "error"
            : "warning"
        }
      />
    </SingleSentiment>
  </React.Fragment>
);

export default function UserSurveyQuesAns({ question }) {
  return (
    <>
      <QuestionAccordion expanded={true} square>
        <AccordionSummary
          sx={{ borderBottom: "solid 1px #dcdcdc" }}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <QuestionAccordionSummary>
            <StyledQuestionHead>
              <Typography
                variant="subtitle2"
                color="#00063e;"
                fontSize="18px"
                fontWeight="600"
              >
                {question.qname}
              </Typography>
            </StyledQuestionHead>
            <StyledQuestionHeadEndSlot>
              <QuestionTypeDiv>{question.answer.type} response</QuestionTypeDiv>
            </StyledQuestionHeadEndSlot>
          </QuestionAccordionSummary>
        </AccordionSummary>

        <AccordionDetails>
          <QuestionAccordionBody>
            <StyledAnswerBody>
              <StyledAnswerTableHead>
                <Answer>Response</Answer>
                <Date>Created</Date>
                <Lead>Lead</Lead>
                <Sentiment>Sentiment</Sentiment>
              </StyledAnswerTableHead>
              <StyledAnswerTableBody>
                <StyledAnswerRow>
                  <Answer>{question.answer.text}</Answer>
                  <Date>26/09/2022</Date>
                  <Lead>Something</Lead>
                  <Sentiment>
                    <SentimentDiv
                      value={75}
                      sentimentTitle="Positive"
                      sentimentEmoji="😀"
                      progressColor="success"
                    />
                  </Sentiment>
                </StyledAnswerRow>
                {question.answer.type && question.answer.type === "voice" && (
                  <StyledAnswerColumn>
                    <StyledAnswerTableHead>Transcript</StyledAnswerTableHead>
                    <StyledAnswerRowBody>
                      some dbvdbvs nsdbsvdb sbvdbsdv
                    </StyledAnswerRowBody>
                  </StyledAnswerColumn>
                )}
              </StyledAnswerTableBody>
            </StyledAnswerBody>
          </QuestionAccordionBody>
        </AccordionDetails>
      </QuestionAccordion>
    </>
  );
}
