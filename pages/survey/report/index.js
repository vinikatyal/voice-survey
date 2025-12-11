import React, { useEffect, useState } from "react";

import { useSession } from "next-auth/react";
import { toast } from "react-toastify";

import dynamic from "next/dynamic";
import dayjs from "dayjs";
import get from "lodash.get";

import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import { useRouter } from "next/router";

// import { DateRangePicker } from "materialui-daterange-picker";

import TextField from "@mui/material/TextField";
import LinearProgress from "@mui/material/LinearProgress";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import Button from "@mui/material/Button";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

import Layout from "@/components/Layout";
import SurveyHeader from "@/components/survey/SurveyHeader";
import BreadCrumbs from "@/components/survey/BreadCrumbs";
import BreadCrumbHeader from "@/components/survey/BreadCrumbHeader";

import styled from "@emotion/styled";

import { useSurvey, useDispatchSurvey } from "@/context/SurveyState";
import { surveyService } from "@/services/survey.service";

import { objectifyAndSlice, objectify } from "@/helpers/constants";

const StyledContainer = styled("div")({
  minHeight: "240px",
  width: "100%",
  padding: "20px 20px 21px",
  objectFit: "contain",
  borderRadius: "8px",
  border: "solid 1px #d1d1d1",
  backgroundColor: "#fff",
  overflow: "hidden",
});

const DateWrapper = styled("div")({
  position: "absolute",
  top: "275px",
});

const CrumbButton = styled(Button)({
  marginRight: "8px",
});

const SentimentDivPer = styled("div")({});

const NoData = styled("div")({
  padding: "16px",
  width: "100%",
});

const StaticsProgress = ({ value, staticTitle }) => (
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
        <Grid item xs={12} sm={9}>
          <LinearProgress variant="determinate" value={value} />
        </Grid>
        <Grid item xs={12} sm={3}>
          <Typography>{value.toFixed(2)}%</Typography>
        </Grid>
      </Grid>
    </Grid>
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
          {value}
        </Grid>
      </Grid>
    </Grid>
  </React.Fragment>
);

