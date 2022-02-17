import React, { useState, useEffect } from "react";

import { toast } from "react-toastify";

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
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";

import DashboardH from "../../components/dashboard/DashboardHeader";

import person from "../../images/svg/person.svg";
import Delete from "@mui/icons-material/Delete";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

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
  width: "100%",
});

const Left = styled("div")({
  display: "flex",
  width: "80%",
});

const Edit = styled("div")({
  display: "flex",
  justifyContent: "flex-end",
  width: "20%",
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
  const [open, setOpen] = useState(false);
  const [surveys, setMySurveys] = useState([]);
  const [page, setPage] = useState(1);

  const handleChange = (event, value) => {
    setPage(value);
    getSurveyTypes(value);
  };

  useEffect(() => {
    getSurveyTypes(page);
  }, []);

  const handleClose = () => {
    setOpen(false);
  };

  const getSurveyTypes = (page) => {
    surveyService
      .get_my_surveys(page)
      .then((res) => {
        setMySurveys(res.data);
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
          <Typography variant="h4">My Surveys</Typography>
        </DashboardHeader>
        <GridContainer container spacing={5}>
          {surveys.length ? (
            surveys.map((survey, index) => (
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
                    <Typography minHeight={50} variant="body2">
                      {survey.welcome_text}
                    </Typography>
                    <Response>
                      <Left>
                        <Logo src={person} width="14" alt="person" />
                        <Text>2 responses</Text>
                      </Left>
                      <Edit>Edit</Edit>
                    </Response>
                  </CardContent>
                </SurveyCard>
              </Grid>
            ))
          ) : (
            <Grid item>
              {" "}
              <h3>No Surveys created</h3>
            </Grid>
          )}
        </GridContainer>

        {surveys && surveys.length ? (
          <Grid marginTop={5} display={"flex"} justifyContent={"flex-end"}>
            <Pagination
              count={5}
              page={page}
              onChange={handleChange}
              renderItem={(item) => (
                <PaginationItem
                  components={{
                    previous: ArrowBackIcon,
                    next: ArrowForwardIcon,
                  }}
                  {...item}
                />
              )}
            />
          </Grid>
        ) : (
          ""
        )}
      </FullBackground>
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
    </>
  );
}
