import React from "react";
import { useSignIn } from "@clerk/nextjs";
import Link from "next/link";
import Image from "next/image";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Layout from "../../components/Layout";
import Limiter from "../../components/Limiter";
import StyledButton from "../../components/StyledButton";
import styled from "@emotion/styled";
import { useDispatchSurvey } from "../../context/SurveyState";

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

const SignInText = styled(Typography)({
  marginBottom: "40px",
});

export default function Index() {
  const { signIn } = useSignIn();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isDirty, isValid },
  } = useForm();

  const dispatch = useDispatchSurvey();

  const onSubmit = async (data) => {
    try {
      const { email, password } = data;
      await signIn.create({ identifier: email, password });
      router.push("/dashboard");
    } catch (error) {
      toast.error(error.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
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
              width={150}
              height={61}
              alt="logo"
            />
            <Image
              src={"/images/bck.png"}
              width={625}
              height={369}
              alt="background"
            />
          </BannerSection>
          <FormSection item md={6} lg={6}>
            <Item elevation={4}>
              <Typography align="left" variant="h4">
                Welcome back!
              </Typography>
              <SignInText align="left" variant="h6">
                Sign in to continue
              </SignInText>
              <Box
                component="form"
                onSubmit={handleSubmit(onSubmit)}
                sx={{ mt: 1 }}
              >
                <FormControl fullWidth>
                  <LoginFormLabel>Email Address</LoginFormLabel>
                  <TextField
                    required
                    fullWidth
                    error={!!errors.email}
                    id="email"
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: "Please enter a valid email",
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
                    error={!!errors.password}
                    id="password"
                    type="password"
                    {...register("password", {
                      required: "You must specify a password",
                      minLength: {
                        value: 5,
                        message: "Password must have at least 5 characters",
                      },
                    })}
                    placeholder="Enter your password"
                  />
                  {errors.password && (
                    <ErrorLabel>{errors.password.message}</ErrorLabel>
                  )}
                </FormControl>
                <StyledButton
                  disabled={!isDirty || !isValid}
                  fullWidth
                  sx={{ mt: 3, mb: 2 }}
                  type="submit"
                >
                  Sign In
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
