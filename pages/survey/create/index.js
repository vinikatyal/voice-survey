import React, { useState, useEffect } from "react";

import { useRouter } from "next/router";
import Image from "next/image";

import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import isEmpty from "lodash.isempty";
import { useForm } from "react-hook-form";
import Select from "react-select";

// material components
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import Radio from "@mui/material/Radio";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

// custom
import Layout from "../../../components/Layout";
import SurveyHeader from "../../../components/survey/SurveyHeader";
import StyledButton from "../../../components/StyledButton";

import { surveyService } from "../../../services/survey.service";
import { authService } from "../../../services/auth.service";

import styled from "@emotion/styled";
import { useDispatchSurvey, useSurvey } from "../../../context/SurveyState";

const GridContainer = styled(Grid)(({ theme }) => ({
  marginBottom: theme.spacing(2),
}));

const CreateSection = styled(Container)(({ theme }) => ({
  marginTop: theme.spacing(3),
  width: "100%",
}));

const CardTitle = styled("div")({
  width: "100%",
  fontSize: "16px",
  fontWeight: 600,
  display: "flex",
  alignItems: "center",
  marginBottom: "8px",
});

const CardHead = styled("div")({
  display: "flex",
  justifyContent: "space-between",
  width: "100%",
  fontWeight: 600,
  color: "#00063e",
});

const Title = styled("div")({
  width: "90%",
});

const RadioButtonSection = styled("div")({});

const ButtonContainer = styled("div")({
  display: "flex",
  justifyContent: "flex-end",
  alignItems: "center",
});

const CustomFormControl = styled(FormControl)({
  marginBottom: "20px",
});

const QuestionNumber = styled("div")({
  fontSize: "14px",
  fontWeight: 600,
  color: "#00063e",
  marginTop: "16px",
});

const ErrorLabel = styled("div")({
  color: "red",
});

const CustomSelect = styled(Select)({});

export default function Create() {
  const {
    register,
    handleSubmit,
    trigger,
    setValue,
    formState: { errors },
  } = useForm();
  const survey = useSurvey();
  const dispatch = useDispatchSurvey();

  const [selectedValue, setSelectedValue] = useState(
    survey.surveyType || "csat"
  );
  const [accessEmails, setAccessEmails] = useState([]);
  const [questionTypes, setQuestionTypes] = useState([]);
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  useEffect(() => {
    const abortController = new AbortController();
    setValue("survey_title", survey.surveyTitle, {
      shouldDirty: true,
    });

    return () => {
      abortController.abort();
    };
  }, [survey.surveyTitle]);

  useEffect(() => {
    dispatch({ type: "SET_TYPE", value: selectedValue });
  }, [selectedValue]);

  useEffect(() => {
    getTeamMembers();
    getSurveyTypes();
  }, []);

  const getSurveyTypes = () => {
    surveyService
      .get_survey_template_metadata()
      .then((res) => {
        const surveyTypes = res.data.map((survey) => ({
          name: survey.name,
          title: survey.name.split("_").map(capitalize).join(" "),
          description: survey.description,
          noOfQuestions: survey.no_of_ques,
        }));
        surveyTypes.push({
          name: "custom",
          title: "Custom Feedback",
          description: "Create Custom Survey",
          noOfQuestions: 1,
        });
        setQuestionTypes(surveyTypes);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
      });
  };

  const getTeamMembers = () => {
    authService
      .get_team_members()
      .then((res) => {
        const emails = res.data.map((item) => ({ value: item, label: item }));
        setAccessEmails(emails);
      })
      .catch((error) => {
        setLoading(false);
      });
  };

  function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  const onSubmit = async (data) => {
    router.push("/survey/create/questions", undefined, { shallow: true });
  };

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };
  return (
    <Layout>
      <SurveyHeader
        headerTitle="Create a New Survey"
        backRoute="/dashboard"
        currentTab="CREATE"
      >
        <CreateSection
          component="form"
          noValidate
          onSubmit={(e) => e.preventDefault()}
        >
          <CustomFormControl fullWidth>
            <FormLabel>Survey Title</FormLabel>
            <TextField
              required
              error={!isEmpty(errors.survey_title)}
              id="survey_title"
              name="survey_title"
              {...register("survey_title", {
                required: "Survey Name is required",
                onChange: async (e) => {
                  await trigger("survey_title");
                },
              })}
              placeholder="Please name your survey"
              onInput={(e) =>
                dispatch({ type: "SET_TITLE", value: e.target.value })
              }
            />
            {errors.survey_title && (
              <ErrorLabel>{errors.survey_title.message}</ErrorLabel>
            )}
          </CustomFormControl>
          <CustomFormControl fullWidth>
            <FormLabel>Who has access</FormLabel>
            <CustomSelect
              styles={{
                control: (base) => ({
                  ...base,
                  height: "56px",
                }),
              }}
              isMulti
              value={survey.accessMembers}
              options={accessEmails}
              onChange={(value) =>
                dispatch({ type: "SET_MEMBERS", value: value })
              }
            />
          </CustomFormControl>
          {!survey.surveyEditId && (
            <GridContainer container spacing={5}>
              {questionTypes &&
                questionTypes.map((survey, index) => (
                  <Grid key={index} item md={4}>
                    {loading ? (
                      <SkeletonTheme
                        baseColor="#e6e8ed"
                        highlightColor="#f7f7f7"
                        width="355px"
                        height="200px"
                      >
                        <Skeleton count={1} />
                      </SkeletonTheme>
                    ) : (
                      <Card variant="outlined">
                        <CardMedia>
                          <div
                            style={{
                              position: "relative",
                              width: "100%",
                              height: "90px",
                            }}
                          >
                            <Image
                              src={"/survey/" + survey.name + ".png"}
                              layout="fill"
                              objectFit="cover"
                            />
                          </div>
                        </CardMedia>
                        <CardContent>
                          <CardTitle>
                            <CardHead>
                              <Title>{survey.title}</Title>
                              <RadioButtonSection>
                                <Radio
                                  name="survey_type"
                                  onChange={handleChange}
                                  value={survey.name}
                                  checked={selectedValue === survey.name}
                                />
                              </RadioButtonSection>
                            </CardHead>
                          </CardTitle>
                          <Typography variant="body2">
                            {survey.description}
                          </Typography>
                          {survey.noOfQuestions && (
                            <QuestionNumber>
                              {survey.noOfQuestions} questions
                            </QuestionNumber>
                          )}
                        </CardContent>
                      </Card>
                    )}
                  </Grid>
                ))}
            </GridContainer>
          )}
          <ButtonContainer>
            <StyledButton
              type="submit"
              variant="contained"
              onClick={handleSubmit(onSubmit)}
              sx={{ mt: 3, mb: 2 }}
            >
              Next
            </StyledButton>
          </ButtonContainer>
        </CreateSection>
      </SurveyHeader>
    </Layout>
  );
}
