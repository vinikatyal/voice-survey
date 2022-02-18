import * as React from "react";

import Image from "next/image";

import styled from "@emotion/styled";

const SurveyDiv = styled("div")(({}) => ({
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  position: "absolute",
  textAlign: "center"
}));

export default function NoSurveyScreen() {
  return (
    <SurveyDiv>
      <Image src={"/images/satisfaction.svg"} width={123} height={123} />
      <h3>No Surveys created</h3>
    </SurveyDiv>
  );
}
