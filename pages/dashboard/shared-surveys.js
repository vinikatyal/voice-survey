import React, { useState, useEffect } from "react";

import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

import { toast } from "react-toastify";

import get from "lodash.get";

import Image from "next/image";

import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Pagination from "@mui/material/Pagination";
import ButtonGroup from "@mui/material/ButtonGroup";

import DashboardH from "../../components/dashboard/DashboardHeader";
import NoSurveyScreen from "../../components/survey/NoSurveyScreen";
import ConfirmationDialog from "../../components/ConfirmationDialog";
import DashboardSubHeader from "../../components/dashboard/DashboardSubHeader";
import DashboardLoader from "../../components/loaders/DashboardLoader";

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

const Logo = styled(Image)(({}) => ({}));

const Text = styled("div")({
  marginLeft: "4px",
});

const SurveyCard = styled(Card)({
  cursor: "pointer",
});

export default function Index() {
  const [open, setOpen] = useState(false);
  const [surveys, setMySurveys] = useState([]);
  const [page, setPage] = useState(1);
  const [count, setSurveyCount] = useState(0);
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState(true);

  const router = useRouter();
  const dispatch = useDispatchSurvey();
  const survey = useSurvey();

  const handleChange = (event, value) => {
    setPage(value);
    getSurveyTypes(value);
  };

  useEffect(() => {
    if (status === "loading") return;
    else if (status === "unauthenticated") {
      router.push("/login");
      return;
    }
    getSurveyTypes(page);
    getSurveysCount();
  }, [status]);

  const handleClose = () => {
    setOpen(false);
  };

  const getSurveyTypes = (page) => {
    surveyService
      .get_shared_surveys(page)
      .then((res) => {
        setMySurveys(res.data);
      })
      .catch((error) => {
        toast.error(error.message, {
          position: toast.POSITION.TOP_RIGHT,
        });
        setLoading(false);
      });
  };

  const getSurveysCount = () => {
    surveyService
      .get_surveys_count("guest")
      .then((res) => {
        const count = Math.ceil(res.data / 10);
        setSurveyCount(count);
        setLoading(false);
      })
      .catch((error) => {
        toast.error(error.message, {
          position: toast.POSITION.TOP_RIGHT,
        });
        setLoading(false);
      });
  };
  return (
    <>
      {loading ? (
        <DashboardLoader></DashboardLoader>
      ) : (
        <div>
          <DashboardH></DashboardH>
          <FullBackground maxWidth="lg">
            <DashboardSubHeader title={"Shared Surveys"} />
            <GridContainer container spacing={5}>
              {surveys.length ? (
                surveys.map((survey, index) => (
                  <Grid key={survey.survey_id} item md={4}>
                    <SurveyCard variant="outlined">
                      <CardContent>
                        <CardTitle>
                          <CardHead>{survey.survey_title}</CardHead>
                          <CardIconContainer></CardIconContainer>
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
                            sx={{
                              backgroundColor: !item.selected && "#f4f5f8",
                            }}
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
          </FullBackground>
          <ConfirmationDialog
            status={open}
            title="Delete Survey?"
            message="Are you sure you want to delete your survey?"
            handleReject={handleClose}
            handleAccept={handleClose}
          />
        </div>
      )}
    </>
  );
}
