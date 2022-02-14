import React, { useState, useEffect } from "react";

import { useRouter } from "next/router";
import Image from "next/image";

import isEmpty from "lodash.isempty";
import { useForm } from "react-hook-form";
import Select from "react-select";
import { toast } from "react-toastify";

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

const emailOptions = [
  { value: "1", label: "dfhgh@gmail.com" },
  { value: "2", label: "1@gmail.com" },
  { value: "3", label: "bfbnf@gmail.com" },
];

const surveyTypes = [
  {
    name: "csat",
    title: "CSAT",
    img: "/survey/csat.png",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do et",
    qNo: 12,
  },
  {
    name: "teacher_feedback",
    title: "Teacher Feedback",
    img: "/survey/teachers.png",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do et",
    qNo: 12,
  },
  {
    name: "pmf_survey",
    title: "PMF Survey",
    img: "/survey/pmf.png",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do et",
    qNo: 12,
  },
  {
    name: "course_feedback",
    title: "Course feedback",
    img: "/survey/course.png",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do et",
    qNo: 5,
  },
  {
    name: "customer_feedback",
    title: "Customer feedback",
    img: "/survey/customer.png",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do et",
    qNo: 12,
  },
  {
    name: "custom",
    title: "Custom",
    img: "/survey/custom.png",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do et",
    qNo: 0,
  },
];

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

  const router = useRouter();

  useEffect(() => {
    setValue("survey_title", survey.surveyTitle, {
      shouldDirty: true,
    });
  }, [survey.surveyTitle]);

  useEffect(() => {
    dispatch({ type: "SET_TYPE", value: selectedValue });
  }, [selectedValue]);

  useEffect(() => {
    getTeamMembers();
  }, []);

  const getTeamMembers = () => {
    authService
      .get_team_members()
      .then((res) => {
        const emails = res.data.map((item) => ({ value: item, label: item }));
        setAccessEmails(emails);
      })
      .catch((error) => {
        toast.error(error.message, {
          position: toast.POSITION.TOP_RIGHT,
        });
      });
  };
  const onSubmit = async (data) => {
    const surveyData = {
      survey_type: selectedValue,
      access_list_emails: "",
      ...data,
    };
    return surveyService
      .create_survey(surveyData)
      .then(() => {
        // get return url from query parameters or default to '/'
        router.push("/survey/create/questions", undefined, { shallow: true });
      })
      .catch((error) => {
        toast.error(error.message, {
          position: toast.POSITION.TOP_RIGHT,
        });
      });
  };

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };
  return (
    <Layout>
      <SurveyHeader headerTitle="Create a New Survey" currentTab="CREATE">
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
          <GridContainer container spacing={5}>
            {surveyTypes.map((survey, index) => (
              <Grid key={index} item md={4}>
                <Card variant="outlined">
                  <CardMedia>
                    <div
                      style={{
                        position: "relative",
                        width: "100%",
                        height: "90px",
                      }}
                    >
                      <Image src={survey.img} layout="fill" objectFit="cover" />
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
                    <QuestionNumber>{survey.qNo} questions</QuestionNumber>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </GridContainer>
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
