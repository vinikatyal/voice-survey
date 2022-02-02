import * as React from "react";
import { useForm } from "react-hook-form";

import Image from "next/image";

import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";

import Layout from "../../components/Layout";
import SurveyHeader from "../../components/survey/SurveyHeader";
import StyledButton from "../../components/StyledButton";

import styled from "@emotion/styled";

const CreateSection = styled(Container)(({ theme }) => ({
  marginTop: theme.spacing(3),
  width: "100%",
}));

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
      <SurveyHeader currentTab="CREATE"></SurveyHeader>
      <CreateSection
        component="form"
        noValidate
        onSubmit={(e) => e.preventDefault()}
        fullWidth
      >
        <FormControl fullWidth>
          <FormLabel>Survey Title</FormLabel>
          <TextField
            required
            fullWidth
            id="title"
            name="title"
            placeholder="Enter Survey Titke"
          />
        </FormControl>
        <StyledButton
          type="submit"
          variant="contained"
          onClick={handleSubmit(onSubmit)}
          sx={{ mt: 3, mb: 2 }}
        >
          Create
        </StyledButton>
      </CreateSection>
    </Layout>
  );
}
