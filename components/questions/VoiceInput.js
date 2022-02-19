import * as React from "react";

import { useRouter } from "next/router";
import PropTypes from "prop-types";
import { useState } from "react";

import { useReactMediaRecorder } from "react-media-recorder";

import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import StyledButton from "../StyledButton";
import Fab from "@mui/material/Fab";

// Icons
import MicIcon from "@mui/icons-material/Mic";
import PauseIcon from "@mui/icons-material/Pause";
import StopIcon from "@mui/icons-material/Stop";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";

function VoiceInput({
  title,
  required,
  id,
  totalQuestions,
  primaryButtonTitle,
  secondaryButtonTitle,
  nextRoute,
  handleEndSurvey,
}) {
  const [error, setError] = useState(false);
  const router = useRouter();
  const {
    status,
    startRecording,
    stopRecording,
    mediaBlobUrl,
    pauseRecording,
    resumeRecording,
  } = useReactMediaRecorder({ audio: true });

  const handleNext = () => {
    if (required && !mediaBlobUrl) {
      setError(true);
      return;
    }
    if (+id === totalQuestions) {
      handleEndSurvey();
    } else {
      router.push(nextRoute);
    }
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
        {mediaBlobUrl && <audio src={mediaBlobUrl} controls />}
        <p></p>
        {["idle", "stopped"].includes(status) && (
          <Fab
            color="primary"
            aria-label="add"
            onClick={() => {
              startRecording();
              setError(false);
            }}
          >
            <MicIcon />
          </Fab>
        )}
        {["recording", "paused"].includes(status) && (
          <>
            <Fab
              color="primary"
              aria-label="add"
              sx={{ marginRight: "15px" }}
              onClick={
                status === "recording" ? pauseRecording : resumeRecording
              }
            >
              {status === "recording" ? <PauseIcon /> : <PlayArrowIcon />}
            </Fab>
            <Fab color="primary" aria-label="add" onClick={stopRecording}>
              <StopIcon />
            </Fab>
          </>
        )}
        {error && (
          <Typography mt={2} color="red">
            Please record the message
          </Typography>
        )}
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
        <StyledButton onClick={handleNext}>{primaryButtonTitle}</StyledButton>
      </Grid>
      <Grid item md={3} xs={0}></Grid>
    </Grid>
  );
}

VoiceInput.propTypes = {
  title: PropTypes.string,
  required: PropTypes.bool,
  id: PropTypes.string,
  totalQuestions: PropTypes.number,
  primaryButtonTitle: PropTypes.string,
  secondaryButtonTitle: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  nextRoute: PropTypes.string,
};

export default VoiceInput;
