import React, { useEffect, useState, useRef } from "react";

import produce from "immer";
import isEmpty from "lodash.isempty";
import debounce from "lodash.debounce";
import dayjs from "dayjs";

import Image from "next/image";

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
import IconButton from "@mui/material/IconButton";

import ConfirmationDialog from "@/components/ConfirmationDialog";

// icons
import DeleteIcon from "@mui/icons-material/Delete";
import AddCircleOutlinedIcon from "@mui/icons-material/AddCircleOutlined";
import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";
import ImageIcon from "@mui/icons-material/Image";
import VideocamIcon from "@mui/icons-material/Videocam";

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
  width: "60%",
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
  marginRight: "5px",
}));

const NPSLabelDiv = styled("div")(() => ({
  width: "100%",
  display: "block",
  marginTop: "10px",
}));

const OptionContainer = styled("div")(() => ({
  width: "100%",
  display: "flex",
  alignItems: "center",
}));

const Input = styled("input")({
  display: "none",
});

const ImageDiv = styled("div")(() => ({
  position: "relative",
  width: "100%",
  border: "2px dashed gray",
  borderRadius: "5px",
}));
const VideoDiv = styled("div")(() => ({
  position: "relative",
  width: "100%",
  borderRadius: "5px",
}));
const ImageDivCancelButton = styled(IconButton)(() => ({
  backgroundColor: "#0A23FB",
  color: "white",
  position: "absolute",
  top: "-10px",
  right: "-10px",
  "&:hover": {
    backgroundColor: "#0A23FB",
    color: "white",
  },
}));

const ImageText = styled("div")(() => ({
  color: "#707070",
  fontSize: "1em",
  marginTop: "10px",
}));

const IconButtonIm = styled(IconButton)(() => ({
  backgroundColor: "#E3E6FF",
  marginRight: "10px",
}));