export default function report() {
  const ReactWordcloud = dynamic(() => import("react-wordcloud"), {
    ssr: false,
  });
  const router = useRouter();
  const { data: session, status } = useSession();

  const survey = useSurvey();
  const dispatch = useDispatchSurvey();

  const [reportData, setReportData] = useState({});
  const [surveyData, setSurveyData] = useState({});
  const [datePickerStatus, setDatePickerStatus] = useState(false);
  const [loading, setLoading] = useState(true);
  const [loadingSurvey, setLoadingSurvey] = useState(true);

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
    {
      label: "Lifetime",
      startDate: get(
        survey,
        "surveyCreatedDate",
        dayjs().subtract(30, "days").startOf("day").toDate()
      ),
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
    setLoading(true);
    setDatePickerStatus(false);
    const start_date = dayjs(item.startDate).startOf("day").toDate();
    const end_date = dayjs(item.endDate).endOf("day").toDate();

    dispatch({ type: "SET_START_DATE", value: start_date });
    dispatch({ type: "SET_END_DATE", value: end_date });

    if (get(survey, "surveyEditId")) {
      const surveyCount = await surveyService.getSurveyResponseCount(
        survey.surveyEditId,
        {
          start_date,
          end_date,
        }
      );

      const surveyCountJson = await surveyCount.data;
      setReportData(surveyCountJson);

      dispatch({ type: "SET_REPORT_STATS", value: surveyCountJson });

      const surveyAnalytics = await surveyService.getSurveyLevelAnalytics(
        survey.surveyEditId,
        {
          start_date: start_date,
          end_date: end_date,
        }
      );
      const surveyAnalyticsJson = await surveyAnalytics.data;
      setSurveyData(surveyAnalyticsJson);

      setLoading(false);
    }
  };

  useEffect(() => {
    const abortController = new AbortController();
    if (!survey.surveyEditId) router.push("/dashboard");
    if (status === "loading") return;
    else if (status === "unauthenticated") {
      router.push("/login");
      return;
    }
    let isSubscribed = true;
    // fetch Survey response count
    const fetchSurveyReportData = async () => {
      const res = await surveyService.getSurveyResponseCount(
        survey.surveyEditId,
        {
          start_date: survey.startDate,
          end_date: survey.endDate,
        }
      );
      const json = await res.data;

      dispatch({ type: "SET_REPORT_STATS", value: json });
      if (isSubscribed) {
        setReportData(json);
      }
    };

    fetchSurveyReportData().catch((error) => {
      toast.error(error, {
        position: toast.POSITION.TOP_RIGHT,
      });
      setLoading(false);
    });

    setLoadingSurvey(true);

    let fetchedSurveyStats = true;
    // fetch Sentiment Count
    const fetchSurveyStats = async () => {
      const res = await surveyService.getSurveyLevelAnalytics(
        survey.surveyEditId,
        {
          start_date: survey.startDate,
          end_date: survey.endDate,
        }
      );
      const json = await res.data;
      if (fetchedSurveyStats) {
        setSurveyData(json);
      }
      setLoadingSurvey(false);
      setLoading(false);
    };

    fetchSurveyStats().catch((error) => {
      toast.error(error, {
        position: toast.POSITION.TOP_RIGHT,
      });
      setLoadingSurvey(false);
      setLoading(false);
    });

    return () => (
      abortController.abort(),
      (isSubscribed = false),
      (fetchedSurveyStats = false)
    );
  }, [status]);

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
              <>
                <CrumbButton
                  variant="contained"
                  size="small"
                  onClick={() => router.push("/survey/report/questions")}
                >
                  Question Wise Summary
                </CrumbButton>
                <CrumbButton
                  variant="contained"
                  size="small"
                  onClick={() => router.push("/survey/report/responses")}
                >
                  View All Response
                </CrumbButton>
              </>
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
                value={handleDateFormat({
                  startDate: survey.startDate,
                  endDate: survey.endDate,
                })}
              ></TextField>
              <DateWrapper>
                {/* <DateRangePicker
                  open={datePickerStatus}
                  toggle={toggle}
                  initialDateRange={{
                    startDate: survey.startDate,
                    endDate: survey.endDate,
                  }}
                  onChange={handleDateChange}
                  definedRanges={dateShortcuts}
                /> */}
              </DateWrapper>
            </Grid>
            <Grid item xs={12} sm={6}></Grid>
            <Grid item xs={12} sm={4}>
              {loading ? (
                <SkeletonTheme
                  baseColor="#e6e8ed"
                  highlightColor="#f7f7f7"
                  height="240px"
                >
                  <Skeleton count={1} />
                </SkeletonTheme>
              ) : (
                <StyledContainer>
                  <Typography variant="h4">Completion rate</Typography>
                  <StaticsProgress
                    value={get(reportData, "completion_rate.completed_rate", 0)}
                    staticTitle="Completed"
                  />
                  <StaticsProgress
                    progressValue={get(
                      reportData,
                      "completion_rate.drop_off_rate",
                      0
                    )}
                    value={get(reportData, "completion_rate.drop_off_rate", 0)}
                    staticTitle="Dropped"
                  />
                </StyledContainer>
              )}
            </Grid>
            <Grid item xs={12} sm={4}>
              {loading ? (
                <SkeletonTheme
                  baseColor="#e6e8ed"
                  highlightColor="#f7f7f7"
                  height="240px"
                >
                  <Skeleton count={1} />
                </SkeletonTheme>
              ) : (
                <StyledContainer>
                  <Typography variant="h4">Survey Statistics</Typography>
                  <Statics
                    value={get(reportData, "total_viewed_surveys", 0)}
                    staticTitle="Viewed"
                  />
                  <Statics
                    value={get(reportData, "total_completed_count", 0)}
                    staticTitle="Completed"
                  />
                </StyledContainer>
              )}
            </Grid>

            <Grid item xs={12} sm={4}>
              {loading ? (
                <SkeletonTheme
                  baseColor="#e6e8ed"
                  highlightColor="#f7f7f7"
                  height="240px"
                >
                  <Skeleton count={1} />
                </SkeletonTheme>
              ) : (
                <StyledContainer>
                  <Typography variant="h4" mb={1}>
                    Survey Sentiments
                  </Typography>
                  <SentimentDivPer>
                    Positive Responses{" "}
                    {get(surveyData, "sentiment_res.positive", 0)}%
                  </SentimentDivPer>

                  <SentimentDivPer>
                    Negative Responses{" "}
                    {get(surveyData, "sentiment_res.negative", 0)}%
                  </SentimentDivPer>
                  <SentimentDivPer>
                    Neutral Responses{" "}
                    {get(surveyData, "sentiment_res.neutral", 0)}%
                  </SentimentDivPer>
                </StyledContainer>
              )}
            </Grid>
          </Grid>
          <Grid container spacing={2} mt={2}>
            <Grid item xs={12} sm={6}>
              {loading ? (
                <SkeletonTheme
                  baseColor="#e6e8ed"
                  highlightColor="#f7f7f7"
                  height="240px"
                >
                  <Skeleton count={1} />
                </SkeletonTheme>
              ) : (
                <StyledContainer>
                  <Typography variant="h4" mb={2}>
                    Emotions
                  </Typography>
                  <TableContainer sx={{ maxHeight: 240 }}>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell align="left">Emotion</TableCell>
                          <TableCell align="left">Occurences</TableCell>
                        </TableRow>
                      </TableHead>

                      <TableBody
                        sx={{ backgroundColor: "#f8f9fd", cursor: "pointer" }}
                      >
                        {!get(surveyData, "emotion_res") && (
                          <TableRow>
                            <NoData>No Data</NoData>
                          </TableRow>
                        )}
                        {get(surveyData, "emotion_res") &&
                          Object.keys(get(surveyData, "emotion_res")).length >
                            0 &&
                          Object.keys(get(surveyData, "emotion_res")).map(
                            (phrase) => (
                              <TableRow key={phrase}>
                                <TableCell align="left">{phrase}</TableCell>
                                <TableCell align="left">
                                  {surveyData.emotion_res[phrase]}
                                </TableCell>
                              </TableRow>
                            )
                          )}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </StyledContainer>
              )}
            </Grid>
            <Grid item xs={12} sm={6}>
              {loading ? (
                <SkeletonTheme
                  baseColor="#e6e8ed"
                  highlightColor="#f7f7f7"
                  height="240px"
                >
                  <Skeleton count={1} />
                </SkeletonTheme>
              ) : (
                <StyledContainer>
                  <Typography variant="h4" mb={2}>
                    Key phrases
                  </Typography>
                  <TableContainer sx={{ maxHeight: 240 }}>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell align="left">Keywords</TableCell>
                          <TableCell align="left">Occurences</TableCell>
                        </TableRow>
                      </TableHead>

                      <TableBody
                        sx={{ backgroundColor: "#f8f9fd", cursor: "pointer" }}
                      >
                        {!get(surveyData, "survey_responses[0].key_phrases", [])
                          .length && (
                          <TableRow>
                            <NoData>No results</NoData>
                          </TableRow>
                        )}
                        {get(surveyData, "survey_responses[0].key_phrases", [])
                          .length > 0 &&
                          objectify(
                            get(
                              surveyData,
                              "survey_responses[0].key_phrases",
                              []
                            )
                          ).map((phrase, index) => (
                            <TableRow key={index}>
                              <TableCell align="left">{phrase.text}</TableCell>
                              <TableCell align="left">{phrase.value}</TableCell>
                            </TableRow>
                          ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </StyledContainer>
              )}
            </Grid>
            <Grid item xs={12} sm={6}>
              {loading ? (
                <SkeletonTheme
                  baseColor="#e6e8ed"
                  highlightColor="#f7f7f7"
                  height="240px"
                >
                  <Skeleton count={1} />
                </SkeletonTheme>
              ) : (
                <StyledContainer>
                  <Typography variant="h4" mb={2}>
                    Key phrases
                  </Typography>
                  {get(surveyData, "survey_responses[0].key_phrases") && (
                    <ReactWordcloud
                      options={{
                        enableTooltip: true,
                        deterministic: true,
                        fontStyle: "normal",
                        fontWeight: "normal",
                        padding: 1,
                        rotations: 3,
                        rotationAngles: [0, 0],
                        scale: "sqrt",
                        spiral: "archimedean",
                        transitionDuration: 1000,
                        fontFamily:
                          '"Poppins", -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji"',
                        fontSizes: [16, 30],
                      }}
                      words={objectifyAndSlice(
                        get(surveyData, "survey_responses[0].key_phrases", [])
                      )}
                    />
                  )}
                </StyledContainer>
              )}
            </Grid>
          </Grid>
        </Container>
      </SurveyHeader>
    </Layout>
  );
}
