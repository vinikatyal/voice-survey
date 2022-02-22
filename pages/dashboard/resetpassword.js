import React from "react";

import isEmpty from "lodash.isempty";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";

import { toast } from "react-toastify";

import Image from "next/image";

// UI
import styled from "@emotion/styled";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import TextField from "@mui/material/TextField";

// Components
import Layout from "../../components/Layout";
import Limiter from "../../components/Limiter";
import StyledButton from "../../components/StyledButton";

import { authService } from "../../services/auth.service";

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

const FormSection = styled(Grid)({
  height: "80%",
  display: "flex",
  marginTop: "20px",
  marginBottom: "50px",
  justifyContent: "center",
  alignItems: "center",
});

const LoginFormLabel = styled(FormLabel)(({ theme }) => ({
  marginBottom: "10px",
  marginTop: "10px",
}));

const ErrorLabel = styled("div")({
  color: "red",
  marginTop: "5px",
});
const NextSection = styled("div")({
  display: " flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  paddingTop: "30px",
});

export default function Index() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    trigger,
    setValue,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    return await authService
      .reset_password(data.email, data.old_password, data.new_password)
      .then(() => {
        router.push("/dashboard");
      })
      .catch((error) => {
        toast.error(error, {
          position: toast.POSITION.TOP_RIGHT,
        });
      });
  };
  return (
    <Layout>
      <Limiter>
        <ImageContainer>
          <Image
            width={135}
            height={58}
            src={"/images/logo.png"}
            alt="background"
          />
        </ImageContainer>
      </Limiter>

      <DetailHeader>Reset Password</DetailHeader>

      <Limiter>
        <Box
          component="form"
          noValidate
          onSubmit={(e) => e.preventDefault()}
          sx={{ mt: 1 }}
        >
          <Grid id="formInputSection" container justifyContent="center">
            <FormControl fullWidth>
              <LoginFormLabel>Email</LoginFormLabel>
              <TextField
                required
                fullWidth
                error={!isEmpty(errors.email)}
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value:
                      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                    message: "Please enter a valid email",
                  },
                  onChange: async (e) => {
                    await trigger("email");
                  },
                })}
                id="email"
                name="email"
                autoComplete="email"
                placeholder="Enter your email"
              />
              {errors.email && <ErrorLabel>{errors.email.message}</ErrorLabel>}
            </FormControl>
            <FormControl fullWidth>
              <LoginFormLabel>Temporary Password</LoginFormLabel>
              <TextField
                fullWidth
                error={!isEmpty(errors.old_password)}
                id="old_password"
                name="old_password"
                type="password"
                {...register("old_password", {
                  required: "You must specify a password",
                  minLength: {
                    value: 5,
                    message: "Password must have at least 5 characters",
                  },
                })}
                autoComplete="password"
                placeholder="Temporary password"
              />
              {errors.old_password && (
                <ErrorLabel>{errors.old_password.message}</ErrorLabel>
              )}
            </FormControl>
            <FormControl fullWidth>
              <LoginFormLabel>Create Password</LoginFormLabel>
              <TextField
                fullWidth
                error={!isEmpty(errors.new_password)}
                id="new_password"
                name="new_password"
                type="password"
                {...register("new_password", {
                  required: "You must specify a password",
                  minLength: {
                    value: 5,
                    message: "Password must have at least 5 characters",
                  },
                })}
                placeholder="Create your password"
              />
              {errors.new_password && (
                <ErrorLabel>{errors.new_password.message}</ErrorLabel>
              )}
            </FormControl>
          </Grid>

          <NextSection>
            <StyledButton type="submit" onClick={handleSubmit(onSubmit)}>
              Update
            </StyledButton>
          </NextSection>
        </Box>
      </Limiter>
    </Layout>
  );
}
