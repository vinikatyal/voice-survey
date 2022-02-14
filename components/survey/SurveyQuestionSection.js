import React from "react";

import produce from "immer";
import isEmpty from "lodash.isempty";
import debounce from "lodash.debounce";

// UI
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

// component
import SurveyQuestion from "./SurveyQuestion";

// button
import StyledButton from "../StyledButton";

import styled from "@emotion/styled";

// State Manager
import { useDispatchSurvey, useSurvey } from "../../context/SurveyState";
import { useForm } from "react-hook-form";
import { useEffect } from "react";

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
  const {
    register,
    trigger,
    setValue,
    formState: { errors },
  } = useForm();

  const survey = useSurvey();
  const dispatch = useDispatchSurvey();

  useEffect(() => {
    setValue("welcome_text", survey.surveyWelcomeText, {
      shouldDirty: true,
    });
  }, [survey.surveyWelcomeText]);

  const handleInputChange = (e) => {
    dispatch({ type: "SET_WELCOME_TEXT", value: e.target.value });
  };

  const debounced = debounce((e) => {
    handleInputChange(e);
  }, 1000);

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

    dispatch({ type: "SET_QUESTIONS", value: next });
  };

  const handleExpanded = (id, expandStatus) => {
    const newArr = questions.map((obj) =>
      obj.id === id ? { ...obj, expandStatus } : { ...obj, expandStatus: false }
    );
    dispatch({ type: "SET_QUESTIONS", value: newArr });
  };

  const deleteQuestion = (id) => {
    const newArr = questions.filter((element) => element.id !== id);
    dispatch({ type: "SET_QUESTIONS", value: newArr });
  };
  return (
    <>
      <Container maxWidth="lg" sx={{ marginTop: "30px" }}>
        <Label>Welcome Text</Label>
        <TextField
          error={!isEmpty(errors.welcome_text)}
          id="outlined-basic"
          {...register("welcome_text", {
            required: "You need to specify welcome text",
            onChange: async () => {
              await trigger("welcome_text");
            },
          })}
          placeholder="Enter your welcome text here"
          onInput={debounced}
          fullWidth
          variant="outlined"
        />
        {errors.welcome_text && (
          <Typography color="red">{errors.welcome_text.message}</Typography>
        )}
      </Container>

      <Container maxWidth="lg" sx={{ marginTop: "30px" }}>
        <Label>Add Questions</Label>
        {questions.map((question, index) => (
          <SurveyQuestion
            key={question.id}
            id={question.id}
            questionNumber={index + 1}
            question={question.question}
            answerTypeId={question.question_type}
            expandStatus={question.expandStatus}
            required={question.required}
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
