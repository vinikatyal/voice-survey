import * as React from "react";

import Image from "next/image";
import { useRouter } from "next/router";

import PropTypes from "prop-types";
import isEmpty from "lodash.isempty";

import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import StyledButton from "../StyledButton";

import { useForm } from "react-hook-form";

import styled from "@emotion/styled";

const ImageLayout = styled("div")`
  width: 100%;
  height: 300px;
  position: relative;
  display: flex;
  align-items: center;
  @media only screen and (max-width: 768px) {
    width: 100%;
    height: 200px;
  }
`;

const Video = styled("iframe")`
  width: 400px;
  height: 300px;
  @media only screen and (max-width: 768px) {
    width: 100%;
    height: 200px;
  }
`;

function DateField({
  title,
  value,
  required,
  placeholder = "Please enter your response",
  id,
  totalQuestions,
  primaryButtonTitle,
  secondaryButtonTitle,
  nextRoute,
  handleEndSurvey,
  handleResponse,
  image,
  video,
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
    const isLastAnswer = +id === totalQuestions ? true : false;
    const res = await handleResponse(watchInput, isLastAnswer);
    if (isLastAnswer) {
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
      <Grid
        item
        xs={12}
        direction="column"
        alignItems="center"
        justifyContent="center"
      >
        {image && (
          <ImageLayout>
            <Image src={image} layout="fill" objectFit="contain" />
          </ImageLayout>
        )}
        {video && (
          <Video
            frameborder="0"
            allow="autoplay; encrypted-media"
            src={video}
          />
        )}
      </Grid>

      {/*Input Section  */}
      <Grid item md={4} xs={0}></Grid>
      <Grid item md={4} xs={12}>
        <TextField
          error={!isEmpty(errors.input)}
          {...register(`input`, {
            required: {
              value: required,
              message: "You need to select date",
            },
            onChange: async (e) => {
              await trigger("input");
            },
          })}
          fullWidth
          placeholder={placeholder}
          type="date"
        ></TextField>
        <Grid container>
          {errors.input && (
            <Typography color="red">{errors.input.message}</Typography>
          )}
        </Grid>
      </Grid>
      <Grid item md={4} xs={0}></Grid>

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

DateField.propTypes = {
  title: PropTypes.string,
  required: PropTypes.bool,
  placeholder: PropTypes.string,
  id: PropTypes.string,
  totalQuestions: PropTypes.number,
  primaryButtonTitle: PropTypes.string,
  secondaryButtonTitle: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  nextRoute: PropTypes.string,
};

export default DateField;
