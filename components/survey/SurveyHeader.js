import * as React from "react";

import AppBar from "@mui/material/AppBar";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

// icons
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";

import styled from "@emotion/styled";
import Link from "next/link";
import { useRouter } from "next/router";

const AppBarCustom = styled(AppBar)(({}) => ({
  backgroundColor: "#fff",
  color: "#707070",
}));
const HeaderContainer = styled(Container)(({}) => ({
  color: "#707070",
  display: "flex",
}));

const SurveyNameWrapped = styled("div")({
  display: "flex",
  alignItems: "center",
  margin: "19px 0",
  width: "40%",
  cursor: "pointer",
  transform: "scale(1)",
  transition: "0.2s ease",
  "&:active": {
    transform: "scale(0.95)",
  },
});

const Nav = styled("div")(({}) => ({
  display: "flex",
  justifyContent: "flex-start",
  alignItems: "center",
  width: "60%",
}));

const NavItem = styled("div")(({ active }) => ({
  color: active ? "#0a23fb" : "#707070",
  marginLeft: "20px",
  marginRight: "20px",
  fontWeight: 500,
  cursor: "pointer",
  "&:hover": {
    color: "#0a23fb",
  },
}));

export default function Index({
  headerTitle,
  currentTab,
  children,
  backRoute,
}) {
  const router = useRouter();
  const handleBack = () => {
    router.push(backRoute);
  };
  return (
    <>
      <AppBarCustom position="sticky">
        <HeaderContainer maxWidth="lg">
          <SurveyNameWrapped onClick={handleBack}>
            <ArrowBackIcon />
            <Typography variant="h4" ml={2} color="#00063e">
              {headerTitle}
            </Typography>
          </SurveyNameWrapped>
          <Nav>
            <Link href="/survey/create" passHref>
              <NavItem active={currentTab === "CREATE"}>Create</NavItem>
            </Link>
            <KeyboardDoubleArrowRightIcon />
            <Link href="/survey/share" passHref>
              <NavItem active={currentTab === "SHARE"}>Share</NavItem>
            </Link>
            <KeyboardDoubleArrowRightIcon />
            <Link href="/survey/report" passHref>
              <NavItem active={currentTab === "REPORT"}>Report</NavItem>
            </Link>
          </Nav>
        </HeaderContainer>
      </AppBarCustom>
      {children}
    </>
  );
}
