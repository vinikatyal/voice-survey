import * as React from "react";

import { useRouter } from "next/router";
import Image from "next/image";

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


import styled from "@emotion/styled";
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

const CustomCardMedia = styled(CardMedia)(({ theme }) => ({
  height: "90px",
  borderRadius: theme.spacing(1),
}));

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

const CustomSelect = styled(Select)({});

const emailOptions = [
  { value: "1", label: "dfhgh@gmail.com" },
  { value: "2", label: "1@gmail.com" },
  { value: "3", label: "bfbnf@gmail.com" },
];

const surveyTypes = [
  {
    name: "CSAT",
    title: "CSAT",
    img: "/survey/csat.png",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do et",
  },
  {
    name: "TEACHER_FEEDBACK",
    title: "Teacher Feedback",
    img: "/survey/teachers.png",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do et",
  },
  {
    name: "PMF",
    title: "PMF Survey",
    img: "/survey/pmf.png",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do et",
  },
  {
    name: "COURSE",
    title: "Course feedback",
    img: "/survey/course.png",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do et",
  },
  {
    name: "CUSTOMER",
    title: "Customer feedback",
    img: "/survey/customer.png",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do et",
  },
  {
    name: "CUSTOM",
    title: "Custom",
    img: "/survey/csat.png",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do et",
  },
];

export default function Create() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const router = useRouter();
  const onSubmit = async (data) => {
    console.log(data);
    router.push("/survey/create/questions");
  };
  return (
    <Layout>
      <SurveyHeader headerTitle="Create a New Survey" currentTab="CREATE">
        <CreateSection
          component="form"
          noValidate
          onSubmit={(e) => e.preventDefault()}
          fullWidth
        >
          <CustomFormControl fullWidth>
            <FormLabel>Survey Title</FormLabel>
            <TextField
              required
              fullWidth
              id="title"
              name="title"
              placeholder="Please name your survey"
            />
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
              options={emailOptions}
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
                          <Radio name="survey-type" value={survey.name} />
                        </RadioButtonSection>
                      </CardHead>
                    </CardTitle>
                    <Typography variant="body2">
                      {survey.description}
                    </Typography>
                    <QuestionNumber>12 questions</QuestionNumber>
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
