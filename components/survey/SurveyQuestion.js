import React, { useEffect, useState } from "react";

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
import Button from "@mui/material/Button";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import RadioGroup from "@mui/material/RadioGroup";
import Radio from "@mui/material/Radio";

import ConfirmationDialog from "@/components/ConfirmationDialog";

// icons
import DeleteIcon from "@mui/icons-material/Delete";

// constants
import { surveyTypes } from "@/helpers/constants";

import styled from "@emotion/styled";

// State Manager
import { useDispatchSurvey, useSurvey } from "@/context/SurveyState";
import { useForm } from "react-hook-form";

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
  width: "70%",
});
const StyledQuestionHeadEndSlot = styled(Grid)({
  display: "flex",
  alignItems: "center",
});

const AnswerSection = styled("div")(() => ({
  width: "30%",
}));

const SuccessButton = styled(Button)(() => ({
  backgroundColor: "#19B885",
  "&:hover": {
    background: "#19B885",
  },
}));

const RequiredCheckbox = styled(Checkbox)({
  borderRadius: "4px",
});

const NPSDiv = styled("div")(() => ({
  width: "100%",
  display: "flex",
  alignItems: "center",
  marginTop: "10px",
}));

const CustomSelect = styled(Select)(() => ({
  width: "10%",
  marginLeft: "5px",
  marginRight: "5px",
}));

const NPSLabelDiv = styled("div")(() => ({
  width: "100%",
  display: "block",
  marginTop: "10px",
}));

const Multi = styled("div")(() => ({
  width: "100%",
  display: "block",
  marginTop: "10px",
}));

const MultiChoiceRadio = ({
  deleteMultiChoice,
  addMultiChoice,
  id,
  index,
  name,
  label,
  questionId,
  isLast,
  handleChange,
}) => (
  <Multi>
    <Radio checked={false} id={id} />
    <TextField
      id={id}
      variant="standard"
      placeholder={label}
      onChange={(e) => handleChange(e, id, index, questionId)}
    ></TextField>
    {isLast && <Button onClick={addMultiChoice}>Add</Button>}
    {!!index && <Button onClick={deleteMultiChoice}>Remove</Button>}
  </Multi>
);

const fromMenuItems = [
  {
    name: 0,
    value: 0,
  },
  {
    name: 1,
    value: 1,
  },
];

const toMenuItems = [
  {
    name: 1,
    value: 1,
  },
  {
    name: 2,
    value: 2,
  },
  {
    name: 3,
    value: 3,
  },
  {
    name: 4,
    value: 4,
  },
  {
    name: 5,
    value: 5,
  },
  {
    name: 6,
    value: 6,
  },
  {
    name: 7,
    value: 7,
  },
  {
    name: 8,
    value: 8,
  },
  {
    name: 9,
    value: 9,
  },
  {
    name: 10,
    value: 10,
  },
];

