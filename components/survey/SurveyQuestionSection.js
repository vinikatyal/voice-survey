import React from "react";

// UI
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";

// component
import SurveyQuestion from "./SurveyQuestion";

// button
import StyledButton from "../StyledButton";

import styled from "@emotion/styled";

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

export default function SurveyQuestionSection() {
  const [questionList, setQuestionList] = React.useState([
    { id: 1, questionNumber: 1, expandStatus: true },
  ]);

  const handleAddQuestion = () => {
    let newArr = questionList.map((element) => ({
      id: element.id,
      questionNumber: element.questionNumber,
      expandStatus: false,
    }));
    newArr = [
      ...newArr,
      {
        id: newArr.length + 1,
        questionNumber: newArr.length + 1,
        expandStatus: true,
      },
    ];
    setQuestionList(newArr);
  };

  const handleExpanded = (id, expandStatus) => {
    const newArr = questionList.map((element) => {
      if (element.id === id) {
        return {
          id: element.id,
          questionNumber: element.questionNumber,
          expandStatus: expandStatus,
        };
      }
      return {
        id: element.id,
        questionNumber: element.questionNumber,
        expandStatus: false,
      };
    });
    setQuestionList(newArr);
  };

  const deleteQuestion = (id) => {
    const newArr = questionList.filter((element) => element.id !== id);
    setQuestionList(newArr);
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
        {questionList.map((question) => (
          <SurveyQuestion
            key={question.id}
            id={question.id}
            questionNumber={question.questionNumber}
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
