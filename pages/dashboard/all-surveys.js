import React, { useState, useEffect } from "react";

import { toast } from "react-toastify";
import get from "lodash.get";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

import Image from "next/image";

import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Pagination from "@mui/material/Pagination";
import ButtonGroup from "@mui/material/ButtonGroup";

// common components
import DashboardH from "../../components/dashboard/DashboardHeader";
import NoSurveyScreen from "../../components/survey/NoSurveyScreen";
import ConfirmationDialog from "../../components/ConfirmationDialog";
import DashboardSubHeader from "../../components/dashboard/DashboardSubHeader";

// icons
import person from "../../images/svg/person.svg";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

import { surveyService } from "../../services/survey.service";
import { useDispatchSurvey, useSurvey } from "../../context/SurveyState";

import styled from "@emotion/styled";

const FullBackground = styled(Container)(({ theme }) => ({
  height: "100vh",
}));

const GridContainer = styled(Grid)(({ theme }) => ({
  marginTop: theme.spacing(1),
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

export default function Index() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [surveys, setAllSurveys] = useState([]);
  const [page, setPage] = useState(1);
  const [count, setSurveyCount] = useState(0);
  const { data: session } = useSession();

  const dispatch = useDispatchSurvey();
  const survey = useSurvey();

  const handleChange = (event, value) => {
    setPage(value);
    getSurveyTypes(value);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (!session) {
      router.push("/login");
    }
    dispatch({ type: "RESET_SURVEY" });
    getSurveyTypes(1);
    getSurveysCount();
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

  const getSurveysCount = () => {
    surveyService
      .get_surveys_count("all")
      .then((res) => {
        const count = Math.ceil(res.data / 9);
        setSurveyCount(count);
      })
      .catch((error) => {
        toast.error(error.message, {
          position: toast.POSITION.TOP_RIGHT,
        });
      });
  };

  return (
    <>
      <DashboardH></DashboardH>
      <FullBackground maxWidth="lg">
        <DashboardSubHeader title={"All Surveys"} />
        <GridContainer container spacing={5}>
          {surveys.length ? (
            surveys.map((survey, index) => (
              <Grid key={survey.survey_id} item md={4}>
                <SurveyCard variant="outlined">
                  <CardContent>
                    <CardTitle>
                      <CardHead>{survey.survey_title}</CardHead>
                      <CardIconContainer>
                        {/* <CardIcon onClick={deleteSurvey}>
                          <Delete />
                        </CardIcon> */}
                      </CardIconContainer>
                    </CardTitle>
                    <Response>
                      <Left>
                        <Logo src={person} width="14" alt="person" />
                        <Text>{survey.responses} responses</Text>
                      </Left>
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
              variant="outlined"
              shape="rounded"
              count={count}
              page={page}
              size="large"
              onChange={handleChange}
              renderItem={(item) =>
                ["previous", "next"].includes(item.type) ? (
                  <Button
                    variant="outlined"
                    onClick={item.onClick}
                    disabled={item.disabled}
                  >
                    {item.type === "previous" ? "Prev" : "Next"}
                  </Button>
                ) : (
                  <ButtonGroup
                    sx={{
                      marginLeft: `${item.page === 1 && "20px"}`,
                      marginRight: `${item.page === count && "20px"}`,
                    }}
                  >
                    {item.type === "page" ? (
                      <Button
                        variant={item.selected ? "contained" : "text"}
                        sx={{ backgroundColor: !item.selected && "#f4f5f8" }}
                        onClick={item.onClick}
                        disabled={item.disabled}
                      >
                        {item.page}
                      </Button>
                    ) : (
                      <MoreHorizIcon />
                    )}
                  </ButtonGroup>
                )
              }
            />
          </Grid>
        ) : (
          ""
        )}

        <ConfirmationDialog
          status={open}
          title="Delete Survey?"
          message="Are you sure you want to delete your survey?"
          handleReject={handleClose}
          handleAccept={handleClose}
        />
      </FullBackground>
    </>
  );
}
