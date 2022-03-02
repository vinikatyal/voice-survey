import * as React from "react";

import { useRouter } from "next/router";
import PropTypes from "prop-types";

import Grid from "@mui/material/Grid";
import StyledButton from "../StyledButton";

import { useForm } from "react-hook-form";


function WelcomeText({
  title,
  value,
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
    trigger,
    setValue,
    watch,
    formState: { errors },
  } = useForm();
  const router = useRouter();

  const watchInput = watch("input", "");
  React.useEffect(() => {
    setValue("input", value, {
      shouldDirty: true,
    });
  }, []);

  const handleNext = () => {
    handleResponse(watchInput);
    if (+id > totalQuestions) {
      handleEndSurvey();
    } else {
      router.push(nextRoute);
    }
  };

  return (
    <Grid container height="200px" alignItems="center">
      {/* Button Section */}
      <Grid item md={3} xs={0}></Grid>
      <Grid item md={secondaryButtonTitle ? 3 : 6} xs={12}>
        <StyledButton onClick={handleSubmit(handleNext)}>
          {primaryButtonTitle}
        </StyledButton>
      </Grid>
      <Grid item md={3} xs={0}></Grid>
    </Grid>
  );
}

WelcomeText.propTypes = {
  id: PropTypes.string,
  totalQuestions: PropTypes.number,
  primaryButtonTitle: PropTypes.string,
  secondaryButtonTitle: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  nextRoute: PropTypes.string,
};

export default WelcomeText;
