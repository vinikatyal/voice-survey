import React, { useEffect } from "react";

import { signIn, getCsrfToken, useSession } from "next-auth/react";

import Link from "next/link";
import Image from "next/image";
import router from "next/router";

import get from "lodash.get";
import isEmpty from "lodash.isempty";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";

import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

// image
import google from "../../images/svg/google.svg";

// internal components
import Layout from "../../components/Layout";
import Limiter from "../../components/Limiter";
import StyledButton from "../../components/StyledButton";

import styled from "@emotion/styled";
import { useDispatchSurvey, useSurvey } from "../../context/SurveyState";

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

const GoogleSignin = styled(Button)(({ theme }) => ({
  border: "1px solid #00063e",
  borderRadius: "5px",
  color: "#00063e",
}));

const LoginFormLabel = styled(FormLabel)(({ theme }) => ({
  marginBottom: "10px",
  marginTop: "10px",
}));

const ErrorLabel = styled("div")({
  color: "red",
  marginTop: "5px",
});

const SignInText = styled(Typography)({
  marginBottom: "40px",
});

export default function Index({ csrfToken }) {
  const { data: session, status } = useSession();
  const {
    register,
    handleSubmit,
    trigger,
    setValue,
    formState: { errors },
  } = useForm();

  const survey = useSurvey();
  const dispatch = useDispatchSurvey();

  useEffect(() => {
    if (session) {
      router.push("/dashboard");
    }
    if (survey.userEmail) {
      setValue("email", survey.userEmail, {
        shouldDirty: true,
      });
    }
  }, []);
  const onSubmit = async (data) => {
    dispatch({ type: "SET_USER_EMAIL", value: data.email });
    const res = await signIn("credentials", {
      redirect: false,
      email: data.email,
      password: data.password,
    });

    if (res?.error) {
      toast.error(res.error, {
        position: toast.POSITION.TOP_RIGHT,
      });
      return;
    }

    if (res.status === 200) {
      router.push("/dashboard");
    }
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
                Welcome back!
              </Typography>
              <SignInText align="left" variant="h6">
                Sign in to continue
              </SignInText>
              <Box
                component="form"
                noValidate
                onSubmit={(e) => e.preventDefault()}
                sx={{ mt: 1 }}
              >
                <input
                  name="csrfToken"
                  type="hidden"
                  defaultValue={csrfToken}
                />
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

                <FormControl fullWidth>
                  <LoginFormLabel>Password</LoginFormLabel>
                  <TextField
                    required
                    fullWidth
                    error={!isEmpty(errors.password)}
                    id="password"
                    name="password"
                    autoComplete="password"
                    {...register("password", {
                      required: "You must specify a password",
                      minLength: {
                        value: 5,
                        message: "Password must have at least 5 characters",
                      },
                      onChange: async (e) => {
                        await trigger("password");
                      },
                    })}
                    type="password"
                    placeholder="Enter your password"
                  />
                  {errors.password && (
                    <ErrorLabel>{errors.password.message}</ErrorLabel>
                  )}
                </FormControl>
                <StyledButton
                  onClick={handleSubmit(onSubmit)}
                  fullWidth
                  sx={{ mt: 3, mb: 2 }}
                >
                  {" "}
                  Sign In{" "}
                </StyledButton>
                <Grid container>
                  <Grid item xs>
                    Don't have an account{" "}
                    <Link href="/signup" variant="body2">
                      Sign up
                    </Link>
                  </Grid>
                </Grid>
                <Grid container sx={{ mt: 3, textAlign: "center" }}>
                  <Grid item xs>
                    <Link href="/login/forgotpassword" variant="body2">
                      Forgot your password
                    </Link>
                    {/* <GoogleSignin
                      type="submit"
                      variant="outlined"
                      fullWidth
                      startIcon={
                        <Image
                          src={google}
                          width={30}
                          height={30}
                          alt="google"
                        />
                      }
                      sx={{ mt: 3, mb: 2 }}
                    >
                      Login with google
                    </GoogleSignin> */}
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

// This is the recommended way for Next.js 9.3 or newer
export async function getServerSideProps(context) {
  const csrfToken = await getCsrfToken(context);
  return {
    props: {
      csrfToken: csrfToken,
    },
  };
}
