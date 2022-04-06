import React, { useEffect, useState } from "react";

import { toast } from "react-toastify";

import dayjs from "dayjs";
import get from "lodash.get";

import { useRouter } from "next/router";

import { DateRangePicker } from "materialui-daterange-picker";

import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import Button from "@mui/material/Button";

import Layout from "../../../components/Layout";
import SurveyHeader from "../../../components/survey/SurveyHeader";
import BreadCrumbs from "../../../components/survey/BreadCrumbs";
import BreadCrumbHeader from "../../../components/survey/BreadCrumbHeader";

import styled from "@emotion/styled";

import { useSurvey } from "../../../context/SurveyState";
import { surveyService } from "../../../services/survey.service";
import { TextField } from "@mui/material";

const StyledContainer = styled("div")({
  width: "100%",
  height: "238px",
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
const DateWrapper = styled("div")({
  position: "absolute",
  top: "275px",
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
  const [datePickerStatus, setDatePickerStatus] = useState(false);
  const [date, setDate] = useState({
    startDate: dayjs().subtract(7, "days").startOf("day").toDate(),
    endDate: dayjs().endOf("day").toDate(),
    key: "selection",
  });

  const dateShortcuts = [
    {
      label: "Today",
      startDate: dayjs().startOf("day").toDate(),
      endDate: dayjs().endOf("day").toDate(),
    },
    {
      label: "Yesterday",
      startDate: dayjs().subtract(1, "days").startOf("day").toDate(),
      endDate: dayjs().subtract(1, "days").endOf("day").toDate(),
    },
    {
      label: "Last 7 days",
      startDate: dayjs().subtract(7, "days").startOf("day").toDate(),
      endDate: dayjs().endOf("day").toDate(),
    },
    {
      label: "Last 30 days",
      startDate: dayjs().subtract(30, "days").startOf("day").toDate(),
      endDate: dayjs().endOf("day").toDate(),
    },
  ];

  const toggle = () => {
    setDatePickerStatus(false);
  };
  const handleDateFormat = (dateRange) => {
    return `${dayjs(dateRange.startDate).format("DD MMM YYYY")} - ${dayjs(
      dateRange.endDate
    ).format("DD MMM YYYY")}`;
  };

  const handleDateChange = async (item) => {
    setDatePickerStatus(false);
    setDate(item);
    const surveyCount = await surveyService.getSurveyResponseCount({
      start_date: dayjs(item.startDate).startOf("day").toDate(),
      end_date: dayjs(item.endDate).endOf("day").toDate(),
    });

    const surveyCountJson = await surveyCount.data;
    setReportData(surveyCountJson);

    const surveySentiment = await surveyService.getSurveySentiment(
      survey.surveyEditId,
      {
        start_date: dayjs(item.startDate).startOf("day").toDate(),
        end_date: dayjs(item.endDate).endOf("day").toDate(),
      }
    );
    const surveySentimentJson = await surveySentiment.data;
    setSentimentData(surveySentimentJson);
  };

  useEffect(() => {
    let isSubscribed = true;
    // fetch Survey response count
    const fetchSurveyReportData = async () => {
      const res = await surveyService.getSurveyResponseCount({
        start_date: date.startDate,
        end_date: date.endDate,
      });
      const json = await res.data;
      if (isSubscribed) {
        setReportData(json);
      }
    };

    fetchSurveyReportData().catch((error) => {
      toast.error(error, {
        position: toast.POSITION.TOP_RIGHT,
      });
    });

    let fetchedSentiment = true;
    // fetch Sentiment Count
    const fetchSentimentData = async () => {
      const res = await surveyService.getSurveySentiment(survey.surveyEditId, {
        start_date: date.startDate,
        end_date: date.endDate,
      });
      const json = await res.data;
      if (fetchedSentiment) {
        setSentimentData(json);
      }
    };

    fetchSentimentData().catch((error) => {
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
            <Grid item xs={12} sm={6}>
              <Typography mt={3}>Choose Date Filter</Typography>
              <TextField
                onClick={() => setDatePickerStatus(true)}
                disabled
                fullWidth
                placeholder="date"
                value={handleDateFormat(date)}
              ></TextField>
              <DateWrapper>
                <DateRangePicker
                  open={datePickerStatus}
                  toggle={toggle}
                  initialDateRange={date}
                  onChange={handleDateChange}
                  definedRanges={dateShortcuts}
                />
              </DateWrapper>
            </Grid>
            <Grid item xs={12} sm={6}></Grid>
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
