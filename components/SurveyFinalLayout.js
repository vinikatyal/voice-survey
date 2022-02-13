import * as React from "react";

import styled from "@emotion/styled";

const GridCustom = styled("div")(({}) => ({
  width: "80%",
  height: "80%",
  backgroundColor: "#fff"
}));

export default function SurveyFinalLayout(props) {
  return <GridCustom {...props}>{props.children}</GridCustom>;
}
