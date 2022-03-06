import React from "react";

import { useRouter } from "next/router";

import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import LinearProgress from "@mui/material/LinearProgress";
import Button from "@mui/material/Button";

import Layout from "../../../components/Layout";
import SurveyHeader from "../../../components/survey/SurveyHeader";
import BreadCrumbs from "../../../components/survey/BreadCrumbs";
import BreadCrumbHeader from "../../../components/survey/BreadCrumbHeader";

import styled from "@emotion/styled";

import { useSurvey } from "../../../context/SurveyState";

const StyledContainer = styled("div")({
  width: "100%",
  height: "238px",
  margin: "30px 0",
  padding: "20px 20px 21px",
  objectFit: "contain",
  borderRadius: "8px",
  border: "solid 1px #d1d1d1",
  backgroundColor: "#fff",
});

const StyledSentimentContainer = styled("div")({
  display: "flex",
  marginTop: "29px",
  justifyContent: "space-between",
});

const SingleSentiment = styled("div")({
  position: "relative",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
});
const Emoji = styled("div")({
  position: "absolute",
  top: "13px",
});

const Sentiment = ({
  value,
  sentimentTitle,
  sentimentEmoji,
  progressColor,
}) => (
  <React.Fragment>
    <SingleSentiment>
      <CircularProgress
        variant="determinate"
        value={value}
        size={70}
        color={progressColor}
      />
      <Typography mt={2}>{sentimentTitle}</Typography>
      <Typography mt={1} variant="h5">
        {value}%
      </Typography>
      <Emoji>
        <Typography fontSize={30}>{sentimentEmoji}</Typography>
      </Emoji>
    </SingleSentiment>
  </React.Fragment>
);

const Statics = ({ value, staticTitle }) => (
  <React.Fragment>
    <Grid>
      <Typography mt={1}>{staticTitle}</Typography>
      <Grid
        container
        sx={{
          display: "flex",
          alignItems: "center",
          backgroundColor: "#F8F9FD",
          padding: "5px 0",
        }}
        columnSpacing={2}
      >
        <Grid item xs={12} sm={10}>
          <LinearProgress variant="determinate" value={value} />
        </Grid>
        <Grid item xs={12} sm={2}>
          <Typography>2637</Typography>
        </Grid>
      </Grid>
    </Grid>
  </React.Fragment>
);

export default function report() {
  const survey = useSurvey();
  const router = useRouter();

  return (
    <Layout>
      <SurveyHeader
        headerTitle={survey.surveyTitle}
        backRoute="/dashboard"
        currentTab="REPORT"
      >
        <Container maxWidth="lg">
          <BreadCrumbHeader
            component={
              <Button
                variant="contained"
                onClick={() => router.push("/survey/report/responses")}
              >
                View All Response
              </Button>
            }
          >
            <BreadCrumbs breadCrumbsList={[]} />
          </BreadCrumbHeader>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <StyledContainer>
                <Typography variant="h4">Survey Statistics</Typography>
                <Statics value={75} staticTitle="Viewed" />
                <Statics value={50} staticTitle="Opened" />
              </StyledContainer>
            </Grid>
            <Grid item xs={12} sm={6}>
              <StyledContainer>
                <Typography variant="h4">Survey Sentiment</Typography>
                <StyledSentimentContainer>
                  <Sentiment
                    value={75}
                    sentimentTitle="Positive"
                    sentimentEmoji="😀"
                    progressColor="success"
                  />
                  <Sentiment
                    value={50}
                    sentimentTitle="Negative"
                    sentimentEmoji="🙁"
                    progressColor="error"
                  />
                  <Sentiment
                    value={25}
                    sentimentTitle="Neutral"
                    sentimentEmoji="🙄"
                    progressColor="warning"
                  />
                </StyledSentimentContainer>
              </StyledContainer>
            </Grid>
          </Grid>
        </Container>
      </SurveyHeader>
    </Layout>
  );
}
