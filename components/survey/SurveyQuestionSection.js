import React from "react";

import produce from "immer";

// UI
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";

// component
import SurveyQuestion from "./SurveyQuestion";

// button
import StyledButton from "../StyledButton";

import styled from "@emotion/styled";

// State Manager
import { useDispatchSurvey } from "./SurveyState";

const Label = styled("span")({
  color: "#707070",
  fontSize: "16px",
  fontWeight: "500",
});

const AddQuestionSection = styled(Container)({
  display: "flex",
  width: "100%",
  justifyContent: "flex-end",
  marginTop: "30px",
});

export default function SurveyQuestionSection({ questions }) {
  const dispatch = useDispatchSurvey();

  const handleAddQuestion = () => {
    const next = produce(questions, (draft) => {
      draft.map((_, index) => (draft[index].expandStatus = false));
      draft.push({
        id: draft.length + 1,
        question: "",
        answerTypeId: 1,
        expandStatus: true,
      });
    });

    dispatch({ type: "QUESTIONS", value: next });
  };

  const handleExpanded = (id, expandStatus) => {
    const newArr = questions.map((obj) =>
      obj.id === id ? { ...obj, expandStatus } : { ...obj, expandStatus: false }
    );
    dispatch({ type: "QUESTIONS", value: newArr });
  };

  const deleteQuestion = (id) => {
    const newArr = questions.filter((element) => element.id !== id);
    dispatch({ type: "QUESTIONS", value: newArr });
  };
  return (
    <>
      <Container maxWidth="lg" sx={{ marginTop: "30px" }}>
        <Label>Welcome Text</Label>
        <TextField
          id="outlined-basic"
          placeholder="Enter your welcome text here"
          fullWidth
          variant="outlined"
        />
      </Container>

      <Container maxWidth="lg" sx={{ marginTop: "30px" }}>
        <Label>Add Questions</Label>
        {questions.map((question, index) => (
          <SurveyQuestion
            key={question.id}
            id={question.id}
            questionNumber={index + 1}
            question={question.question}
            answerTypeId={question.answerTypeId}
            expandStatus={question.expandStatus}
            handleExpanded={handleExpanded}
            deleteQuestion={deleteQuestion}
          />
        ))}
      </Container>
      <AddQuestionSection maxWidth="lg">
        <StyledButton onClick={handleAddQuestion}>Add Question</StyledButton>
      </AddQuestionSection>
    </>
  );
}
