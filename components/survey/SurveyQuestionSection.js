import React from "react";

import produce from "immer";
import isEmpty from "lodash.isempty";
import debounce from "lodash.debounce";
import get from "lodash.get";
import { useRouter } from "next/router";

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
  alignItems: "center",
  marginTop: "30px",
});

export default function SurveyQuestionSection({ questions }) {
  const {
    register,
    trigger,
    setValue,
    handleSubmit,
    formState: { errors, isDirty, isValid },
  } = useForm();
  const router = useRouter();
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
        qid: draft.length + 1,
        question: "",
        question_type: "text",
        required: false,
        expandStatus: true,
      });
    });

    dispatch({ type: "SET_QUESTIONS", value: next });
  };

  const handleExpanded = (id, expandStatus) => {
    const newArr = questions.map((obj) =>
      obj.qid === id
        ? { ...obj, expandStatus }
        : { ...obj, expandStatus: false }
    );
    dispatch({ type: "SET_QUESTIONS", value: newArr });
  };

  const deleteQuestion = (id) => {
    const newArr = questions.filter((element) => element.qid !== id);
    dispatch({ type: "SET_QUESTIONS", value: newArr });
  };

  const goToThemeScreen = () => {
    router.push(`/survey/create/themes`);
  };
  return (
    <form noValidate onSubmit={(e) => e.preventDefault()}>
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
        {questions &&
          questions.map((question, index) => (
            <SurveyQuestion
              key={question.qid}
              id={question.qid}
              questionNumber={index + 1}
              question={question.question}
              questionType={question.question_type}
              startLabel={get(question, "start_label")}
              endLabel={get(question, "end_label")}
              startCount={get(question, "start_count", 1)}
              endCount={get(question, "end_count", 5)}
              multiChoiceOptions={get(question, "multiChoiceOptions", [])}
              expandStatus={question.expandStatus}
              required={question.required}
              handleExpanded={handleExpanded}
              deleteQuestion={deleteQuestion}
              handleAddQuestion={handleAddQuestion}
            />
          ))}
      </Container>
      <AddQuestionSection maxWidth="lg">
        <StyledButton
          type="submit"
          variant="contained"
          disabled={!isDirty || !isValid}
          onClick={handleSubmit(goToThemeScreen)}
          sx={{ ml: 3 }}
        >
          Next
        </StyledButton>
      </AddQuestionSection>
    </form>
  );
}