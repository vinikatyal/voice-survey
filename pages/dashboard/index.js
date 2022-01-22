import * as React from "react";

import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";

import styled from "@emotion/styled";

const Nav = styled("div")(({}) => ({
  display: "flex",
}));

export default function Index() {
  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h4">Armour365</Typography>
          <Nav>
            <Link to="/">Home</Link>
            <Link to="/about">About</Link>
            <Link to="/contact">Contact</Link>
            <Link to="/faq">FAQ</Link>
          </Nav>
        </Toolbar>
      </AppBar>
      <Grid container spacing={2}></Grid>
    </>
  );
}
