import * as React from "react";

import { useRouter } from "next/router";
import PropTypes from "prop-types";
import isEmpty from "lodash.isempty";

import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import StyledButton from "../StyledButton";

import { useForm } from "react-hook-form";

function SingleLineTextField({
  title,
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

  const handleNext = async () => {
    const res = await handleResponse(watchInput);
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
    <Grid container spacing={5} height="90%" alignItems="center">
      {/* question section */}
      <Grid item xs={12}>
        <Typography color="#00063e" fontSize="28px" fontWeight="500">
          {title}
        </Typography>
      </Grid>

      {/*Input Section  */}
      <Grid item md={2} xs={0}></Grid>
      <Grid item md={8} xs={12}>
        <TextField
          error={!isEmpty(errors.input)}
          {...register(`input`, {
            required: {
              value: required,
              message: "You need to fill in the input",
            },
            onChange: async (e) => {
              await trigger("input");
            },
          })}
          fullWidth
          placeholder={placeholder}
        ></TextField>
        <Grid container>
          {errors.input && (
            <Typography color="red">{errors.input.message}</Typography>
          )}
        </Grid>
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
          {primaryButtonTitle}
        </StyledButton>
      </Grid>
      <Grid item md={3} xs={0}></Grid>
    </Grid>
  );
}

SingleLineTextField.propTypes = {
  title: PropTypes.string,
  required: PropTypes.bool,
  placeholder: PropTypes.string,
  id: PropTypes.string,
  totalQuestions: PropTypes.number,
  primaryButtonTitle: PropTypes.string,
  secondaryButtonTitle: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  nextRoute: PropTypes.string,
};

export default SingleLineTextField;
