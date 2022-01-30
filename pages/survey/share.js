import * as React from "react";

import Image from 'next/image';

import Layout from "../../components/Layout";
import SurveyHeader from "../../components/survey/SurveyHeader";
import SurveySubHeader from "../../components/survey/SurveySubHeader";

import styled from "@emotion/styled";

const SurveyHeadSection = styled("div")({
  height: "60px",
  backgroundColor: "#f5f8ff",
});

export default function Index() {
  return (
    <Layout>
      <SurveyHeader currentTab="SHARE"></SurveyHeader>
      <SurveySubHeader title={"Welcome Back, Harsha!"} />
    </Layout>
  );
}
