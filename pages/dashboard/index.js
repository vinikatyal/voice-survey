import React, { useState, useEffect } from "react";

import { toast } from "react-toastify";

import { useRouter } from "next/router";

import Image from "next/image";

import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
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
import NoSurveyScreen from "../../components/survey/NoSurveyScreen";

import person from "../../images/svg/person.svg";
import Delete from "@mui/icons-material/Delete";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import EditIcon from "@mui/icons-material/Edit";

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

const CardTitle = styled("div")({
  width: "100%",
  fontSize: "16px",
  fontWeight: 600,
  display: "flex",
  alignItems: "center",
});

const CardHead = styled("div")({
  width: "90%",
  fontSize: "20px",
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

const Edit = styled(Button)({
  fontSize: "16px",
  padding: "5px",
  display: "flex",
  justifyContent: "center",
  color: "#9a9cb5",
  width: "20%",
  borderRadius: "4px",
  backgroundColor: "rgba(85, 109, 242, 0.04)",
  "&:hover": {
    backgroundColor: "#4e538!important",
    color: "#0a23fb",
  },
});

const Logo = styled(Image)(({}) => ({}));

const Text = styled("div")({
  marginLeft: "6px",
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
  const [page, setPage] = useState(1);

  const handleChange = (event, value) => {
    setPage(value);
    getSurveyTypes(value);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    getSurveyTypes(1);
  }, []);

  const getSurveyTypes = (page) => {
    surveyService
      .get_all_surveys(page)
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
                    <Response>
                      <Left>
                        <Logo src={person} width="14" alt="person" />
                        <Text>2 responses</Text>
                      </Left>
                      <Edit
                        disableRipple
                        disableElevation
                        startIcon={<EditIcon />}
                      >
                        Edit
                      </Edit>
                    </Response>
                  </CardContent>
                </SurveyCard>
              </Grid>
            ))
          ) : (
            <Grid item>
              <NoSurveyScreen />
            </Grid>
          )}
        </GridContainer>

        {surveys && surveys.length ? (
          <Grid marginTop={5} display={"flex"} justifyContent={"center"}>
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
