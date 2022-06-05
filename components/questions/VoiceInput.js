import React, { useRef, useState } from "react";

import get from "lodash.get";
import { useRouter } from "next/router";
import PropTypes from "prop-types";

import WaveSurfer from "wavesurfer.js";
import MicrophonePlugin from "wavesurfer.js/dist/plugin/wavesurfer.microphone";

import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import StyledButton from "../StyledButton";
import Fab from "@mui/material/Fab";

// Icons
import MicIcon from "@mui/icons-material/Mic";
import PlayArrow from "@mui/icons-material/PlayArrow";
import Pause from "@mui/icons-material/Pause";
import StopIcon from "@mui/icons-material/Stop";
import DeleteIcon from "@mui/icons-material/Delete";

import styled from "@emotion/styled";

const FabAudio = styled(Fab)`
  background-color: #fd0d1b;
  color: #fff;
  &:hover {
    background-color: #fd0d1b;
    color: #fff;
  }
`;

const Small = styled("div")`
  font-size: 10px;
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
  const [blob, setBlob] = useState(null);
  const [status, setStatus] = useState("idle");
  const [playPause, setPlayPause] = useState(false);

  const router = useRouter();

  const waveSurferRef = useRef();
  const containerRef = useRef();

  let mediaRecorder;
  let audioChunks = [];

  let timeout;

  const handleNext = async () => {
    if (required && get(blob, "size") === 0) {
      setError(true);
      setErrorMessage("Please record the message");
      return;
    }
    if (["recording", "paused"].includes(status)) {
      setError(true);
      setErrorMessage("Please stop the recording");
      return;
    }
    if (get(blob, "size")) {
      const uniqueId =
        Date.now().toString(36) + Math.random().toString(36).substring(2);
      const audiofile = new File([blob], `${uniqueId}.webm`, {
        type: "audio/webm",
      });
      const isLastAnswer = +id === totalQuestions ? true : false;
      const res = await handleResponse(audiofile, isLastAnswer);
      if (isLastAnswer) {
        res && handleEndSurvey();
      } else {
        res && router.push(nextRoute);
      }
    } else {
      if (+id === totalQuestions) {
        handleEndSurvey();
      } else {
        router.push(nextRoute);
      }
    }
  };

  const loadWs = () => {
    waveSurferRef.current = new WaveSurfer.create({
      container: containerRef.current,
      responsive: 1000,
      barWidth: 3,
      height: 100,
      barGap: 2,
      cursorWidth: 1,
      cursorColor: "white",
      waveColor: "red",
      normalize: true,
      plugins: [MicrophonePlugin.create()],
    });
    waveSurferRef.current.microphone.on("deviceReady", function (stream) {
      console.log("Device ready!", stream);
      mediaRecorder = new MediaRecorder(stream);
      mediaRecorder.ondataavailable = function (e) {
        audioChunks.push(e.data);
        waveSurferRef.current.loadBlob(new Blob(audioChunks));
      };
      mediaRecorder.onstop = () => {
        waveSurferRef.current.loadBlob(new Blob(audioChunks));
        setBlob(new Blob(audioChunks));
      };

      mediaRecorder.start(250);
    });

    waveSurferRef.current.microphone.on("deviceError", function (code) {
      console.warn("Device error: " + code);
    });
  };

  const startRecording = () => {
    setStatus("recording");
    audioChunks = [];
    waveSurferRef.current && waveSurferRef.current.destroy();
    loadWs();
    waveSurferRef.current.microphone.start();
    waveSurferRef.current.microphone.play();
    setTimeout(() => {
      stopRecording();
    }, 60000);
  };

  const stopRecording = () => {
    setStatus("stopped");
    if (!waveSurferRef.current) {
      return;
    }
    waveSurferRef.current.microphone.stop();
    mediaRecorder && mediaRecorder.state !== "inactive" && mediaRecorder.stop();
  };

  const playRecording = () => {
    if (!waveSurferRef.current) {
      return;
    }
    setPlayPause(!waveSurferRef.current.isPlaying());
    waveSurferRef.current.playPause();
    waveSurferRef.current.setVolume(1);
  };

  const handlePrev = () => {
    router.back();
  };

  const removeAudio = () => {
    setStatus("idle");
    waveSurferRef.current.destroy();
    waveSurferRef.current = null;
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
        {
          <Grid container>
            <Grid item xs={12} ref={containerRef}></Grid>
          </Grid>
        }

        {status === "stopped" && (
          <div>
            <FabAudio
              color="secondary"
              aria-label="add"
              sx={{ mt: 2 }}
              onClick={() => {
                playRecording();
              }}
            >
              {playPause ? <Pause /> : <PlayArrow />}
            </FabAudio>
            <FabAudio
              aria-label="add"
              sx={{ mt: 2, ml: 1 }}
              onClick={removeAudio}
            >
              <DeleteIcon />
            </FabAudio>
          </div>
        )}

        {["idle", "stopped"].includes(status) && !waveSurferRef.current && (
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
            <Typography mt={2}>Hit Record to Start</Typography>
            <Small>Speak close to the microphone for better response.</Small>
          </>
        )}
        {status === "recording" && (
          <>
            <FabAudio aria-label="add" onClick={stopRecording}>
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
        <StyledButton onClick={handleNext}>
          {+id === totalQuestions ? "Submit" : primaryButtonTitle}
        </StyledButton>
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
