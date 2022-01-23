import * as React from "react";

import Link from "@mui/material/Link";
import Container from "@mui/material/Container";

import Header from "../../components/Header";
import styled from "@emotion/styled";
import { Typography } from "@mui/material";

const FullBackground = styled(Container)(({ theme }) => ({
  height: "100vh",
}));

const DashboardHeader = styled("div")(({ theme }) => ({
  height: "60px",
  padding: theme.spacing(2),
  backgroundColor: "#f5f8ff",
  marginTop: "30px"
}));

export default function Index() {
  return (
    <>
      <Header />
      <FullBackground maxWidth="lg">
        <DashboardHeader>
            <Typography variant="h4">All Surveys</Typography>
        </DashboardHeader>
      </FullBackground>
    </>
  );
}
