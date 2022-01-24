import * as React from "react";

import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import Header from "../../components/Header";

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

const card = (
  <React.Fragment>
    <CardContent>
      <Typography variant="h4" component="div">
        Slack Usability Testing Survey 2021
      </Typography>
      <Typography variant="body2">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do et
        dolore magna aliqua. Amet facilisis magna etiam tempor orci.
      </Typography>
    </CardContent>
    <CardActions>
      <Button size="small">Learn More</Button>
    </CardActions>
  </React.Fragment>
);

export default function Index() {
  return (
    <>
      <Header />
      <FullBackground maxWidth="lg">
        <DashboardHeader>
          <Typography variant="h4">All Surveys</Typography>
        </DashboardHeader>
        <GridContainer container spacing={5}>
          <Grid item md={4}>
            <Card variant="outlined">{card}</Card>
          </Grid>
          <Grid item md={4}>
            <Card variant="outlined">{card}</Card>
          </Grid>
          <Grid item md={4}>
            <Card variant="outlined">{card}</Card>
          </Grid>
        </GridContainer>
        <GridContainer container spacing={5}>
          <Grid item md={4}>
            <Card variant="outlined">{card}</Card>
          </Grid>
          <Grid item md={4}>
            <Card variant="outlined">{card}</Card>
          </Grid>
          <Grid item md={4}>
            <Card variant="outlined">{card}</Card>
          </Grid>
        </GridContainer>
        <GridContainer container spacing={5}>
          <Grid item md={4}>
            <Card variant="outlined">{card}</Card>
          </Grid>
          <Grid item md={4}>
            <Card variant="outlined">{card}</Card>
          </Grid>
          <Grid item md={4}>
            <Card variant="outlined">{card}</Card>
          </Grid>
        </GridContainer>
      </FullBackground>
    </>
  );
}
