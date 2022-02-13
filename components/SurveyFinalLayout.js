import * as React from "react";

import Grid from "@mui/material/Grid";

import styled from "@emotion/styled";

const FullBackground = styled(Grid)(({}) => ({
}));

const GridCustom = styled(Grid)(({}) => ({
    backgroundColor: "#fff",
  }));

export default function SurveyFinalLayout(props) {
  return (
    <FullBackground sx={{ flexGrow: 1 }} container spacing={2} {...props}>
      <GridCustom item xs={12}>{props.children}</GridCustom>
    </FullBackground>
  );
}
