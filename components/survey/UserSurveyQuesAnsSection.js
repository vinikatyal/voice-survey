import React from "react";

import get from "lodash.get";

// UI
import Container from "@mui/material/Container";
// component
import UserSurveyQuesAns from "./UserSurveyQuesAns";

import styled from "@emotion/styled";

const Label = styled("span")({
  color: "#707070",
  fontSize: "16px",
  fontWeight: "500",
});

const questAns = [
  {
    qname: "How did you like our product?",
    answer: {
      text: "First answer",
      type: "voice",
      key_parameter: "POSITIVE",
    },
  },
  {
    qname: "Tell us few words",
    answer: {
      text: "First answer",
      type: "text",
      key_parameter: "POSITIVE",
    },
  },
  {
    qname: "Write us a recommendation?",
    answer: {
      text: "First answer",
      type: "description",
      key_parameter: "POSITIVE",
    },
  },
  {
    qname: "Your phone number",
    answer: {
      text: "First answer",
      type: "contact",
      key_parameter: "POSITIVE",
    },
  },
];

export default function SurveyQuesAnsSection({ reportData }) {
  console.log(reportData)
  return (
    <>
      <Container maxWidth="lg" sx={{ marginTop: "30px" }}>
        {get(reportData, "unique_id", "")}
      </Container>

      <Container maxWidth="lg" sx={{ marginTop: "30px" }}>
        <Label>Questions</Label>
        {get(reportData, "survey_questions", []) &&
          get(reportData, "survey_questions", []).length &&
          get(reportData, "survey_questions", []).map((q, index) => (
            <UserSurveyQuesAns key={index} question={q} />
          ))}
      </Container>
    </>
  );
}
