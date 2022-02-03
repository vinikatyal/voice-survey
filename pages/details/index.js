import * as React from "react";

import { useForm } from "react-hook-form";

import Image from "next/image";

import logo from "../../images/logo.png";
import styled from "@emotion/styled";
import Layout from "../../components/Layout";
import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";
import Typography from "@mui/material/Typography";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import TextField from "@mui/material/TextField";

import Limiter from "../../components/Limiter";
import StyledButton from "../../components/StyledButton";

const ImageContainer = styled(Box)({
  paddingTop: "30px",
  display: "flex",
  justifyContent: "center",
});
const DetailHeader = styled(Typography)({
  marginTop: "30px",
  padding: "19px 0",
  display: "flex",
  justifyContent: "center",
  backgroundColor: "#f5f8ff",
  fontFamily: "Poppins",
  fontSize: "24px",
  fontWeight: "600",
});

const LogoSection = styled(Box)({
  height: "173px",
  margin: "40px",
  display: " flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
});
const LogoHeading = styled(Typography)({
  fontFamily: "Poppins",
  fontSize: "16px",
  fontWeight: "500",
});
const LogoInputSection = styled(Box)({
  width: "140px",
  height: "140px",
  margin: "10px 47px 0",
  borderRadius: "8px",
  border: "dotted 2px #0a23fb",
  backgroundColor: "#f5f8ff",
  display: "flex ",
  flexDirection: "column",
  justifyContent: "space-around",
  alignItems: "center",
  padding: "25px",
});

const LogoAddButton = styled(Fab)({
  height: "10px",
  width: "36px",
  backgroundColor: "#0a23fb",
});
const NextSection = styled("div")({
  display: " flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  paddingTop: "30px",
});

const DetailsForm = styled("div")({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
});

const FormSection = styled("div")({
  width: "370px",
});

const LoginFormLabel = styled(FormLabel)(({ theme }) => ({
  marginBottom: "10px",
  marginTop: "10px",
}));

const ErrorLabel = styled("p")({
  color: "red",
});

const Input = styled("input")({
  display: "none",
});

export default function Index() {
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
      <Limiter>
        <ImageContainer>
          <Image src={logo} alt="background" />
        </ImageContainer>
      </Limiter>
      <DetailHeader>Add Details</DetailHeader>

      <Limiter>
        <DetailsForm>
          <Box component="form" noValidate onSubmit={(e) => e.preventDefault()}>
            <LogoSection>
              <LogoHeading>Select any png, svg or jpg file</LogoHeading>
              <LogoInputSection>
                <LogoAddButton color="primary" variant="contained">
                  <Input accept="image/*" id="icon-button-file" type="file" />
                  <Typography fontSize={28}>+</Typography>
                </LogoAddButton>
                <Typography fontSize={18} color={"#0a23fb"}>
                  Add Logo
                </Typography>
              </LogoInputSection>
            </LogoSection>
            <FormSection>
              <FormControl fullWidth>
                <LoginFormLabel>Add Company Name</LoginFormLabel>
                <TextField
                  required
                  {...register("company_name", {
                    required: "Company Name is required",
                  })}
                  id="company_name"
                  name="company_name"
                  placeholder="Your Company Name"
                />
                {errors.company_name && (
                  <ErrorLabel>{errors.company_name.message}</ErrorLabel>
                )}
              </FormControl>
            </FormSection>

            <NextSection>
              <StyledButton onClick={handleSubmit(onSubmit)}>Next</StyledButton>
            </NextSection>
          </Box>
        </DetailsForm>
      </Limiter>
    </Layout>
  );
}
