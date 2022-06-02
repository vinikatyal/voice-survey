import React from "react";

import get from "lodash.get";

// UI
import Container from "@mui/material/Container";
// component
import UserSurveyQuesAns from "@/components/survey/UserSurveyQuesAns";

import styled from "@emotion/styled";

const Label = styled("span")({
  color: "#707070",
  fontSize: "16px",
  fontWeight: "500",
});

export default function UserSurveyQuesAnsSection({ reportData }) {
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
            <UserSurveyQuesAns key={index} data={reportData} question={q} />
          ))}
      </Container>
    </>
  );
}
