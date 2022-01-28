import * as React from "react";

import Image from "next/image";

import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import RadioGroup from "@mui/material/RadioGroup";
import Radio from "@mui/material/Radio";

import ModalDialog from "../../components/ModalDialog";
import StyledButton from "../../components/StyledButton";
import Header from "../../components/Header";

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

const SurveyDialog = styled(ModalDialog)(({}) => ({
  width: "760px",
}));

const SurveyFormLabel = styled(FormLabel)(({ theme }) => ({
  marginBottom: "10px",
  marginTop: "10px",
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
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(!open);
  };

  const handleSubmit = () => {};
  return (
    <>
      <Header>
        <BoxCustom maxWidth="lg">
          <Logo src={logo} alt="background" />
          <Nav>
            <NavLink to="/" underline="hover">
              All Surveys
            </NavLink>
            <NavLink to="/about" underline="hover">
              My Surveys
            </NavLink>
            <NavLink to="/contact" underline="hover">
              Shared with me
            </NavLink>
            <NavLink to="/faq" underline="hover">
              Billing
            </NavLink>
            <NavLink to="/faq" underline="hover">
              Settings
            </NavLink>
            <StyledButton onClick={handleClickOpen}>New Survey</StyledButton>
          </Nav>
        </BoxCustom>
      </Header>
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
      <SurveyDialog
        title="Create a New Survey"
        isOpen={open}
        handleClose={handleClickOpen}
      >
        <Box component="form" noValidate onSubmit={handleSubmit}>
          <FormControl fullWidth>
            <SurveyFormLabel>Survey Title</SurveyFormLabel>
            <TextField
              multiline
              rows={4}
              placeholder="Please enter Survey Title"
            />
          </FormControl>
          <FormControl>
            <SurveyFormLabel id="demo-row-radio-buttons-group-label">
              Survey Type
            </SurveyFormLabel>
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
            >
              <FormControlLabel
                value="female"
                control={<Radio />}
                label="CSAT"
              />
              <FormControlLabel
                value="other"
                control={<Radio />}
                label="Teachers Feedback"
              />
              <FormControlLabel
                value="disabled"
                control={<Radio />}
                label="PMF Survey"
              />
            </RadioGroup>
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
            >
              <FormControlLabel
                value="female"
                control={<Radio />}
                label="CSAT"
              />
              <FormControlLabel
                value="other"
                control={<Radio />}
                label="Teachers Feedback"
              />
              <FormControlLabel
                value="disabled"
                control={<Radio />}
                label="PMF Survey"
              />
            </RadioGroup>
          </FormControl>
          <StyledButton>Create Survey</StyledButton>
        </Box>
      </SurveyDialog>
    </>
  );
}
