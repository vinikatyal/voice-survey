import * as React from "react";

import Image from "next/image";

import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";

import logo from "../images/logo.png";

import styled from "@emotion/styled";

const AppBarCustom = styled(AppBar)(({}) => ({
  backgroundColor: "#fff",
  color: "#707070",
}));

const BoxCustom = styled(Container)(({}) => ({
  width: "100%",
  display: "flex",
  alignItems: "center",
}));

const Nav = styled("div")(({}) => ({
  display: "flex",
  justifyContent: "flex-end",
  width: "90%"
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
  return (
    <AppBarCustom position="static">
      <Toolbar>
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
          </Nav>
        </BoxCustom>
      </Toolbar>
    </AppBarCustom>
  );
}
