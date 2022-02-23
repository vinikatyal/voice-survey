import React from "react";

import Image from "next/image";

import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

import styled from "@emotion/styled";

const DashboardHeader = styled("div")(({ theme }) => ({
  display: "flex",
  height: "60px",
  padding: theme.spacing(2),
  backgroundColor: "#f5f8ff",
  marginTop: "30px",
}));

const HeaderContainer = styled(Container)(({ theme }) => ({
  color: "#707070",
  width: "90%",
  display: "flex",
  alignItems: "center",
}));

const RightImageContainer = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "flex-end",
  width: "10%",
}));

export default function DashboardSubHeader({ title }) {
  return (
    <>
      <DashboardHeader>
        <HeaderContainer>
          <Typography variant="h4">{title}</Typography>
        </HeaderContainer>
        <RightImageContainer>
          <Image src={"/images/shape.svg"} width={82} height={55} alt="share" />
        </RightImageContainer>
      </DashboardHeader>
    </>
  );
}
