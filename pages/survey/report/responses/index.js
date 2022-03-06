import React from "react";

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

import { useSurvey } from "../../../../context/SurveyState";

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
                  <TableCell align="left">Data Completed</TableCell>
                  <TableCell align="left">Key Sentiment</TableCell>
                </TableRow>
              </TableHead>

              <TableBody sx={{ backgroundColor: "#f8f9fd", cursor: "pointer" }}>
                <TableRow
                  onClick={() =>
                    router.push("/survey/report/responses/answers?id=Brijesh")
                  }
                >
                  <TableCell align="left">Brijesh Kumar</TableCell>
                  <TableCell align="left">Lorem Ipsum dolor</TableCell>
                  <TableCell align="left">
                    <Sentiment sentimentTitle="Positive" />
                  </TableCell>
                </TableRow>
                <TableRow
                  onClick={() =>
                    router.push(
                      "/survey/report/responses/answers?id=Sachin Sharma"
                    )
                  }
                >
                  <TableCell align="left">Sachin Sharma</TableCell>
                  <TableCell align="left">Lorem Ipsum dolor</TableCell>
                  <TableCell align="left">
                    <Sentiment sentimentTitle="Negative" />
                  </TableCell>
                </TableRow>
                <TableRow
                  onClick={() =>
                    router.push(
                      "/survey/report/responses/answers?id=Rohit Prasad"
                    )
                  }
                >
                  <TableCell align="left">Rohit Prasad</TableCell>
                  <TableCell align="left">Lorem Ipsum dolor</TableCell>
                  <TableCell align="left">
                    <Sentiment sentimentTitle="Neutral" />
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </StyledTableContainer>
        </Container>
      </SurveyHeader>
    </Layout>
  );
}
