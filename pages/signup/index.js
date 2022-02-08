import React, { useEffect } from "react";
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
import logo from "../../images/logo.png";
import bck from "../../images/bck.png";
import google from "../../images/svg/google.svg";

import styled from "@emotion/styled";
import "react-phone-input-2/lib/material.css";

import { authService } from "../../services/auth.service";

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  marginLeft: "30px",
  marginRight: "30px",
  marginTop: "50px",
  width: "450px",
  boxShadow: "0 3px 6px 0 rgba(0, 0, 0, 0.16",
  padding: "28px 30px 27px",
  borderRadius: "20px",
}));

const GridItem = styled(Grid)(({ theme }) => ({
  display: "flex",
  alignItems: "flex-start",
  flexDirection: "column",
  justifyContent: "left",
  marginLeft: "50px",
  marginBottom: "50px",
  marginTop: "50px",
}));

const GridLeftImage = styled(Grid)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  flexDirection: "column",
  justifyContent: "center",
  flexGrow: 1,
}));

const GoogleSignin = styled(Button)(({ theme }) => ({
  border: "1px solid #00063e",
  borderRadius: "8px",
  color: "#00063e",
}));

const LoginFormLabel = styled(FormLabel)(({ theme }) => ({
  marginBottom: "10px",
  marginTop: "10px",
}));

const ErrorLabel = styled("p")({
  color: "red",
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
  marginBottom: "16px",
});

export default function Index() {
  const [mobile, setMobile] = React.useState("");
  const {
    register,
    handleSubmit,
    watch,
    setError,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    // redirect to home if already logged in
    console.log(authService)
    if (authService.userValue) {
      router.push("/dashboard");
    }
  }, []);

  const onSubmit = async (data) => {
    console.log(JSON.stringify(data));
    return authService
      .signup(data.email, data.password, mobile)
      .then(() => {
        // get return url from query parameters or default to '/'
        router.push("/dashboard");
      })
      .catch((error) => {
        setError("apiError", { message: error });
      });
  };
  return (
    <Layout bgColor="#f7fafc">
      <Limiter>
        <Grid container spacing={2}>
          <Grid item lg={6} md={6}>
            <GridItem>
              <Image
                src={logo}
                width={142}
                height={50}
                alt="background"
                loading="lazy"
              />
            </GridItem>
            <GridLeftImage>
              <Image
                src={bck}
                width={625}
                height={369}
                alt="background"
                loading="lazy"
              />
            </GridLeftImage>
          </Grid>
          <Grid item md={6} lg={6}>
            <Item>
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
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value:
                          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                        message: "Please enter a valid email",
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
                    id="password"
                    name="password"
                    type="password"
                    {...register("password", {
                      required: "You must specify a password",
                      minLength: {
                        value: 5,
                        message: "Password must have at least 5 characters",
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
                    id="confirmpassword"
                    name="confirmpassword"
                    type="password"
                    {...register("confirmpassword")}
                    placeholder="Confirm your password"
                  />
                  {errors.confirmpassword && (
                    <ErrorLabel>{errors.confirmpassword.message}</ErrorLabel>
                  )}
                </FormControl>
                <PhoneFormControl fullWidth>
                  <LoginFormLabel>Phone Number</LoginFormLabel>
                  <Phone
                    onlyCountries={["in"]}
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
                    <GoogleSignin
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
                    </GoogleSignin>
                  </Grid>
                </Grid>
              </Box>
            </Item>
          </Grid>
        </Grid>
      </Limiter>
    </Layout>
  );
}
