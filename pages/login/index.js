import * as React from "react";



import Link from "next/link";
import Image from "next/image";

import { useForm } from "react-hook-form";
// import useSWR from 'swr'

import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

// image
import logo from "../../images/logo.png";
import bck from "../../images/bck.png";
import google from "../../images/svg/google.svg";

// internal components
import Layout from "../../components/Layout";
import Limiter from "../../components/Limiter";
import StyledButton from "../../components/StyledButton";


import styled from "@emotion/styled";

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  marginLeft: "30px",
  marginRight: "30px",
  marginTop: "50px",
  width: "450px",
  boxShadow: "0 3px 6px 0 rgba(0, 0, 0, 0.16",
  padding: "28px 30px 27px",
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
    <Layout bgColor="#f7fafc">
      <Limiter>
        <Grid container spacing={2}>
          <Grid item lg={6} md={6}>
            <GridItem>
              <Image src={logo} width={142} height={50} alt="background" />
            </GridItem>
            <GridLeftImage>
              <Image src={bck} width={625} height={369} alt="background" />
            </GridLeftImage>
          </Grid>
          <Grid item md={6} lg={6}>
            <Item>
              <Typography align="left" variant="h4">
                Welcome back!
              </Typography>
              <Typography align="left" variant="h6">
                Sign in to continue
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
                    id="email"
                    name="email"
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value:
                          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
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
                    id="password"
                    name="password"
                    autoComplete="password"
                    {...register("password", {
                      required: "You must specify a password",
                      minLength: {
                        value: 5,
                        message: "Password must have at least 5 characters",
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
