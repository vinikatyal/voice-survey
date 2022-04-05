import React, { useEffect, useState } from "react";

import { toast } from "react-toastify";

import dayjs from "dayjs";
import get from "lodash.get";

import { useRouter } from "next/router";

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

const Statics = ({ value, progressValue, staticTitle }) => (
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
          {value}
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
  const [date, setDate] = useState([
    {
      startDate: dayjs().subtract(7, "days").toDate(),
      endDate: dayjs().toDate(),
      key: "selection",
    },
  ]);

  const handleDateChange = async (item) => {
    setDate([item.selection]);
    const res = await surveyService.getSurveyResponseCount({
      start_date: item.selection.startDate,
      end_date: item.selection.endDate,
    });

    const json = await res.data;
    setReportData(json);
  };

  const fetchSurveyReportData = async (startDate, endDate) => {};

  useEffect(() => {
    // redirect to home if already logged in
    let isSubscribed = true;
    // declare the async data fetching function
    const fetchSurveyReportData = async () => {
      // get the data from the api
      const res = await surveyService.getSurveyResponseCount({
        start_date: date[0].startDate,
        end_date: date[0].endDate,
      });
      //   const res1 = await surveyService.getSurveySentiment(survey.surveyEditId, {
      //     start_date: date[0].startDate,
      //     end_date: date[0].endDate,
      //   });
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
        start_date: date[0].startDate,
        end_date: date[0].endDate,
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

  const handleProgress = (progressValue) => {
    if (progressValue > 100)
      return (progressValue / (progressValue + 100)) * 100;
    return progressValue;
  };

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
                onChange={handleDateChange}
                showSelectionPreview={true}
                moveRangeOnFirstSelection={false}
                months={2}
                ranges={date}
                direction="horizontal"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <StyledContainer>
                <Typography variant="h4">Survey Statistics</Typography>
                <Statics
                  progressValue={handleProgress(
                    get(reportData, "total_viewed_surveys", 0)
                  )}
                  value={get(reportData, "total_viewed_surveys", 0)}
                  staticTitle="Viewed"
                />
                <Statics
                  progressValue={handleProgress(
                    get(reportData, "total_completed_count", 0)
                  )}
                  value={get(reportData, "total_completed_count", 0)}
                  staticTitle="Completed"
                />
              </StyledContainer>
            </Grid>
            <Grid item xs={12} sm={6}>
              <StyledContainer>
                <Typography variant="h4">Survey Sentiment</Typography>
                <StyledSentimentContainer>
                  <Sentiment
                    value={get(sentimentData, "positive", 0)}
                    sentimentTitle="Positive"
                    sentimentEmoji="😀"
                    progressColor="success"
                  />
                  <Sentiment
                    value={get(sentimentData, "negative", 0)}
                    sentimentTitle="Negative"
                    sentimentEmoji="🙁"
                    progressColor="error"
                  />
                  <Sentiment
                    value={get(sentimentData, "neutral", 0)}
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
