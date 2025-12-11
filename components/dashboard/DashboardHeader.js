import * as React from "react";

import get from "lodash.get";

import { useUser, useClerk } from "@clerk/nextjs";
import { useRouter } from "next/router";
import Image from "next/image";

import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import Tooltip from "@mui/material/Tooltip";

import StyledButton from "@/components/StyledButton";
import Header from "@/components/Header";

//icons
import LogoutIcon from "@mui/icons-material/Logout";

import styled from "@emotion/styled";
import { useAuth } from "@clerk/clerk-react";

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
  cursor: "pointer",
}));

const LogOff = styled(LogoutIcon)({
  cursor: "pointer",
});

export default function DashboardHeader() {
  const user = useUser()
  const clerk = useClerk()
  const router = useRouter();

  const handleClickOpen = () => {
    router.push("/survey/create");
  };

  const openLink = (link) => {
    router.push(link);
  };

  const logoutSite = async () => {
    try {
      await clerk.signOut();
      // Optionally redirect to a different page after logout
      router.push('/login');
      console.log('Logged out successfully');
    } catch (error) {
      console.error('Failed to log out', error);
    }
  };
  return (
    <Header>
      <BoxCustom maxWidth="lg">
        <Logo
          onClick={() => openLink("/dashboard")}
          width={120}
          height={50}
          src={"/images/logo.png"}
          alt="background"
        />
        <Nav>
          <NavLink
            to="/"
            onClick={() => openLink("/dashboard")}
            underline="hover"
          >
            My Surveys
          </NavLink>
          <NavLink
            onClick={() => openLink("/dashboard/all-surveys")}
            underline="hover"
          >
            All Surveys
          </NavLink>
          <NavLink
            onClick={() => openLink("/dashboard/settings")}
            underline="hover"
          >
            Settings
          </NavLink>
          <StyledButton onClick={handleClickOpen}>New Survey</StyledButton>
        </Nav>
      </BoxCustom>
      <Tooltip title="Logout" arrow>
        <LogOff onClick={logoutSite} />
      </Tooltip>
    </Header>
  );
}
