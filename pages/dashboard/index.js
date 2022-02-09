import * as React from "react";

// import fetcher from '../../hooks/api/fetcher'

import { useRouter } from "next/router";

import Image from "next/image";

import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import IconButton from "@mui/material/IconButton";

import DashboardH from "../../components/dashboard/DashboardHeader";
import StyledButton from "../../components/StyledButton";
import Header from "../../components/Header";

import Delete from "@mui/icons-material/Delete";
import logo from "../../images/logo.png";

import styled from "@emotion/styled";

const FullBackground = styled(Container)(({ theme }) => ({
  height: "100vh",
}));

const GridContainer = styled(Grid)(({ theme }) => ({
  marginTop: theme.spacing(1),
}));

const DashboardHeader = styled("div")(({ theme }) => ({
  height: "60px",
  padding: theme.spacing(2),
  backgroundColor: "#f5f8ff",
  marginTop: "30px",
}));

const BoxCustom = styled(Container)(({}) => ({
  width: "100%",
  display: "flex",
  alignItems: "center",
}));

const Nav = styled("div")(({}) => ({
  display: "flex",
  justifyContent: "flex-end",
  width: "90%",
  alignItems: "center",
}));

const NavLink = styled(Link)(({}) => ({
  color: "#707070",
  marginLeft: "20px",
  marginRight: "20px",
  textDecoration: "none",
  cursor: "pointer",
}));

const Logo = styled(Image)(({}) => ({
  height: "30px",
  display: "flex",
  justifyContent: "flex-start",
}));

const CardTitle = styled("div")({
  width: "100%",
  fontSize: "16px",
  fontWeight: 600,
  display: "flex",
  alignItems: "center",
});

const CardHead = styled("div")({
  width: "90%",
});

const CardIconContainer = styled("div")({
  width: "10%",
  display: "flex",
  alignItems: "start",
  justifyContent: "flex-end",
});

const CardIcon = styled(IconButton)({
  color: "#9a9cb5",
});

const Response = styled("div")({
  fontSize: "14px",
  fontWeight: 600,
  color: "#00063e",
  marginTop: "16px",
});

const SurveyCard = styled(Card)({
  cursor: "pointer",
});

const surveyData = [
  {
    id: "1",
    title: "CSAT",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do et",
    responses: 12,
  },
  {
    id: "2",
    title: "Teacher Feedback",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do et",
    responses: 12,
  },
  {
    id: "3",
    title: "PMF Survey",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do et",
    responses: 12,
  },
  {
    id: "4",
    title: "Course feedback",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do et",
    responses: 12,
  },
  {
    id: "5",
    title: "Customer feedback",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do et",
    responses: 12,
  },
  {
    id: "6",
    title: "Course feedback",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do et",
    responses: 12,
  },
];

export default function Index() {
  const router = useRouter();

  // const { data, error } = useSWR('/login', fetcher)

  const handleClickOpen = () => {
    router.push("/survey/create");
  };

  const handleSubmit = () => {};
  return (
    <>
      <DashboardH></DashboardH>
      <FullBackground maxWidth="lg">
        <DashboardHeader>
          <Typography variant="h4">All Surveys</Typography>
        </DashboardHeader>
        <GridContainer container spacing={5}>
          {surveyData.map((survey, index) => (
            <Grid key={index} item md={4}>
              <SurveyCard variant="outlined">
                <CardContent>
                  <CardTitle>
                    <CardHead>{survey.title}</CardHead>
                    <CardIconContainer>
                      <CardIcon>
                        <Delete />
                      </CardIcon>
                    </CardIconContainer>
                  </CardTitle>
                  <Typography variant="body2">{survey.description}</Typography>
                  <Response>{survey.responses} responses</Response>
                </CardContent>
              </SurveyCard>
            </Grid>
          ))}
        </GridContainer>
      </FullBackground>
    </>
  );
}
