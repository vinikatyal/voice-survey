import React, { useEffect, useState } from "react";

// UI
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

// icons
import DeleteIcon from "@mui/icons-material/Delete";
import InsertPhotoIcon from "@mui/icons-material/InsertPhoto";

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
  expandStatus,
  handleExpanded,
  deleteQuestion,
}) {
  const [expanded, setExpanded] = useState(true);
  const [answer, setAnswer] = useState("");
  const [questionValue, setQuestionValue] = useState("");

  useEffect(() => {
    setExpanded(expandStatus);
  }, [expandStatus]);

  const answersList = [
    { id: 1, label: "Email & contact", value: "email" },
    { id: 2, label: "Multiple Choice", value: "multipleChoice" },
    { id: 3, label: "Date picker", value: "date" },
    { id: 4, label: "Linear Scale", value: "scale" },
    { id: 5, label: "NPS", value: "nps" },
  ];

  return (
    <>
      <QuestionAccordion expanded={expanded} square>
        <AccordionSummary
          sx={{ borderBottom: "solid 1px #dcdcdc" }}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <QuestionAccordionSummary>
            <StyledQuestionHead onClick={() => handleExpanded(id, !expanded)}>
              <Typography
                variant="subtitle2"
                color="#0a23fb"
                fontSize="18px"
                fontWeight="600"
              >
                {expanded ? `Question ${questionNumber}` : `Q${questionNumber}`}
              </Typography>
              <Typography color="#707070" ml={2}>
                {!expanded ? questionValue : ""}
              </Typography>
            </StyledQuestionHead>
            <DeleteIcon
              onClick={() => deleteQuestion(id)}
              sx={{ color: "#9a9cb5" }}
            />
          </QuestionAccordionSummary>
        </AccordionSummary>

        <AccordionDetails>
          <QuestionAccordionBody>
            <QuestionSection>
              <Label>Question</Label>
              <TextField
                multiline={true}
                minRows={3}
                id="outlined-basic"
                placeholder="Enter your welcome text here"
                fullWidth
                value={questionValue}
                onInput={(e) => setQuestionValue(e.target.value)}
                variant="filled"
                sx={{ backgroundColor: "#f7f7f7" }}
                InputProps={{
                  disableUnderline: true,
                }}
              />
            </QuestionSection>
            <AnswerSection>
              <Label>Short Answer</Label>
              <Autocomplete
                disablePortal
                disableClearable
                fullWidth
                id="combo-box-demo"
                options={answersList}
                value={answer}
                onChange={(event, value) => setAnswer(value)}
                isOptionEqualToValue={(option, value) => option.id === value.id}
                renderInput={(params) => (
                  <TextField {...params} placeholder="Select one" />
                )}
              />
              <AddImage>
                <InsertPhotoIcon sx={{ color: "#0a23fb" }} />
                <Typography ml={1} color="#0a23fb">
                  Add Image
                </Typography>
              </AddImage>
            </AnswerSection>
          </QuestionAccordionBody>
        </AccordionDetails>
      </QuestionAccordion>
    </>
  );
}
