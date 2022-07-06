import React, { useEffect } from "react";

import dynamic from "next/dynamic";
import get from "lodash.get";

import HSBar from "react-horizontal-stacked-bar-chart";
import { PieChart } from "react-minimal-pie-chart";

// UI
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

import { objectify } from "@/helpers/constants";

import { useSurvey } from "@/context/SurveyState";
// constants
import { surveyTypes } from "@/helpers/constants";

import styled from "@emotion/styled";
import { useState } from "react";

import CircleIcon from "@mui/icons-material/Circle";

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
  fontSize: "14px",
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
const StyledPieWrapper = styled("div")({
  width: "65%",
  height: "100%",
  fontSize: "16px",
  display: "flex",
  justifyContent: "flex-end",
  color: "#9a9cb5",
  borderRadius: "4px",
  backgroundColor: "#f8f9fd",
  margin: "6px 0 0",
});
const StyledPieBody = styled("div")({
  width: "100%",
  height: "350px",
  fontSize: "16px",
  display: "flex",
  justifyContent: "space-around",
  color: "#9a9cb5",
  borderRadius: "4px",
  backgroundColor: "#f8f9fd",
  margin: "6px 0 0",
});
const StyledOptionBody = styled("div")({
  width: "35%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
});
const StyledOption = styled("div")({
  display: "flex",
  alignItems: "center",
  marginBottom: "10px",
});

const StyledBarBody = styled("div")({
  width: "100%",
  height: "350px",
  fontSize: "16px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  color: "#9a9cb5",
  borderRadius: "4px",
  backgroundColor: "#f8f9fd",
  margin: "6px 0 0",
});

const StyledBarWrapper = styled("div")({
  width: "100%",
  fontSize: "16px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  color: "#9a9cb5",
  borderRadius: "4px",
  backgroundColor: "#f8f9fd",
  margin: "6px 0 0",
  padding: "0 10rem",
});

const StyledBarOptionBody = styled("div")({
  width: "100%",
  display: "flex",
  justifyContent: "space-around",
  marginTop: "5rem",
});

const Sentiment = styled("div")({
  width: "45%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
});

const Title = styled("div")({
  fontSize: "16px",
  color: "#707070",
  marginBottom: "8px",
});

const Phrases = styled("div")({
  display: "flex",
  width: "45%",
  marginLeft: "5%",
});

const PhrasesDiv = styled("div")({
  marginBottom: "4px",
});

const StyledAnswerRow = styled("div")({
  display: "flex",
  width: "100%",
  flexDirection: "row",
});

const NoData = styled("span")({
  padding: "16px",
  width: "100%",
});

const SentimentDivPer = styled("div")({});

const StackedBar = ({ data }) => {
  return (
    <HSBar
      showTextUp
      showValueIn
      data={[
        { name: "0-5", value: 15, description: "15%" },
        { name: "6-8", value: 25, description: "25%" },
        { name: "9-10", value: 60, description: "60%" },
      ]}
    />
  );
};

