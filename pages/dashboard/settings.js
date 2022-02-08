import * as React from "react";

import router from "next/router";

import Image from "next/image";

import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";

import StyledButton from "../../components/StyledButton";
import Header from "../../components/Header";

import logo from "../../images/logo.png";

import styled from "@emotion/styled";

import { authService } from "../../services/auth.service";

const FullBackground = styled(Container)(({ theme }) => ({
  height: "100vh",
}));

const GridContainer = styled(Grid)(({ theme }) => ({
  marginTop: theme.spacing(1),
}));

const DashboardHeader = styled("div")(({ theme }) => ({
  height: "60px",
  padding: theme.spacing(2),
  backgroundColor: "#f5f8ff",
  marginTop: "30px",
}));

const BoxCustom = styled(Container)(({}) => ({
  width: "100%",
  display: "flex",
  alignItems: "center",
}));

const Nav = styled("div")(({}) => ({
  display: "flex",
  justifyContent: "flex-end",
  width: "90%",
  alignItems: "center",
}));

const NavLink = styled(Link)(({}) => ({
  color: "#707070",
  marginLeft: "20px",
  marginRight: "20px",
  textDecoration: "none",
  cursor: "pointer",
}));

const Logo = styled(Image)(({}) => ({
  height: "30px",
  display: "flex",
  justifyContent: "flex-start",
}));

export default function Index() {
  const handleClickOpen = () => {
    router.push("/survey/create");
  };

  const logOut = () => {
    authService.logout();
    router.push("/login");
  };
  return (
    <>
      <Header>
        <BoxCustom maxWidth="lg">
          <Logo src={logo} alt="background" />
          <Nav>
            <NavLink to="/" underline="hover">
              All Surveys
            </NavLink>
            <NavLink to="/about" underline="hover">
              My Surveys
            </NavLink>
            <NavLink to="/contact" underline="hover">
              Shared with me
            </NavLink>
            <NavLink to="/faq" underline="hover">
              Billing
            </NavLink>
            <NavLink to="/faq" underline="hover">
              Settings
            </NavLink>
            <StyledButton onClick={handleClickOpen}>New Survey</StyledButton>
          </Nav>
        </BoxCustom>
      </Header>
      <FullBackground maxWidth="lg">
        <DashboardHeader>
          <Typography variant="h4">All Surveys</Typography>
        </DashboardHeader>
        <GridContainer container spacing={5}>
          <Link onClick={logOut}>Logout</Link>
        </GridContainer>
      </FullBackground>
    </>
  );
}
