import React from "react";

import Link from "next/link";

import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";

import styled from "@emotion/styled";

import { useSurvey } from "../../context/SurveyState";

const Nav = styled("div")(({}) => ({
  display: "flex",
  justifyContent: "flex-start",
  alignItems: "center",
}));

const NavItem = styled("div")(({ active }) => ({
  color: active ? "#0a23fb" : "#707070",
  fontWeight: 500,
  cursor: "pointer",
  "&:hover": {
    color: "#0a23fb",
  },
}));

export default function BreadCrumbs({ breadCrumbsList }) {
  const survey = useSurvey();
  return (
    <Nav>
      <Link href="/dashboard">
        <NavItem active={false}>Home</NavItem>
      </Link>
      <KeyboardDoubleArrowRightIcon sx={{ margin: "0 5px" }} />
      <Link href="/survey/report" passHref>
        <NavItem active={breadCrumbsList.length === 0}>
          {survey.surveyTitle || "Survey Name"}
        </NavItem>
      </Link>
      {breadCrumbsList.map((breadCrumb, index) => (
        <Nav key={index}>
          <KeyboardDoubleArrowRightIcon sx={{ margin: "0 5px" }} />
          <Link href={breadCrumb.route} passHref>
            <NavItem active={breadCrumb.active}>{breadCrumb.title}</NavItem>
          </Link>
        </Nav>
      ))}
    </Nav>
  );
}
