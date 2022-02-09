import * as React from "react";

import router from "next/router";

import Image from "next/image";

import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";

import DashboardHeader from "../../components/dashboard/DashboardHeader";

import styled from "@emotion/styled";

import { authService } from "../../services/auth.service";

const FullBackground = styled(Container)(({ theme }) => ({
  height: "100vh",
}));

const GridContainer = styled(Grid)(({ theme }) => ({
  marginTop: theme.spacing(1),
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
      <DashboardHeader></DashboardHeader>
      <FullBackground maxWidth="lg">
        <GridContainer container spacing={5}>
          <Link onClick={logOut}>Logout</Link>
        </GridContainer>
      </FullBackground>
    </>
  );
}