export default function SurveyQuestionsSection({
  index,
  question,
  reportData,
  dropOff,
}) {
  const survey = useSurvey();
  const [currentQuestion, setCurrentQuestion] = useState([]);
  useEffect(() => {
    const curQuestion = get(survey, "questions", []).filter(
      (q) => q.qid === question.qid
    )[0];
    setCurrentQuestion(curQuestion);
  }, [question]);

  const ReactWordcloud = dynamic(() => import("react-wordcloud"), {
    ssr: false,
  });
  const sentimentPer =
    reportData.sentiment_res &&
    reportData.sentiment_res.survey_questions[index] &&
    reportData.sentiment_res.survey_questions[index].sentiment_percent;

  const emotionRes =
    reportData.emotion_res &&
    reportData.emotion_res.survey_questions[index] &&
    reportData.emotion_res.survey_questions[index].emotion_counts;

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
              Drop off (%):{" "}
              {dropOff[question.qid] && dropOff[question.qid].toFixed(2)}
            </StyledQuestionHeadEndSlot>
          </QuestionAccordionSummary>
        </AccordionSummary>

        <AccordionDetails>
          <QuestionAccordionBody>
            {currentQuestion.question_type === surveyTypes.MULTIPLE_CHOICE ? (
              <StyledPieBody>
                <StyledPieWrapper>
                  <PieChart
                    radius={45}
                    segmentsShift={0.5}
                    animate
                    data={[
                      { title: "One", value: 10, color: "#5059AB" },
                      { title: "Two", value: 15, color: "#3FCC9B" },
                      { title: "Three", value: 20, color: "#8751FF" },
                      { title: "four", value: 10, color: "#38A0C0" },
                    ]}
                    label={({ dataEntry }) => `${dataEntry.value}%`}
                    labelStyle={{
                      fontSize: "4px",
                      fill: "white",
                    }}
                    segmentsStyle={{
                      transition: "stroke .3s",
                      cursor: "pointer",
                    }}
                  />
                </StyledPieWrapper>
                <StyledOptionBody>
                  <StyledOption>
                    <CircleIcon
                      fontSize="14px"
                      sx={{ color: "#38A0C0", mr: 1 }}
                    />{" "}
                    <Typography mr={1} color="black" fontSize="16">
                      Option1 -{" "}
                    </Typography>
                    <Typography fontSize="14">13 responses</Typography>
                  </StyledOption>
                  <StyledOption>
                    <CircleIcon
                      fontSize="14px"
                      sx={{ color: "#38A0C0", mr: 1 }}
                    />{" "}
                    <Typography mr={1} color="black" fontSize="16">
                      Option1 -{" "}
                    </Typography>
                    <Typography fontSize="14">13 responses</Typography>
                  </StyledOption>
                  <StyledOption>
                    <CircleIcon
                      fontSize="14px"
                      sx={{ color: "#38A0C0", mr: 1 }}
                    />{" "}
                    <Typography mr={1} color="black" fontSize="16">
                      Option1 -{" "}
                    </Typography>
                    <Typography fontSize="14">13 responses</Typography>
                  </StyledOption>
                  <StyledOption>
                    <CircleIcon
                      fontSize="14px"
                      sx={{ color: "#38A0C0", mr: 1 }}
                    />{" "}
                    <Typography mr={1} color="black" fontSize="16">
                      Option1 -{" "}
                    </Typography>
                    <Typography fontSize="14">13 responses</Typography>
                  </StyledOption>
                  <StyledOption>
                    <CircleIcon
                      fontSize="14px"
                      sx={{ color: "#38A0C0", mr: 1 }}
                    />{" "}
                    <Typography mr={1} color="black" fontSize="16">
                      Option1 -{" "}
                    </Typography>
                    <Typography fontSize="14">13 responses</Typography>
                  </StyledOption>
                </StyledOptionBody>
              </StyledPieBody>
            ) : currentQuestion.question_type === surveyTypes.NPS ? (
              <StyledBarBody>
                <StyledBarWrapper>
                  <StackedBar />
                </StyledBarWrapper>
                <StyledBarOptionBody>
                  <StyledOption>
                    <CircleIcon
                      fontSize="14px"
                      sx={{ color: "#38A0C0", mr: 1 }}
                    />{" "}
                    <Typography mr={1} color="black" fontSize="16">
                      Option1 -{" "}
                    </Typography>
                    <Typography fontSize="14">13 responses</Typography>
                  </StyledOption>
                  <StyledOption>
                    <CircleIcon
                      fontSize="14px"
                      sx={{ color: "#38A0C0", mr: 1 }}
                    />{" "}
                    <Typography mr={1} color="black" fontSize="16">
                      Option1 -{" "}
                    </Typography>
                    <Typography fontSize="14">13 responses</Typography>
                  </StyledOption>
                  <StyledOption>
                    <CircleIcon
                      fontSize="14px"
                      sx={{ color: "#38A0C0", mr: 1 }}
                    />{" "}
                    <Typography mr={1} color="black" fontSize="16">
                      Option1 -{" "}
                    </Typography>
                    <Typography fontSize="14">13 responses</Typography>
                  </StyledOption>
                </StyledBarOptionBody>
              </StyledBarBody>
            ) : (
              <StyledAnswerBody>
                <StyledAnswerTableHead>
                  <Sentiment>Emotions</Sentiment>
                  <Phrases>Phrases</Phrases>
                </StyledAnswerTableHead>
                <StyledAnswerTableBody>
                  <StyledAnswerRow>
                    <Sentiment>
                      <TableContainer sx={{ maxHeight: 300, width: "100%" }}>
                        <Table>
                          <TableHead>
                            <TableRow>
                              <TableCell align="left">Emotion</TableCell>
                              <TableCell align="left">Occurences</TableCell>
                            </TableRow>
                          </TableHead>

                          <TableBody
                            sx={{
                              backgroundColor: "#f8f9fd",
                              cursor: "pointer",
                            }}
                          >
                            {!Object.keys(emotionRes).length && (
                              <TableRow>
                                <NoData>No Results</NoData>
                              </TableRow>
                            )}
                            {Object.keys(emotionRes).length > 0 &&
                              Object.keys(emotionRes).map((phrase) => (
                                <TableRow key={phrase}>
                                  <TableCell align="left">{phrase}</TableCell>
                                  <TableCell align="left">
                                    {emotionRes[phrase]}
                                  </TableCell>
                                </TableRow>
                              ))}
                          </TableBody>
                        </Table>
                      </TableContainer>
                    </Sentiment>
                    <Phrases>
                      <TableContainer sx={{ maxHeight: 300, width: "100%" }}>
                        <Table>
                          <TableHead>
                            <TableRow>
                              <TableCell align="left">Keywords</TableCell>
                              <TableCell align="left">Occurences</TableCell>
                            </TableRow>
                          </TableHead>

                          <TableBody
                            sx={{
                              backgroundColor: "#f8f9fd",
                              cursor: "pointer",
                            }}
                          >
                            {!get(question, "key_phrases", []).length && (
                              <TableRow>
                                <NoData>No Results</NoData>
                              </TableRow>
                            )}
                            {get(question, "key_phrases", []).length > 0 &&
                              objectify(get(question, "key_phrases", [])).map(
                                (phrase, index) => (
                                  <TableRow key={index}>
                                    <TableCell align="left">
                                      {phrase.text}
                                    </TableCell>
                                    <TableCell align="left">
                                      {phrase.value}
                                    </TableCell>
                                  </TableRow>
                                )
                              )}
                          </TableBody>
                        </Table>
                      </TableContainer>
                    </Phrases>
                  </StyledAnswerRow>
                  <StyledAnswerRow>
                    <Sentiment>
                      <Title>Sentiment: </Title>
                      <SentimentDivPer>
                        Positive Responses {get(sentimentPer, "positive", 0)}%
                      </SentimentDivPer>
                      <SentimentDivPer>
                        Negative Responses {get(sentimentPer, "negative", 0)}%
                      </SentimentDivPer>
                      <SentimentDivPer>
                        Neutral Responses {get(sentimentPer, "neutral", 0)}%
                      </SentimentDivPer>
                    </Sentiment>
                    <Phrases>
                      {get(question, "key_phrases") && (
                        <ReactWordcloud
                          size={[200, 200]}
                          options={{
                            enableTooltip: true,
                            deterministic: true,
                            fontStyle: "normal",
                            fontWeight: "normal",
                            padding: 1,
                            rotations: 3,
                            rotationAngles: [0, 0],
                            scale: "sqrt",
                            spiral: "archimedean",
                            transitionDuration: 1000,
                            fontFamily:
                              '"Poppins", -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji"',
                            fontSizes: [16, 20],
                          }}
                          words={objectify(get(question, "key_phrases", []))}
                        />
                      )}
                    </Phrases>
                  </StyledAnswerRow>
                </StyledAnswerTableBody>
              </StyledAnswerBody>
            )}
          </QuestionAccordionBody>
        </AccordionDetails>
      </QuestionAccordion>
    </>
  );
}