export default function SurveyQuestion({
  id,
  questionNumber,
  question,
  questionType,
  startLabel,
  endLabel,
  startCount,
  endCount,
  multiChoiceOptions,
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

  const survey = useSurvey();
  const dispatch = useDispatchSurvey();
  const [open, setOpen] = useState(false);
  const [multiOptions, setMultiOptions] = useState(multiChoiceOptions);

  useEffect(() => {
    if (id && multiOptions.length == 0) {
      setMultiOptions([
        {
          id: id + "question" + 0,
          name: "Option" + id + "question" + 0,
          label: "Option Label vbdvdbdvb",
        },
      ]);
    }
    setValue("question", question, {
      shouldDirty: true,
    });

    setValue("startLabel", startLabel, {
      shouldDirty: true,
    });
    setValue("endLabel", endLabel, {
      shouldDirty: true,
    });
  }, [question, startLabel, endLabel, id]);

  const handleInputChange = (e) => {
    const next = produce(survey.questions, (draft) => {
      const question = draft.find((question) => question.qid === id);
      question.question = e.target.value;
    });
    dispatch({ type: "SET_QUESTIONS", value: next });
  };

  const handleFromChange = (e) => {
    const next = produce(survey.questions, (draft) => {
      const question = draft.find((question) => question.qid === id);
      question.start_count = e.target.value;
    });
    dispatch({ type: "SET_QUESTIONS", value: next });
  };

  const handleToChange = (e) => {
    const next = produce(survey.questions, (draft) => {
      const question = draft.find((question) => question.qid === id);
      question.end_count = e.target.value;
    });
    dispatch({ type: "SET_QUESTIONS", value: next });
  };

  const handleStartLabel = (e) => {
    const next = produce(survey.questions, (draft) => {
      const question = draft.find((question) => question.qid === id);
      question.start_label = e.target.value;
    });
    dispatch({ type: "SET_QUESTIONS", value: next });
  };

  const handleEndLabel = (e) => {
    const next = produce(survey.questions, (draft) => {
      const question = draft.find((question) => question.qid === id);
      question.end_label = e.target.value;
    });
    dispatch({ type: "SET_QUESTIONS", value: next });
  };

  const debounced = debounce((e) => {
    handleInputChange(e);
  }, 600);

  const debounceStartLabel = debounce((e) => {
    handleStartLabel(e);
  }, 600);

  const debounceEndLabel = debounce((e) => {
    handleEndLabel(e);
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

  const handleAccept = () => {
    setOpen(false);
    deleteQuestion(id);
  };

  const deleteMultiChoice = (id) => {
    let newFormValues = [...multiOptions];

    newFormValues = newFormValues.filter(function (item) {
      return item.id != id;
    });
    setMultiOptions(newFormValues);
  };

  const addMultiChoice = (id, index, questionId) => {
    setMultiOptions([
      ...multiOptions,
      {
        id: id,
        name: "Option" + id,
        label: "Option Label",
      },
    ]);

    const next = produce(survey.questions, (draft) => {
      const question = draft.find((question) => question.qid === questionId);
      question.multiChoiceOptions = multiOptions;
    });
    dispatch({ type: "SET_QUESTIONS", value: next });
  };

  const handleMultiChange = (event, id, index) => {
    const target = event.target;
    let newFormValues = [...multiOptions];
    const data = newFormValues.find((x) => x.id === id);
    data.label = target.value;
    newFormValues[index][id] = data;
    console.log(newFormValues);
    setMultiOptions(newFormValues);
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
                  <RequiredCheckbox
                    color="success"
                    checked={required}
                    onClick={handleRequired}
                  />
                }
                label="Required"
              />
              {questionNumber === survey.questions.length && (
                <SuccessButton
                  size="medium"
                  variant="contained"
                  disableElevation
                  disableRipple
                  onClick={() => handleAddQuestion()}
                >
                  Add Question
                </SuccessButton>
              )}
              <DeleteIcon
                onClick={() =>
                  survey.surveyEditId ? setOpen(true) : deleteQuestion(id)
                }
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
                name="question"
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
              {questionType && questionType === surveyTypes.NPS && (
                <>
                  <NPSDiv>
                    <CustomSelect
                      name="startCount"
                      {...register("startCount", {
                        required: "You need a from count",
                        onChange: async () => {
                          await trigger("startCount");
                        },
                      })}
                      value={startCount}
                      onChange={handleFromChange}
                    >
                      {fromMenuItems.map((item, index) => (
                        <MenuItem value={item.value}>{item.name}</MenuItem>
                      ))}
                    </CustomSelect>
                    <spaceDiv>to</spaceDiv>
                    <CustomSelect
                      name="endCount"
                      {...register("endCount", {
                        required: "You need a to count",
                        onChange: async () => {
                          await trigger("endCount");
                        },
                      })}
                      value={endCount}
                      onChange={handleToChange}
                    >
                      {toMenuItems.map((item, index) => (
                        <MenuItem value={item.value}>{item.name}</MenuItem>
                      ))}
                    </CustomSelect>
                    <div>Defaults to 1 to 5 if not selected</div>
                  </NPSDiv>
                  <NPSLabelDiv>
                    <NPSDiv>
                      <TextField
                        {...register("startLabel", {
                          required: "You need a from label",
                          onChange: async () => {
                            await trigger("startLabel");
                          },
                        })}
                        name="start_label"
                        placeholder="Start Label"
                        variant="outlined"
                        onInput={debounceStartLabel}
                      />
                    </NPSDiv>
                    <NPSDiv>
                      <TextField
                        name="end_label"
                        placeholder="End Label"
                        variant="outlined"
                        {...register("endLabel", {
                          required: "You need a to label",
                          onChange: async () => {
                            await trigger("endLabel");
                          },
                        })}
                        onInput={debounceEndLabel}
                      />
                    </NPSDiv>
                  </NPSLabelDiv>
                </>
              )}

              {questionType && questionType === surveyTypes.MULTIPLE_CHOICE && (
                <RadioGroup>
                  {multiOptions &&
                    multiOptions.map((option, index) => (
                      <MultiChoiceRadio
                        deleteMultiChoice={() =>
                          deleteMultiChoice(id + "question" + index)
                        }
                        addMultiChoice={() =>
                          addMultiChoice(
                            id + "question" + (index + 1),
                            index,
                            option.id
                          )
                        }
                        id={option.id}
                        index={index}
                        label={option.label}
                        name={option.name}
                        questionId={id}
                        isLast={multiOptions.length === index + 1}
                        handleChange={handleMultiChange}
                      />
                    ))}
                </RadioGroup>
              )}
            </QuestionSection>
            <AnswerSection>
              <Label>Type</Label>
              <Autocomplete
                disablePortal
                disableClearable
                fullWidth
                id="combo-box-demo"
                value={
                  survey.questionTypeList.filter(
                    (obj) => obj.value === questionType
                  )[0]
                }
                options={survey.questionTypeList}
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
      <ConfirmationDialog
        status={open}
        title="Delete Question."
        message="If you are deleting a question, the responses collected for this question will also be deleted. Are you sure?"
        handleReject={() => setOpen(false)}
        handleAccept={handleAccept}
      />
    </>
  );
}
