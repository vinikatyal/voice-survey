import React from "react";

// UI
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";

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

export default function UserSurveyQuesAns({ question }) {
  return (
    <>
      <QuestionAccordion expanded={true} square>
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
                {question.qname}
              </Typography>
            </StyledQuestionHead>
          </QuestionAccordionSummary>
        </AccordionSummary>

        <AccordionDetails>
          <QuestionAccordionBody>
            {question.answer.text}
            
          </QuestionAccordionBody>
        </AccordionDetails>
      </QuestionAccordion>
    </>
  );
}
