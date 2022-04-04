import React, { useEffect, useState } from "react";

import { toast } from "react-toastify";

import { useRouter } from "next/router";

import { addDays } from "date-fns";
import { DateRangePicker } from "react-date-range";

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
import { surveyService } from "../../../services/survey.service";

import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file

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
          <Typography>{value}</Typography>
        </Grid>
      </Grid>
    </Grid>
  </React.Fragment>
);

export default function report() {
  const survey = useSurvey();
  const router = useRouter();

  const [reportData, setReportData] = useState({});
  const [sentimentData, setSentimentData] = useState({});
  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 7),
      key: "selection",
    },
  ]);

  const selectionRange = {
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  };

  useEffect(() => {
    // redirect to home if already logged in
    let isSubscribed = true;
    // declare the async data fetching function
    const fetchSurveyReportData = async () => {
      // get the data from the api
      const res = await surveyService.getSurveyResponseCount({
        start_date: "2022-01-01 00:00:00.566525+05:30",
        end_date: "2022-04-01 23:59:59.566525+05:30",
      });
      // convert the data to json
      const json = await res.data;

      if (isSubscribed) {
        setReportData(json);
      }
    };

    // call the function
    fetchSurveyReportData()
      // make sure to catch any error
      .catch((error) => {
        toast.error(error, {
          position: toast.POSITION.TOP_RIGHT,
        });
      });

    // redirect to home if already logged in
    let fetchedSentiment = true;
    // declare the async data fetching function
    const fetchSentimentData = async () => {
      // get the data from the api
      const id = "e79c9211fcb04285b3f1ed24600142fb_dev";
      const res = await surveyService.getSurveySentiment(id, {
        start_date: "2022-01-01 00:00:00.566525+05:30",
        end_date: "2022-04-01 23:59:59.566525+05:30",
      });
      // convert the data to json
      const json = await res.data;

      if (fetchedSentiment) {
        setSentimentData(json);
      }
    };

    // call the function
    fetchSentimentData()
      // make sure to catch any error
      .catch((error) => {
        toast.error(error, {
          position: toast.POSITION.TOP_RIGHT,
        });
      });

    return () => ((isSubscribed = false), (fetchedSentiment = false));
  }, []);

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
            <Grid item xs={12} sm={12}>
              <DateRangePicker
                onChange={(item) => setState([item.selection])}
                showSelectionPreview={true}
                moveRangeOnFirstSelection={false}
                months={2}
                ranges={state}
                direction="horizontal"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <StyledContainer>
                <Typography variant="h4">Survey Statistics</Typography>
                <Statics
                  value={reportData.total_viewed_surveys}
                  staticTitle="Viewed"
                />
                <Statics
                  value={reportData.total_completed_count}
                  staticTitle="Completed"
                />
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
