import React, { useEffect } from "react";

import isEmpty from "lodash.isempty";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";

import Image from "next/image";
import Link from "next/link";
import router from "next/router";

// components
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import PhoneInput from "react-phone-input-2";

// custom components
import Layout from "../../components/Layout";
import Limiter from "../../components/Limiter";
import StyledButton from "../../components/StyledButton";

// images
import google from "../../images/svg/google.svg";

import styled from "@emotion/styled";
import "react-phone-input-2/lib/material.css";

import { authService } from "../../services/auth.service";

const Item = styled(Paper)(({ theme }) => ({
  padding: "30px",
  maxWidth: "450px",
  borderRadius: "20px",
}));

const GoogleSignin = styled(Button)(({ theme }) => ({
  border: "1px solid #00063e",
  borderRadius: "5px",
  color: "#00063e",
}));

const BannerSection = styled(Grid)({
  minHeight: "90vh",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-around",
  alignItems: "flex-start",
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

const PhoneFormControl = styled(FormControl)`
  font-size: 16px !important;
  .special-label {
    display: none !important;
  }

  .form-control {
    width: 100% !important;
  }
`;

const Phone = styled(PhoneInput)``;

const SignInText = styled(Typography)({
  marginBottom: "10px",
});

export default function Index() {
  const [mobile, setMobile] = React.useState("");
  const {
    register,
    handleSubmit,
    watch,
    trigger,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    // redirect to home if already logged in
    if (authService.tokenValue) {
      router.push("/dashboard");
    }
  }, []);

  const onSubmit = async (data) => {
    return await authService
      .signup(data.email, data.password, mobile)
      .then(() => {
        // get return url from query parameters or default to '/'
        router.push("/details");
      })
      .catch((error) => {
        toast.error(error, {
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
          <FormSection item md={6} lg={6}>
            <Item elevation={4}>
              <Typography align="left" variant="h4">
                Create Your Account!
              </Typography>
              <SignInText align="left" variant="h6">
                Sign up to continue
              </SignInText>
              <Box
                component="form"
                noValidate
                onSubmit={(e) => e.preventDefault()}
                sx={{ mt: 1 }}
              >
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
                  {errors.email && (
                    <ErrorLabel>{errors.email.message}</ErrorLabel>
                  )}
                </FormControl>
                <FormControl fullWidth>
                  <LoginFormLabel>Create Password</LoginFormLabel>
                  <TextField
                    fullWidth
                    error={!isEmpty(errors.password)}
                    id="password"
                    name="password"
                    type="password"
                    {...register("password", {
                      required: "You must specify a password",
                      minLength: {
                        value: 5,
                        message: "Password must have at least 5 characters",
                      },
                      onChange: async (e) => {
                        await trigger("password");
                        watch("confirmpassword", "").length > 0 &&
                          (await trigger("confirmpassword"));
                      },
                    })}
                    autoComplete="password"
                    placeholder="Set your password"
                  />
                  {errors.password && (
                    <ErrorLabel>{errors.password.message}</ErrorLabel>
                  )}
                </FormControl>
                <FormControl fullWidth>
                  <LoginFormLabel>Confirm Password</LoginFormLabel>
                  <TextField
                    fullWidth
                    error={!isEmpty(errors.confirmpassword)}
                    id="confirmpassword"
                    name="confirmpassword"
                    type="password"
                    {...register("confirmpassword", {
                      validate: (value) =>
                        value === watch("password", "") ||
                        "The passwords do not match",
                      onChange: async (e) => {
                        await trigger("confirmpassword");
                      },
                    })}
                    placeholder="Confirm your password"
                  />
                  {errors.confirmpassword && (
                    <ErrorLabel>{errors.confirmpassword.message}</ErrorLabel>
                  )}
                </FormControl>
                <PhoneFormControl fullWidth>
                  <LoginFormLabel>Phone Number</LoginFormLabel>
                  <Phone
                    country={"in"}
                    name="mobile"
                    id="mobile"
                    value={mobile}
                    onChange={setMobile}
                  ></Phone>
                </PhoneFormControl>
                <StyledButton
                  type="submit"
                  fullWidth
                  variant="contained"
                  onClick={handleSubmit(onSubmit)}
                  sx={{ mt: 3, mb: 2 }}
                >
                  Submit
                </StyledButton>
                <Grid container>
                  <Grid item xs>
                    If you already have account,{" "}
                    <Link href="/login" variant="body2">
                      Login
                    </Link>
                  </Grid>
                </Grid>
                <Grid container>
                  <Grid item xs>
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
                      Signin with google
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
