import React, { useEffect, useState } from "react";

import dayjs from "dayjs";
import get from "lodash.get";
import { toast } from "react-toastify";

import { useRouter } from "next/router";

import Container from "@mui/material/Container";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Chip from "@mui/material/Chip";
import Typography from "@mui/material/Typography";

import Layout from "../../../../components/Layout";
import SurveyHeader from "../../../../components/survey/SurveyHeader";
import BreadCrumbHeader from "../../../../components/survey/BreadCrumbHeader";
import BreadCrumbs from "../../../../components/survey/BreadCrumbs";

import { surveyService } from "../../../../services/survey.service";

import { useDispatchSurvey, useSurvey } from "../../../../context/SurveyState";

import styled from "@emotion/styled";

const StyledTableContainer = styled(TableContainer)({
  boxShadow: " 0 2px 6px 0 rgba(113, 125, 129, 0.16)",
  border: "solid 1px #dcdcdc",
  borderRadius: "8px",
  marginTop: "40px",
});

const SingleSentiment = styled("div")({
  position: "relative",
  display: "flex",
  alignItems: "center",
});

const SentimentChip = styled(Chip)({
  color: "#fff",
});

const Unique = styled("div")({
  color: "blue",
});
const Sentiment = ({ sentimentTitle }) => (
  <React.Fragment>
    <SingleSentiment>
      <Typography fontSize={30} mr={1}>
        {sentimentTitle === "Positive"
          ? "😀"
          : sentimentTitle === "Negative"
          ? "🙁"
          : "🙄"}
      </Typography>
      <SentimentChip
        label={sentimentTitle}
        color={
          sentimentTitle === "Positive"
            ? "success"
            : sentimentTitle === "Negative"
            ? "error"
            : "warning"
        }
      />
    </SingleSentiment>
  </React.Fragment>
);

export default function index() {
  const survey = useSurvey();
  const router = useRouter();
  const [reportData, setReportData] = useState([]);
  const dispatch = useDispatchSurvey();
  useEffect(() => {
    // redirect to home if already logged in
    let isSubscribed = true;
    // declare the async data fetching function
    const fetchSurveyReportData = async () => {
      // get the data from the api
      console.log(survey);
      const res = await surveyService.getSurveyResults(survey.surveyEditId, {
        start_date: survey.startDate,
        end_date: survey.endDate,
      });

      const data = res.data;

      if (isSubscribed) {
        dispatch({ type: "SET_REPORT_DATA", value: data });
        setReportData(data);
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

    return () => (isSubscribed = false);
  }, []);

  console.log(reportData);
  return (
    <Layout>
      <SurveyHeader
        headerTitle={survey.surveyTitle}
        backRoute="/survey/report"
        currentTab="REPORT"
      >
        <Container maxWidth="lg">
          <BreadCrumbHeader>
            <BreadCrumbs
              breadCrumbsList={[
                {
                  title: "All Response",
                  active: true,
                  route: "/survey/report/responses",
                },
              ]}
            />
          </BreadCrumbHeader>
          <StyledTableContainer>
            <Table sx={{ minWidth: 650 }}>
              <TableHead>
                <TableRow>
                  <TableCell align="left">User</TableCell>
                  <TableCell align="left">Date Started</TableCell>
                  {/* <TableCell align="left">Key Sentiment</TableCell> */}
                </TableRow>
              </TableHead>

              <TableBody sx={{ backgroundColor: "#f8f9fd", cursor: "pointer" }}>
                {reportData &&
                  reportData.length &&
                  reportData.map((answer, index) => (
                    <TableRow
                      key={index}
                      onClick={() =>
                        router.push(
                          "/survey/report/responses/answers?id=" +
                            answer.unique_id
                        )
                      }
                    >
                      <TableCell align="left">
                        <Unique>{get(answer, "unique_id", "")}</Unique>
                      </TableCell>
                      <TableCell align="left">
                        {get(answer, "inserted_at", "")}
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </StyledTableContainer>
        </Container>
      </SurveyHeader>
    </Layout>
  );
}
