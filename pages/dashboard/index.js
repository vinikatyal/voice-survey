import React, { useState, useEffect } from "react";

import { useRouter } from "next/router";

import Image from "next/image";

import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import DashboardH from "../../components/dashboard/DashboardHeader";

import person from "../../images/svg/person.svg";
import Delete from "@mui/icons-material/Delete";

import { surveyService } from "../../services/survey.service";

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
  display: "flex",
  alignItems: "center",
  fontSize: "14px",
  fontWeight: 600,
  color: "#00063e",
  marginTop: "16px",
});

const Logo = styled(Image)(({}) => ({}));

const Text = styled("div")({
  marginLeft: "4px",
});

const SurveyCard = styled(Card)({
  cursor: "pointer",
});

const SuccessButton = styled(Button)(() => ({
  backgroundColor: "#19B885",
  "&:hover": {
    background: "#19B885",
  },
}));

export default function Index() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [surveys, setAllSurveys] = useState([]);

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    getSurveyTypes();
  }, []);

  const getSurveyTypes = () => {
    surveyService
      .get_all_surveys()
      .then((res) => {
        setAllSurveys(res.data);
      })
      .catch((error) => {
        toast.error(error.message, {
          position: toast.POSITION.TOP_RIGHT,
        });
      });
  };

  const deleteSurvey = () => {
    setOpen(true);
  };
  return (
    <>
      <DashboardH></DashboardH>
      <FullBackground maxWidth="lg">
        <DashboardHeader>
          <Typography variant="h4">All Surveys</Typography>
        </DashboardHeader>
        <GridContainer container spacing={5}>
          {surveys.map((survey, index) => (
            <Grid key={survey.survey_id} item md={4}>
              <SurveyCard variant="outlined">
                <CardContent>
                  <CardTitle>
                    <CardHead>{survey.survey_title}</CardHead>
                    <CardIconContainer>
                      <CardIcon onClick={deleteSurvey}>
                        <Delete />
                      </CardIcon>
                    </CardIconContainer>
                  </CardTitle>
                  <Typography variant="body2">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do et dolore magna aliqua. Amet facilisis magna etiam orci.
                  </Typography>
                  <Response>
                    <Logo src={person} width="14" alt="person" />
                    <Text>2 responses</Text>
                  </Response>
                </CardContent>
              </SurveyCard>
            </Grid>
          ))}
        </GridContainer>

        {open && (
          <Dialog
            open={open}
            onClose={handleClose}
            aria-describedby="alert-dialog-slide-description"
          >
            <DialogTitle>{"Delete Survey?"}</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-slide-description">
                Are you sure you want to delete your survey?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button size="medium" onClick={handleClose}>
                No
              </Button>
              <SuccessButton
                size="medium"
                variant="contained"
                disableElevation
                disableRipple
                onClick={handleClose}
              >
                Yes, Delete
              </SuccessButton>
            </DialogActions>
          </Dialog>
        )}
      </FullBackground>
    </>
  );
}
