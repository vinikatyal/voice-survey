import * as React from "react";

import Image from "next/image";

// components
import AppBar from "@mui/material/AppBar";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

import styled from "@emotion/styled";

// icons
import share from "../../images/svg/share.svg";

const AppBarCustom = styled(AppBar)(({}) => ({
  backgroundColor: "linear-gradient(to left, #556df2, #3932be)",
  color: "#fff",
  display: "flex",
  flexDirection: "row",
}));
const HeaderContainer = styled(Container)(({ theme }) => ({
  color: "#707070",
  width: "90%",
  display: "flex",
  alignItems: "center",
  paddingLeft: "88px!important",
}));

const RightImageContainer = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "flex-end",
  width: "10%",
  paddingRight: theme.spacing(2),
}));

export default function SurveySubHeader({ title }) {
  return (
    <>
      <AppBarCustom position="sticky">
        <HeaderContainer maxWidth="lg">
          <Typography variant="h5" ml={2} color="#fff">
            {title}
          </Typography>
        </HeaderContainer>
        <RightImageContainer>
          <Image src={share} alt="share" />
        </RightImageContainer>
      </AppBarCustom>
    </>
  );
}
