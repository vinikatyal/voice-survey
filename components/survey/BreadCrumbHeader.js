import React from "react";

import styled from "@emotion/styled";

const Header = styled("div")(({ theme }) => ({
  display: "flex",
  height: "70px",
  padding: theme.spacing(2),
  backgroundColor: "#f5f8ff",
  marginTop: "30px",
}));

const HeaderContainer = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-start",
  width: "70%",
}));

const RightContainer = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "flex-end",
  width: "30%",
}));

export default function BreadCrumbHeader({ children, component }) {
  return (
    <>
      <Header>
        <HeaderContainer>{children}</HeaderContainer>
        <RightContainer>{component}</RightContainer>
      </Header>
    </>
  );
}