const MultiChoiceRadio = ({
  addOption,
  deleteOption,
  id,
  index,
  questionId,
  isLast,
  option,
  handleChange,
  optionsLength,
}) => (
  <>
    <OptionContainer>
      <Radio checked={false} id={id} />
      <TextField
        id={id}
        variant="standard"
        sx={{ minWidth: "450px" }}
        defaultValue={option}
        placeholder="Enter option title"
        onChange={(e) => handleChange(e, id, index, questionId)}
      ></TextField>
      {optionsLength > 1 && (
        <IconButton
          onClick={deleteOption}
          aria-label="delete"
          sx={{ margin: "15px 0 0 15px" }}
          size="small"
        >
          <ClearOutlinedIcon />
        </IconButton>
      )}
    </OptionContainer>
    <div>
      {isLast && (
        <Button
          onClick={addOption}
          variant="contained"
          sx={{ marginLeft: "10px" }}
        >
          <AddCircleOutlinedIcon sx={{ mr: 1 }} /> Add Option
        </Button>
      )}
    </div>
  </>
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
  video_url,
  image,
}) {
  const {
    register,
    trigger,
    setValue,
    formState: { errors },
  } = useForm();

  const [imageSrc, setImageSrc] = useState("");
  const imageRef = useRef();
  const [videoLinkStatus, setVideoLinkStatus] = useState(false);
  const survey = useSurvey();
  const dispatch = useDispatchSurvey();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setValue("question", question, {
      shouldDirty: true,
    });

    setValue("startLabel", startLabel, {
      shouldDirty: true,
    });
    setValue("endLabel", endLabel, {
      shouldDirty: true,
    });
    setValue("videoLink", video_url, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
    video_url && setVideoLinkStatus(true);
  }, [question, startLabel, endLabel, id, video_url, videoLinkStatus]);

  useEffect(() => {
    if (image) {
      typeof image === "string"
        ? addImagePreview(image)
        : addImagePreview({ target: { files: [image] } });
    }
  }, []);

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

  const videoLinkDebounced = debounce((e) => {
    onVideoLink(e);
  }, 600);

  const handleAnswerTypeChange = (_, value) => {
    const next = produce(survey.questions, (draft) => {
      const question = draft.find((question) => question.qid === id);
      question.question_type = value.value;
      if (value.value === surveyTypes.NPS) {
        question.start_count = 1;
        question.end_count = 5;
        question.start_label = "";
        question.end_label = "";
      } else {
        delete question.start_count;
        delete question.end_count;
        delete question.start_label;
        delete question.end_label;
      }
      if (value.value === surveyTypes.MULTIPLE_CHOICE)
        question.multiChoiceOptions = [
          { id: `question_${dayjs().valueOf()}`, option: "Option 1" },
        ];
      else delete question.multiChoiceOptions;
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

  const handleDeleteOption = (optionId) => {
    const next = produce(survey.questions, (draft) => {
      const question = draft.find((question) => question.qid === id);
      question.multiChoiceOptions = question.multiChoiceOptions.filter(
        (option) => option.id !== optionId
      );
    });
    dispatch({ type: "SET_QUESTIONS", value: next });
  };
  const handleAddOption = (optionId, option) => {
    const next = produce(survey.questions, (draft) => {
      const question = draft.find((question) => question.qid === id);
      question.multiChoiceOptions.push({
        id: optionId,
        option,
      });
    });
    dispatch({ type: "SET_QUESTIONS", value: next });
  };

  const handleMultiChange = (event, optionId) => {
    const value = event.target.value;
    const next = produce(survey.questions, (draft) => {
      const question = draft.find((question) => question.qid === id);
      const index = question.multiChoiceOptions.findIndex(
        (option) => option.id === optionId
      );
      question.multiChoiceOptions[index].option = value;
    });
    dispatch({ type: "SET_QUESTIONS", value: next });
  };

  const getRealURL = (url) => {
    const regExp =
      /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    if (match) {
      return match && match[2].length === 11
        ? "https://www.youtube.com/embed/" + match[2]
        : url;
    } else {
      return url;
    }
  };

  const addImagePreview = (event) => {
    const reader = new FileReader();
    if (typeof event === "string") {
      setImageSrc(event);
    } else if (event.target.files.length) {
      reader.onload = async () => {
        setImageSrc(reader.result);
      };
      reader.readAsDataURL(event.target.files[0]);
    }
    const next = produce(survey.questions, (draft) => {
      const question = draft.find((question) => question.qid === id);
      question.image =
        typeof event === "string"
          ? event
          : event.target.files.length
          ? event.target.files[0]
          : question.image;
      delete question.video_url;
    });
    dispatch({ type: "SET_QUESTIONS", value: next });
    setVideoLinkStatus(false);
  };

  const removeImagePreview = () => {
    imageRef.current.value = "";
    const next = produce(survey.questions, (draft) => {
      const question = draft.find((question) => question.qid === id);
      delete question.image;
    });
    dispatch({ type: "SET_QUESTIONS", value: next });
    setImageSrc("");
  };

  const addVideoLink = () => {
    removeImagePreview();
    setVideoLinkStatus(true);
  };
  const onVideoLink = (event) => {
    const next = produce(survey.questions, (draft) => {
      const question = draft.find((question) => question.qid === id);
      question.video_url = getRealURL(event.target.value);
    });
    dispatch({ type: "SET_QUESTIONS", value: next });
  };

  const removeVideoLink = () => {
    const next = produce(survey.questions, (draft) => {
      const question = draft.find((question) => question.qid === id);
      delete question.video_url;
    });
    dispatch({ type: "SET_QUESTIONS", value: next });
    setVideoLinkStatus(false);
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
              <label htmlFor={`${id}_image_file`}>
                <Input
                  ref={imageRef}
                  accept="image/*"
                  id={`${id}_image_file`}
                  type="file"
                  onChange={addImagePreview}
                />
                <IconButtonIm aria-label="upload picture" component="span">
                  <ImageIcon />
                </IconButtonIm>
              </label>

              <IconButtonIm
                onClick={addVideoLink}
                aria-label="video link"
                component="span"
              >
                <VideocamIcon />
              </IconButtonIm>

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
                      size="small"
                      onChange={handleFromChange}
                    >
                      {fromMenuItems.map((item, index) => (
                        <MenuItem key={index} value={item.value}>
                          {item.name}
                        </MenuItem>
                      ))}
                    </CustomSelect>
                    <spaceDiv>to</spaceDiv>
                    <CustomSelect
                      sx={{ ml: 1 }}
                      name="endCount"
                      {...register("endCount", {
                        required: "You need a to count",
                        onChange: async () => {
                          await trigger("endCount");
                        },
                      })}
                      value={endCount}
                      size="small"
                      onChange={handleToChange}
                    >
                      {toMenuItems.map((item, index) => (
                        <MenuItem key={index} value={item.value}>
                          {item.name}
                        </MenuItem>
                      ))}
                    </CustomSelect>
                  </NPSDiv>
                  <NPSLabelDiv>
                    <NPSDiv>
                      <TextField
                        size="small"
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
                        size="small"
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
                  {multiChoiceOptions &&
                    multiChoiceOptions.map((option, index) => (
                      <MultiChoiceRadio
                        key={index}
                        addOption={() =>
                          handleAddOption(
                            `question_${dayjs().valueOf()}`,
                            `Option ${index + 2}`
                          )
                        }
                        deleteOption={() => handleDeleteOption(option.id)}
                        id={option.id}
                        index={index}
                        questionId={id}
                        option={option.option}
                        optionsLength={multiChoiceOptions.length}
                        isLast={multiChoiceOptions.length === index + 1}
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
              {imageSrc && (
                <Grid fullWidth>
                  <ImageText>Image Preview</ImageText>
                  <ImageDiv>
                    <Image
                      width="100%"
                      height="100%"
                      layout="responsive"
                      objectFit="contain"
                      src={imageSrc}
                      unoptimized={false}
                    />
                    <ImageDivCancelButton
                      size="small"
                      onClick={removeImagePreview}
                    >
                      <ClearOutlinedIcon fontSize="10" />
                    </ImageDivCancelButton>
                  </ImageDiv>
                </Grid>
              )}
              {videoLinkStatus && (
                <Grid fullWidth>
                  <ImageText>Paste video URL</ImageText>
                  <VideoDiv>
                    <TextField
                      name="videoLink"
                      id="outlined-basic"
                      multiline
                      minRows={3}
                      placeholder="Enter video link here"
                      fullWidth
                      error={!isEmpty(errors.videoLink)}
                      {...register("videoLink", {
                        required: "You need to add a video url",
                        onChange: async () => {
                          await trigger("videoLink");
                        },
                      })}
                      onInput={videoLinkDebounced}
                      variant="outlined"
                      sx={{ backgroundColor: "#f7f7f7" }}
                    />
                    {errors.videoLink && (
                      <Typography color="red">
                        {errors.videoLink.message}
                      </Typography>
                    )}
                    <ImageDivCancelButton
                      size="small"
                      onClick={removeVideoLink}
                    >
                      <ClearOutlinedIcon fontSize="10" />
                    </ImageDivCancelButton>
                  </VideoDiv>
                </Grid>
              )}
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
