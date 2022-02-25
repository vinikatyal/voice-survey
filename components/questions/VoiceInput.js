import React, { useState } from "react";

import { useRouter } from "next/router";
import PropTypes from "prop-types";

import { useReactMediaRecorder } from "react-media-recorder";

import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import StyledButton from "../StyledButton";
import Fab from "@mui/material/Fab";

// Icons
import MicIcon from "@mui/icons-material/Mic";
import StopIcon from "@mui/icons-material/Stop";
import DeleteIcon from "@mui/icons-material/Delete";

import Waveform from "./Waveform";

import styled from "@emotion/styled";

const FabAudio = styled(Fab)`
  background-color: #fd0d1b;
  color: #fff;
  &:hover {
    background-color: #fd0d1b;
    color: #fff;
  }
`;

function VoiceInput({
  title,
  required,
  id,
  totalQuestions,
  primaryButtonTitle,
  secondaryButtonTitle,
  nextRoute,
  handleEndSurvey,
  handleResponse,
}) {
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const router = useRouter();
  const { status, startRecording, stopRecording, mediaBlobUrl, clearBlobUrl } =
    useReactMediaRecorder({ audio: true });

  const handleNext = async () => {
    if (required && !mediaBlobUrl) {
      setError(true);
      setErrorMessage("Please record the message");
      return;
    }

    if (["recording", "paused"].includes(status)) {
      setError(true);
      setErrorMessage("Please stop the recording");
      return;
    }

    if (mediaBlobUrl) {
      const res = await handleResponse(mediaBlobUrl);
      if (+id === totalQuestions) {
        res && handleEndSurvey();
      } else {
        res && router.push(nextRoute);
      }
    } else {
      router.push(nextRoute);
    }
  };

  const handlePrev = () => {
    router.back();
  };

  const playStop = () => {
    stopRecording();
  };

  const removeAudio = () => {
    setError(false);
    clearBlobUrl();
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
        {/* {mediaBlobUrl && <audio src={mediaBlobUrl} controls />} */}

        {mediaBlobUrl && <Waveform audio={mediaBlobUrl} />}

        {mediaBlobUrl && (
          <div>
            <FabAudio
              aria-label="add"
              sx={{ mt: 2 }}
              onClick={() => {
                removeAudio();
              }}
            >
              <DeleteIcon />
            </FabAudio>
          </div>
        )}

        {["idle", "stopped"].includes(status) && !mediaBlobUrl && (
          <>
            <FabAudio
              color="secondary"
              aria-label="add"
              sx={{ mt: 2 }}
              onClick={() => {
                startRecording();
                setError(false);
              }}
            >
              <MicIcon />
            </FabAudio>
            <div>Hit Record to Start</div>
          </>
        )}
        {["recording", "paused"].includes(status) && (
          <>
            <FabAudio aria-label="add" onClick={playStop}>
              <StopIcon />
            </FabAudio>
          </>
        )}
        {error && (
          <Typography mt={2} color="red">
            {errorMessage}
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
