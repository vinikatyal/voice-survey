import * as React from "react";

import Image from "next/image";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";

import styled from "@emotion/styled";

import logo from "../../images/logo.png";
import bck from "../../images/bck.png";

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  marginLeft: "30px",
  marginRight: "30px",
  marginTop: "50px",
  width: "450px",
  boxShadow: "0 3px 6px 0 rgba(0, 0, 0, 0.16",
  padding: "28px 30px 27px",
  borderRadius: "20px",
}));

const FullBackground = styled(Box)(({ theme }) => ({
  height: "100vh",
  backgroundColor: "#f7fafc",
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

const LoginButton = styled(Button)(({ theme }) => ({
  height: "60px",
  padding: "18px",
}));

export default function Index() {
  const handleSubmit = () => {};
  return (
    <FullBackground>
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
            <Typography align="left" variant="h6">
              Sign up to continue
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                variant="standard"
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Create Password"
                type="password"
                id="password"
                autoComplete="current-password"
                variant="standard"
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="phone"
                label="Phone number"
                name="phone"
                autoFocus
                variant="standard"
              />
              <LoginButton
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Submit
              </LoginButton>
              <Grid container>
                <Grid item xs>
                  If you already have account,
                  <Link href="/login" variant="body2">
                    Login
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Item>
        </Grid>
      </Grid>
    </FullBackground>
  );
}
