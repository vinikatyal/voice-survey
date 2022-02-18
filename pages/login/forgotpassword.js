import React, { useEffect } from "react";

import Link from "next/link";
import Image from "next/image";
import router from "next/router";

import isEmpty from "lodash.isempty";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";

import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import FormHelperText from "@mui/material/FormHelperText";

// internal components
import Layout from "../../components/Layout";
import Limiter from "../../components/Limiter";
import StyledButton from "../../components/StyledButton";

import { authService } from "../../services/auth.service";

import styled from "@emotion/styled";

const Item = styled(Paper)(({ theme }) => ({
  padding: "30px",
  maxWidth: "450px",
  borderRadius: "20px",
}));

const BannerSection = styled(Grid)({
  minHeight: "70vh",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-around",
  alignItems: "flex-start",
});
const FormSection = styled(Grid)({
  minHeight: "80vh",
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

export default function ForgotPassword() {
  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    return await authService
      .forgot_password(data.email)
      .then(() => {
        // get return url from query parameters or default to '/'
        router.push("/login");
      })
      .catch((error) => {
        toast.error(error.message, {
          position: toast.POSITION.TOP_RIGHT,
        });
      });
  };
  return (
    <Layout bgColor="#f7fafc">
      <Limiter>
        <Grid
          container
          spacing={2}
          alignItems="center"
          justifyContent="space-between"
          minHeight="100vh"
        >
          <BannerSection item lg={6} md={6}>
            <Image
              src={"/images/logo.png"}
              width={142}
              height={61}
              alt="background"
            />
            <Image
              src={"/images/bck.png"}
              width={625}
              height={369}
              alt="background"
            />
          </BannerSection>
          <FormSection
            display="flex"
            justifyContent="center"
            item
            md={6}
            lg={6}
          >
            <Item elevation={4}>
              <Typography align="left" variant="h4">
                Forgot password
              </Typography>
              <Box
                component="form"
                noValidate
                onSubmit={(e) => e.preventDefault()}
                sx={{ mt: 1 }}
              >
                <FormControl fullWidth>
                  <LoginFormLabel>Email Address</LoginFormLabel>
                  <TextField
                    required
                    fullWidth
                    error={!isEmpty(errors.email)}
                    id="email"
                    name="email"
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
                    autoComplete="email"
                    placeholder="Enter your email"
                  />
                  {errors.email && (
                    <ErrorLabel>{errors.email.message}</ErrorLabel>
                  )}
                </FormControl>
                <FormHelperText>
                  You will recieve a temporary password using which you can
                  reset your password
                </FormHelperText>
                <StyledButton
                  onClick={handleSubmit(onSubmit)}
                  fullWidth
                  sx={{ mt: 3, mb: 2 }}
                >
                  Reset
                </StyledButton>
                <Grid container>
                  <Grid item xs>
                    <Link href="/login" variant="body2">
                      Go back
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            </Item>
          </FormSection>
        </Grid>
      </Limiter>
    </Layout>
  );
}
