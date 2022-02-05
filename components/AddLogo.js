import styled from "@emotion/styled";
import { Box, Fab, Typography } from "@mui/material";
import React from "react";

const LogoInputSection = styled(Box)({
  width: "140px",
  height: "140px",
  margin: "10px 0",
  borderRadius: "8px",
  border: "dotted 2px #0a23fb",
  backgroundColor: "#f5f8ff",
  display: "flex ",
  flexDirection: "column",
  justifyContent: "space-around",
  alignItems: "center",
  padding: "25px",
});

const LogoAddButton = styled(Fab)({
  height: "10px",
  width: "36px",
});

export default function AddLogo() {
  return (
    <LogoInputSection>
      <LogoAddButton color="primary" variant="contained">
        <Typography fontSize={28}>+</Typography>
      </LogoAddButton>
      <Typography fontSize={18} color={"#0a23fb"}>
        Add Logo
      </Typography>
    </LogoInputSection>
  );
}
