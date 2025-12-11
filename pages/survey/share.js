"use client"

import * as React from "react";

import Image from "next/image";

import { toast } from "react-toastify";

import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import FormLabel from "@mui/material/FormLabel";
import IconButton from "@mui/material/IconButton";

import ContentCopy from "@mui/icons-material/ContentCopy";

import Layout from "../../components/Layout";
import SurveyHeader from "../../components/survey/SurveyHeader";
import SurveySubHeader from "../../components/survey/SurveySubHeader";

import twitter from "../../images/svg/twitter.svg";
import linkedin from "../../images/svg/linkedin.svg";
import facebook from "../../images/svg/facebook.svg";

import styled from "@emotion/styled";
import { useSurvey } from "../../context/SurveyState";
import { useRouter } from "next/router";

const ShareSection = styled(Container)(({ theme }) => ({
  marginTop: theme.spacing(3),
  width: "100%",
  display: "flex",
}));

const ShareTextField = styled(TextField)({
  borderRadius: "8px",
  boxShadow: "0 2px 10px 0 rgba(113, 125, 129, 0.16)",
  borderColor: "#fff!important",
});

const FormSection = styled("div")(({ theme }) => ({
  display: "flex",
  width: "80%",
  flexDirection: "column",
}));

const IconSection = styled("div")(({ theme }) => ({
  marginTop: theme.spacing(3),
  display: "flex",
  alignItems: "center",
  width: "20%",
}));

export default function Share() {
  const router = useRouter();
  const survey = useSurvey();

  React.useEffect(() => {
    if (!survey.surveyShareLink) router.push("/dashboard");
  }, []);

  const copyToClipBoard = async () => {
    try {
      await navigator.clipboard.writeText(survey.surveyShareLink);
      toast.success("Link Copied", {
        position: toast.POSITION.TOP_RIGHT,
      });
    } catch (err) {
      toast.error("Failed to copy!", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  const shareLinkedin = async () => {
    window.open(
      `https://www.linkedin.com/sharing/share-offsite?url=${survey.surveyShareLink}`,
      "_blank"
    );
  };
  const shareTwitter = async () => {
    window.open(
      `https://twitter.com/intent/tweet?url=${survey.surveyShareLink}`,
      "_blank"
    );
  };
  const shareFb = async () => {
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${survey.surveyShareLink}`,
      "_blank"
    );
  };

  return (
    <Layout>
      <SurveyHeader
        headerTitle={survey.surveyTitle}
        backRoute="/survey/create"
        currentTab="SHARE"
      >
        <SurveySubHeader title={"Welcome Back!"} />
        <ShareSection>
          <FormSection>
            <FormLabel>Share via link</FormLabel>
            <ShareTextField
              fullWidth
              disabled
              value={survey.surveyShareLink}
              InputProps={{
                endAdornment: (
                  <InputAdornment>
                    <IconButton onClick={copyToClipBoard}>
                      <ContentCopy />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </FormSection>
          <IconSection>
            <IconButton onClick={shareTwitter}>
              <Image src={twitter} alt="twitter" />
            </IconButton>
            <IconButton onClick={shareFb}>
              <Image src={facebook} alt="facebook" />
            </IconButton>
            <IconButton onClick={shareLinkedin}>
              <Image src={linkedin} alt="linkedin" />
            </IconButton>
          </IconSection>
        </ShareSection>
      </SurveyHeader>
    </Layout>
  );
}
