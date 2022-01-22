import * as React from "react";

import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";

import styled from "@emotion/styled";

const Nav = styled("div")(({}) => ({
  width: "100%",
  display: "flex",
}));


const NavLink = styled(Link)(({}) => ({
    color: "#fff",
    marginLeft: "10px",
    marginRight: "10px",
  }));

export default function Index() {
  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h4">Armour365</Typography>
          <Nav>
            <NavLink to="/">All Surveys</NavLink>
            <NavLink to="/about">My Surveys</NavLink>
            <NavLink to="/contact">Shared with me</NavLink>
            <NavLink to="/faq">Billing</NavLink>
            <NavLink to="/faq">Settings</NavLink>
          </Nav>
        </Toolbar>
      </AppBar>
      <Grid container spacing={2}></Grid>
    </>
  );
}
