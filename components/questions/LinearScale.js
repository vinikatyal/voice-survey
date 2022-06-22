import React, { useState } from "react";

import { useRouter } from "next/router";
import PropTypes from "prop-types";
import get from "lodash.get";

import FormControlLabel from "@mui/material/FormControlLabel";
import RadioGroup from "@mui/material/RadioGroup";
import Radio from "@mui/material/Radio";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import StyledButton from "@/components/StyledButton";

import { useForm } from "react-hook-form";

import styled from "@emotion/styled";

const RadioGroupCustom = styled(RadioGroup)`
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: center;
`;

function LinearScale({
  title,
  question,
  value,
  required,
  placeholder = "Please enter your response",
  id,
  totalQuestions,
  primaryButtonTitle,
  secondaryButtonTitle,
  nextRoute,
  handleResponse,
  handleEndSurvey,
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const router = useRouter();
  const [scale, setScale] = useState(0);
  const [error, setError] = React.useState("");

  const handleNext = async () => {
    if (!scale && required) {
      setError("Please enter required field");
      return;
    }
    const isLastAnswer = +id === totalQuestions ? true : false;
    const res = await handleResponse(scale, isLastAnswer);
    if (isLastAnswer) {
      res && handleEndSurvey();
    } else {
      res && router.push(nextRoute);
    }
  };
  const handlePrev = () => {
    router.back();
  };

  const handleRadioChange = (event) => {
    setScale(event.target.value);
  };

  const range = (start, end) => {
    return Array(end - start + 1)
      .fill()
      .map((_, idx) => start + idx);
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
      <Grid item md={12} xs={12}>
        <RadioGroupCustom
          row
          alignItems="center"
          justifyContent="center"
          onChange={handleRadioChange}
        >
          {get(question, "start_label", "")}
          {range(
            get(question, "start_count", 1),
            get(question, "end_count", 5)
          ).map((index) => (
            <FormControlLabel
              value={index}
              control={<Radio />}
              label={index}
              labelPlacement="bottom"
            />
          ))}
          {get(question, "end_label", "")}
        </RadioGroupCustom>
      </Grid>

      <Grid container justifyContent="center">
        {error && <Typography color="red">{error}</Typography>}
      </Grid>

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

LinearScale.propTypes = {
  title: PropTypes.string,
  question: PropTypes.object,
  required: PropTypes.bool,
  placeholder: PropTypes.string,
  id: PropTypes.string,
  totalQuestions: PropTypes.number,
  primaryButtonTitle: PropTypes.string,
  secondaryButtonTitle: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  nextRoute: PropTypes.string,
};

export default LinearScale;
