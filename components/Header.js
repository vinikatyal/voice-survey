import * as React from "react";

import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";

import styled from "@emotion/styled";

const AppBarCustom = styled(AppBar)(({}) => ({
  backgroundColor: "#fff",
  color: "#707070",
}));


export default function Index({children}) {
  return (
    <AppBarCustom position="static">
      <Toolbar>
        {children}
      </Toolbar>
    </AppBarCustom>
  );
}
