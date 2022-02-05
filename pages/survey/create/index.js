import * as React from "react";

import { useForm } from "react-hook-form";
import Select from "react-select";

import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

import Layout from "../../../components/Layout";
import SurveyHeader from "../../../components/survey/SurveyHeader";
import StyledButton from "../../../components/StyledButton";

import bck from "../../../images/bck.png";

import styled from "@emotion/styled";
import Image from "next/image";

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
  width: "90%",
  fontWeight: 600,
  color: "#00063e",
});

const RadioButtonSection = styled("div")({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
});

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

const card = (
  <React.Fragment>
    <Image height="90" objectFit="cover" src={bck} />
    <CardContent>
      <CardTitle>
        <CardHead>
          CSAT
          <RadioButtonSection>
            <FormControlLabel value="CSAT" control={<Radio />} label="" />
          </RadioButtonSection>
        </CardHead>
      </CardTitle>
      <Typography variant="body2">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do et
      </Typography>
      <QuestionNumber>12 questions</QuestionNumber>
    </CardContent>
  </React.Fragment>
);

export default function Create() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    alert(JSON.stringify(data));
  };
  return (
    <Layout>
      <SurveyHeader currentTab="CREATE">
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
