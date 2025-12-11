import React from "react";
import { useSignUp } from "@clerk/nextjs";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import Image from "next/image";
import Link from "next/link";
import router from "next/router";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Layout from "@/components/Layout";
import Limiter from "@/components/Limiter";
import StyledButton from "@/components/StyledButton";
import styled from "@emotion/styled";

const Item = styled(Paper)(({ theme }) => ({
  padding: "30px",
  maxWidth: "450px",
  borderRadius: "20px",
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

const SignInText = styled(Typography)({
  marginBottom: "10px",
});

export default function Index() {
  const { signUp } = useSignUp();
  const {
    register,
    handleSubmit,
    watch,
    trigger,
    formState: { errors, isDirty, isValid },
  } = useForm();

  const handleCountryInput = (e) => {
    setCountry(e.label);
  };

  const onSubmit = async (data) => {
    try {
      const { email, password } = data;
      await signUp.create({
        identifier: email,
        password,
      });
      toast.success("Account created successfully!");
      router.push("/dashboard");
    } catch (error) {
      toast.error(error.errors[0].message, {
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
                Create Your Account!
              </Typography>
              <SignInText align="left" variant="h6">
                Sign up to continue
              </SignInText>
              <Box
                component="form"
                onSubmit={handleSubmit(onSubmit)}
                sx={{ mt: 1 }}
              >
                <FormControl fullWidth>
                  <LoginFormLabel>Email</LoginFormLabel>
                  <TextField
                    required
                    fullWidth
                    error={!!errors.email}
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
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
                    error={!!errors.password}
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
                {/* Optionally handle country and phone number */}
                {/* <FormControl fullWidth>
                  <LoginFormLabel>Choose Country</LoginFormLabel>
                  <Select
                    id="country"
                    name="country"
                    styles={{
                      control: (base) => ({
                        ...base,
                        height: "56px",
                      }),
                    }}
                    options={countryList}
                    onChange={handleCountryInput}
                  />
                </FormControl>
                <PhoneFormControl fullWidth>
                  <LoginFormLabel>Phone Number</LoginFormLabel>
                  <Phone
                    country={"in"}
                    name="mobile"
                    id="mobile"
                    value={mobile}
                    onChange={setMobile}
                  />
                </PhoneFormControl> */}
                <StyledButton
                  type="submit"
                  fullWidth
                  variant="contained"
                  disabled={!isDirty || !isValid}
                  sx={{ mt: 3, mb: 2 }}
                >
                  Submit
                </StyledButton>
                <Grid container>
                  <Grid item xs>
                    If you already have an account,{" "}
                    <Link href="/login" variant="body2">
                      Login
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
