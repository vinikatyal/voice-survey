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

function EmailTextField({
  title,
  required,
  placeholder = "Please enter email",
  id,
  totalQuestions,
  primaryButtonTitle,
  secondaryButtonTitle,
  nextRoute,
}) {
  const {
    register,
    handleSubmit,
    trigger,
    setValue,
    formState: { errors },
  } = useForm();
  const router = useRouter();

  const handleNext = () => {
    router.push(nextRoute);
  };

  const handlePrev = () => {
    router.back();
  };

  return (
    <Grid container spacing={5} height="100%" alignItems="center">
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
            pattern: {
              value:
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
              message: "Please enter a valid email",
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
        <StyledButton
          disabled={+id === totalQuestions}
          onClick={handleSubmit(handleNext)}
        >
          {primaryButtonTitle}
        </StyledButton>
      </Grid>
      <Grid item md={3} xs={0}></Grid>
    </Grid>
  );
}

EmailTextField.propTypes = {
  title: PropTypes.string,
  required: PropTypes.bool,
  placeholder: PropTypes.string,
  id: PropTypes.string,
  totalQuestions: PropTypes.number,
  primaryButtonTitle: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  secondaryButtonTitle: PropTypes.string,
  nextRoute: PropTypes.string,
};

export default EmailTextField;
