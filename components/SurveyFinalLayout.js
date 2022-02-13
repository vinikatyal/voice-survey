import * as React from "react";

import styled from "@emotion/styled";

const GridCustom = styled("div")(({}) => ({
  borderRadius: "8px",
  boxShadow: "0 10px 30px 0 rgba(0, 0, 0, 0.16)",
  width: "80%",
  height: "80%",
  backgroundColor: "#fff",
}));

export default function SurveyFinalLayout(props) {
  return <GridCustom {...props}>{props.children}</GridCustom>;
}
