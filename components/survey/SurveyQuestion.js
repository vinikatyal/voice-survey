import React, { useEffect } from "react";

import produce from "immer";
import isEmpty from "lodash.isempty";
import debounce from "lodash.debounce";

// UI
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

// icons
import DeleteIcon from "@mui/icons-material/Delete";
import InsertPhotoIcon from "@mui/icons-material/InsertPhoto";

import styled from "@emotion/styled";

// State Manager
import { useDispatchSurvey, useSurvey } from "../../context/SurveyState";
import { useForm } from "react-hook-form";
import StyledButton from "../StyledButton";

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
}));

const Label = styled("span")({
  color: "#707070",
  fontSize: "16px",
  fontWeight: "500",
});

const QuestionAccordionBody = styled("div")(() => ({
  width: "100%",
  display: "flex",
}));
const QuestionSection = styled("div")(() => ({
  width: "70%",
  paddingRight: "20px",
}));
const StyledQuestionHead = styled("div")({
  display: "flex",
  justifyContent: "flex-start",
  alignItems: "center",
  width: "100%",
});
const StyledQuestionHeadEndSlot = styled(Grid)({
  display: "flex",
  alignItems: "center",
});

const AnswerSection = styled("div")(() => ({
  width: "30%",
}));

const AddImage = styled("div")(() => ({
  backgroundColor: "#E1E1E1",
  width: "147px",
  display: "flex",
  justifyContent: "center",
  alignItems: "end",
  marginTop: "10px",
  padding: "5px 10px",
  cursor: "pointer",
}));

export default function SurveyQuestion({
  id,
  questionNumber,
  question,
  questionType,
  expandStatus,
  required,
  handleExpanded,
  deleteQuestion,
  handleAddQuestion,
}) {
  const {
    register,
    trigger,
    setValue,
    formState: { errors },
  } = useForm();

  const answersList = [
    { id: 1, label: "Textfield", value: "text" },
    { id: 2, label: "Description", value: "description" },
    { id: 3, label: "Email", value: "email" },
    { id: 4, label: "Phone number", value: "contact" },
    { id: 5, label: "Date picker", value: "date" },
    { id: 6, label: "Voice", value: "audio" },
  ];
  const survey = useSurvey();
  const dispatch = useDispatchSurvey();

  useEffect(() => {
    setValue("question", question, {
      shouldDirty: true,
    });
  }, [question]);

  const handleInputChange = (e) => {
    const next = produce(survey.questions, (draft) => {
      const question = draft.find((question) => question.qid === id);
      question.question = e.target.value;
    });
    dispatch({ type: "SET_QUESTIONS", value: next });
  };

  const debounced = debounce((e) => {
    handleInputChange(e);
  }, 600);

  const handleAnswerTypeChange = (_, value) => {
    const next = produce(survey.questions, (draft) => {
      const question = draft.find((question) => question.qid === id);
      question.question_type = value.value;
    });
    dispatch({ type: "SET_QUESTIONS", value: next });
  };

  const handleRequired = (e) => {
    const next = produce(survey.questions, (draft) => {
      const question = draft.find((question) => question.qid === id);
      question.required = e.target.checked;
    });
    dispatch({ type: "SET_QUESTIONS", value: next });
  };

  return (
    <>
      <QuestionAccordion expanded={expandStatus} square>
        <AccordionSummary
          sx={{ borderBottom: "solid 1px #dcdcdc" }}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <QuestionAccordionSummary>
            <StyledQuestionHead
              onClick={() => handleExpanded(id, !expandStatus)}
            >
              <Typography
                variant="subtitle2"
                color="#0a23fb"
                fontSize="18px"
                fontWeight="600"
              >
                {expandStatus
                  ? `Question ${questionNumber}`
                  : `Q${questionNumber}`}
              </Typography>
              <Typography color="#707070" ml={2}>
                {!expandStatus ? question : ""}
              </Typography>
            </StyledQuestionHead>
            <StyledQuestionHeadEndSlot>
              <FormControlLabel
                control={
                  <Checkbox checked={required} onClick={handleRequired} />
                }
                label="Required"
              />
              {questionNumber === survey.questions.length && (
                <StyledButton onClick={() => handleAddQuestion()}>
                  Add Question
                </StyledButton>
              )}
              <DeleteIcon
                onClick={() => deleteQuestion(id)}
                sx={{ color: "#9a9cb5", marginLeft: "20px" }}
              />
            </StyledQuestionHeadEndSlot>
          </QuestionAccordionSummary>
        </AccordionSummary>

        <AccordionDetails>
          <QuestionAccordionBody>
            <QuestionSection>
              <Label>Question</Label>
              <TextField
                multiline={true}
                minRows={3}
                error={!isEmpty(errors.question)}
                {...register("question", {
                  required: "You need to specify question",
                  onChange: async () => {
                    await trigger("question");
                  },
                })}
                id="outlined-basic"
                placeholder="Enter your welcome text here"
                fullWidth
                onInput={debounced}
                variant="outlined"
                sx={{ backgroundColor: "#f7f7f7" }}
              />
              {errors.question && (
                <Typography color="red">{errors.question.message}</Typography>
              )}
            </QuestionSection>
            <AnswerSection>
              <Label>Short Answer</Label>
              <Autocomplete
                disablePortal
                disableClearable
                fullWidth
                id="combo-box-demo"
                value={
                  answersList.filter((obj) => obj.value === questionType)[0]
                }
                options={answersList}
                onChange={handleAnswerTypeChange}
                isOptionEqualToValue={(option, value) =>
                  option.value === value.value
                }
                renderInput={(params) => (
                  <TextField {...params} placeholder="Select one" />
                )}
              />
            </AnswerSection>
          </QuestionAccordionBody>
        </AccordionDetails>
      </QuestionAccordion>
    </>
  );
}
