import * as React from "react";

import Image from "next/image";

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
  return (
    <Layout>
      <SurveyHeader currentTab="SHARE"></SurveyHeader>
      <SurveySubHeader title={"Welcome Back, Harsha!"} />
      <ShareSection>
        <FormSection>
          <FormLabel>Share via link</FormLabel>
          <ShareTextField
            fullWidth
            disabled
            value="https://app.lorem/ipsum.consectetur/adipiscing"
            InputProps={{
              endAdornment: (
                <InputAdornment>
                  <IconButton>
                    <ContentCopy />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </FormSection>
        <IconSection>
          <IconButton>
            <Image src={twitter} alt="twitter" />
          </IconButton>
          <IconButton>
            <Image src={facebook} alt="facebook" />
          </IconButton>
          <IconButton>
            <Image src={linkedin} alt="linkedin" />
          </IconButton>
        </IconSection>
      </ShareSection>
    </Layout>
  );
}
