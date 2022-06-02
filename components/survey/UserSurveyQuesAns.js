import React from "react";

import dayjs from "dayjs";
import get from "lodash.get";

// UI
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

import { objectify, convertToSentenceTable } from "@/helpers/constants";

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

const SpanTitle = styled("span")({
  fontSize: "14px",
});

const Sentiment = styled("div")({
  width: "20%",
});

const Phrase = styled(Chip)({
  backgroundColor: "#2A7EFF",
  color: "#fff",
  marginRight: "2px",
  fontSize: "10px",
});

const StyledAnswerRow = styled("div")({
  display: "flex",
  width: "100%",
  flexDirection: "row",
  alignItems: "center",
});

const StyledAnswerColumn = styled("div")({
  display: "flex",
  width: "100%",
  flexDirection: "column",
  marginBottom: "10px",
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

const AddMargin = styled("div")({
  display: "flex",
  width: "100%",
  marginBottom: "8px",
});

const NoData = styled("div")({
  padding: "16px",
  width: "100%",
});

export default function UserSurveyQuesAns({ data, question }) {
  return (
    <>
      <QuestionAccordion expanded={true} square key={question.qid}>
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
                Question {question.qid}: {question.question}
              </Typography>
            </StyledQuestionHead>
            <StyledQuestionHeadEndSlot>
              <QuestionTypeDiv>
                {question.question_type} response
              </QuestionTypeDiv>
            </StyledQuestionHeadEndSlot>
          </QuestionAccordionSummary>
        </AccordionSummary>

        <AccordionDetails>
          <QuestionAccordionBody>
            <StyledAnswerBody>
              <StyledAnswerTableHead>
                <Answer>Response</Answer>
                <Date>Created</Date>
                <Sentiment>Key Phrases</Sentiment>
              </StyledAnswerTableHead>
              <StyledAnswerTableBody>
                <StyledAnswerRow>
                  {get(question, "question_type", "") === "audio" &&
                    get(question, "audio_url") && (
                      <Answer>
                        <audio src={question.audio_url} controls />
                      </Answer>
                    )}
                  {get(question, "question_type") !== "audio" && (
                    <Answer>{question.answer}</Answer>
                  )}
                  <Date>
                    {get(data, "inserted_at") &&
                      dayjs(get(data, "inserted_at", "")).format("DD MMM YYYY")}
                  </Date>
                  <Sentiment>
                    {!get(question, "key_phrases", []).length && (
                      <NoData>No Results</NoData>
                    )}
                    {get(question, "key_phrases", []).length > 0 &&
                      objectify(get(question, "key_phrases", [])).map(
                        (phrase, index) => (
                          <Phrase key={index} label={phrase.text} />
                        )
                      )}
                  </Sentiment>
                </StyledAnswerRow>
                {get(question, "question_type", "") === "audio" && (
                  <StyledAnswerColumn>
                    <StyledAnswerTableHead>Transcript</StyledAnswerTableHead>
                    <StyledAnswerRowBody>
                      {question.transcription}
                    </StyledAnswerRowBody>
                  </StyledAnswerColumn>
                )}
                <StyledAnswerRow>
                  <TableContainer sx={{ maxHeight: 300, width: "100%" }}>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell align="left">Sentence</TableCell>
                          <TableCell align="left">Emotion</TableCell>
                          <TableCell align="left">Sentiment</TableCell>
                        </TableRow>
                      </TableHead>

                      <TableBody
                        sx={{
                          backgroundColor: "#f8f9fd",
                          cursor: "pointer",
                        }}
                      >
                        {!get(question, "emotion.sentences", []).length && (
                          <TableRow>
                            <NoData>No Results</NoData>
                          </TableRow>
                        )}
                        {get(question, "emotion.sentences", []).length > 0 &&
                          convertToSentenceTable(
                            get(question, "emotion.sentences", [])
                          ).map((phrase, index) => (
                            <TableRow key={index}>
                              <TableCell align="left">
                                {phrase.sentence}
                              </TableCell>
                              <TableCell align="left">
                                {phrase.emotion}
                              </TableCell>
                              <TableCell align="left">
                                {phrase.sentiment}
                              </TableCell>
                            </TableRow>
                          ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </StyledAnswerRow>
                <AddMargin />
                <StyledAnswerRow></StyledAnswerRow>
              </StyledAnswerTableBody>
            </StyledAnswerBody>
          </QuestionAccordionBody>
        </AccordionDetails>
      </QuestionAccordion>
    </>
  );
}
