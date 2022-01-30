import React from "react";

// UI
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

// icons
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import ColorLensIcon from "@mui/icons-material/ColorLens";

import styled from "@emotion/styled";

// Styled
const SurveyHeadSection = styled("div")({
  height: "60px",
  backgroundColor: "#f5f8ff",
});

const HeaderContainer = styled(Container)(({}) => ({
  color: "#707070",
  display: "flex",
  justifyContent: "space-between",
}));

const SurveyHeadSelectionWrapper = styled("div")({
  display: "flex",
  width: "30%",
  height: "60px",
  alignItems: "center",
});

const TabButton = styled("div")(({ active }) => ({
  background: active ? "#0A23FB" : "#fff",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "5px 10px",
  borderRadius: "5px",
  minWidth: "140px",
  border: active ? "none" : "1px solid #9a9cb5",
  color: active ? "white" : "#9a9cb5",
  marginRight: "10px",
  cursor: "pointer",
}));

export default function SurveyCreateTabSection({
  currentTab,
  handleChangeTab,
  children,
}) {
  return (
    <>
      <SurveyHeadSection>
        <HeaderContainer maxWidth="lg">
          <SurveyHeadSelectionWrapper>
            <TabButton
              active={currentTab === "QUESTIONS"}
              onClick={() => handleChangeTab("QUESTIONS")}
            >
              <QuestionMarkIcon sx={{ fontSize: 20 }} />
              <div>
                <Typography
                  variant="button"
                  sx={{ textTransform: "initial", fontSize: "16px" }}
                >
                  Questions
                </Typography>
              </div>
            </TabButton>
            <TabButton
              active={currentTab === "DESIGN"}
              onClick={() => handleChangeTab("DESIGN")}
            >
              <ColorLensIcon mr={10} sx={{ fontSize: 20 }} />
              <div>
                <Typography
                  variant="button"
                  sx={{ textTransform: "initial", fontSize: "16px" }}
                >
                  Design
                </Typography>
              </div>
            </TabButton>
          </SurveyHeadSelectionWrapper>
          <Button variant="outlined" sx={{ margin: "10px 0" }}>
            <Typography
              variant="button"
              sx={{ textTransform: "initial", fontSize: "16px" }}
            >
              Preview
            </Typography>
          </Button>
        </HeaderContainer>
      </SurveyHeadSection>
      {children}
    </>
  );
}
