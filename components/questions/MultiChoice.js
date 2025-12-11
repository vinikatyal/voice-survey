import React, { useState } from "react";

import Image from "next/image";
import { useRouter } from "next/router";
import PropTypes from "prop-types";
import get from "lodash.get";

import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import RadioGroup from "@mui/material/RadioGroup";
import Radio from "@mui/material/Radio";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import StyledButton from "@/components/StyledButton";

import { useForm } from "react-hook-form";

import styled from "@emotion/styled";

const RadioGroupCustom = styled(RadioGroup)``;

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

function MultiChoice({
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
  image,
  video,
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const router = useRouter();
  const [multiChoiceAnswer, setMultiChoiceAnswer] = useState("");
  const [error, setError] = useState("");

  const handleNext = async () => {
    if (!multiChoiceAnswer && required) {
      setError("Please enter required field");
      return;
    }
    const isLastAnswer = +id === totalQuestions ? true : false;
    const res = await handleResponse(multiChoiceAnswer, isLastAnswer);
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
    setMultiChoiceAnswer(event.target.value);
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
            <Image src={image} layout="fill" objectFit="contain" alt="multi" />
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
      <Grid item md={12} xs={12}>
        <FormControl>
          <RadioGroupCustom onChange={handleRadioChange}>
            {get(question, "multiChoiceOptions", []).map((option, index) => (
              <FormControlLabel
                value={option.option}
                key={index}
                control={<Radio />}
                label={option.option}
              />
            ))}
          </RadioGroupCustom>
        </FormControl>
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

MultiChoice.propTypes = {
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

export default MultiChoice;
