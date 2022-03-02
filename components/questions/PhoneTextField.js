import React, { useState } from "react";

import { useRouter } from "next/router";
import PropTypes from "prop-types";
import isEmpty from "lodash.isempty";

import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import StyledButton from "../StyledButton";

import PhoneInput from "react-phone-input-2";

import { useForm } from "react-hook-form";

import "react-phone-input-2/lib/material.css";

import styled from "@emotion/styled";

const PhoneFormControl = styled(FormControl)`
  font-size: 16px !important;
  .special-label {
    display: none !important;
  }
`;

function PhoneTextField({
  title,
  value,
  required,
  placeholder = "Please enter phone number",
  id,
  totalQuestions,
  primaryButtonTitle,
  secondaryButtonTitle,
  nextRoute,
  handleEndSurvey,
  handleResponse,
}) {
  const { handleSubmit } = useForm();
  const router = useRouter();
  const [mobile, setMobile] = React.useState("");
  const [error, setError] = React.useState("");

  const handleNext = async () => {
    if (!mobile && required) {
      setError("Please enter required field");
      return;
    }
    const res = await handleResponse(mobile);
    setError("");
    if (+id === totalQuestions) {
      res && handleEndSurvey();
    } else {
      res && router.push(nextRoute);
    }
  };

  const handlePrev = () => {
    router.back();
  };

  return (
    <Grid container spacing={5} height="100%" alignItems="center">
      {/* question section */}
      <Grid item xs={12}>
        <Typography variant="h2" fontWeight={550}>
          {title}
        </Typography>
      </Grid>

      {/*Input Section  */}
      <Grid item md={2} xs={0}></Grid>
      <Grid item md={8} xs={12}>
        <PhoneFormControl>
          <PhoneInput
            placeholder={placeholder}
            name="contact"
            id="contact"
            value={mobile}
            onChange={setMobile}
          ></PhoneInput>
           {error && <Typography color="red">{error}</Typography>}
        </PhoneFormControl>
      </Grid>
      <Grid item md={2} xs={0}></Grid>

      {/* Button Section */}
      <Grid item md={3} xs={0}></Grid>
      {secondaryButtonTitle && (
        <Grid item md={3} xs={12}>
          <Button
            sx={{ width: "160px" }}
            variant="outlined"
            onClick={handlePrev}
          >
            {secondaryButtonTitle}
          </Button>
        </Grid>
      )}
      <Grid item md={secondaryButtonTitle ? 3 : 6} xs={12}>
        <StyledButton onClick={handleSubmit(handleNext)}>
          {+id === totalQuestions ? "Submit" : primaryButtonTitle}
        </StyledButton>
      </Grid>
      <Grid item md={3} xs={0}></Grid>
    </Grid>
  );
}

PhoneTextField.propTypes = {
  title: PropTypes.string,
  required: PropTypes.bool,
  placeholder: PropTypes.string,
  id: PropTypes.string,
  totalQuestions: PropTypes.number,
  primaryButtonTitle: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  secondaryButtonTitle: PropTypes.string,
  nextRoute: PropTypes.string,
};

export default PhoneTextField;
