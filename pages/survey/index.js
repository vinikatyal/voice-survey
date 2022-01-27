import * as React from "react";

import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

import Layout from "../../components/Layout";
import SurveyHeader from "../../components/SurveyHeader";

// icons
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import ColorLensIcon from "@mui/icons-material/ColorLens";

import styled from "@emotion/styled";

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

const Label = styled("span")({
  color: "#707070",
  fontSize: "16px",
  fontWeight: "500",
});

export default function Index() {
  return (
    <Layout>
      <SurveyHeader></SurveyHeader>
      <SurveyHeadSection>
        <HeaderContainer maxWidth="lg">
          <SurveyHeadSelectionWrapper>
            <TabButton active={true}>
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
            <TabButton>
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

        <Container maxWidth="lg" sx={{ marginTop: "30px" }}>
          <Label>Welcome Text</Label>
          <TextField
            id="outlined-basic"
            placeholder="Enter your welcome text here"
            fullWidth
            variant="outlined"
          />
        </Container>
      </SurveyHeadSection>
    </Layout>
  );
}
