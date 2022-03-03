import React, { useEffect, useRef, useState } from "react";

// import uuid from "uuid";

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
import StopIcon from "@mui/icons-material/Stop";
import DeleteIcon from "@mui/icons-material/Delete";

import Waveform from "./Waveform";

import styled from "@emotion/styled";

import Recorder from "recorder-js";

const FabAudio = styled(Fab)`
  background-color: #fd0d1b;
  color: #fff;
  &:hover {
    background-color: #fd0d1b;
    color: #fff;
  }
`;

let recorder;

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

  const waveSurferRef = useRef();
  const containerRef = useRef();

  const [stop, setStop] = useState(false);
  const [blob, setBlob] = useState(null);
  const [mediaBlobUrl, setMediaBlobUrl] = useState("");
  const [analyserData, setAnalyserData] = useState({ data: [], lineTo: 0 });
  const [isRecording, setIsRecording] = useState(false);
  const [stream, setStream] = useState(null);

  const getMedia = async () => {
    try {
      return await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: false,
      });
    } catch (err) {
      console.log("Error:", err);
    }
  };

  useEffect(() => {
    const audioContext = new (window.AudioContext ||
      window.webkitAudioContext)();
    recorder = new Recorder(audioContext, {
      onAnalysed: (data) => setAnalyserData(data),
    });

    getMedia()
      .then((stream) => {
        setStream(stream);
        recorder.init(stream);
      })
      .catch(() => console.log("No stream"));

    if (isRecording) {
      waveSurferRef.current = WaveSurfer.create({
        container: containerRef.current,
        responsive: true,
        barWidth: 2,
        height: 80,
        barHeight: 3,
        barMinHeight: 1,
        barRadius: 3,
        barWidth: 3,
        barGap: 5,
        cursorWidth: 0,
        waveColor: "red",
        plugins: [MicrophonePlugin.create()],
      });

      const microphone = waveSurferRef.current.microphone;
      microphone.start();
    }
    if (stop) {
      const microphone = waveSurferRef.current.microphone;
      microphone.stop();
      waveSurferRef.current.destroy();
    }

    return () => {
      if (isRecording) {
        const microphone = waveSurferRef.current.microphone;
        microphone.stop();
        waveSurferRef.current.destroy();
      }

      if (audioContext) {
        audioContext.close();
      }
    };
  }, []);

  const download = () => {
    Recorder.download(blob, "react-audio");
  };

  const handleNext = async () => {
    if (required && !mediaBlobUrl) {
      setError(true);
      setErrorMessage("Please record the message");
      return;
    }

    if (isRecording) {
      setError(true);
      setErrorMessage("Please stop the recording");
      return;
    }

    if (mediaBlobUrl) {
      const uniqueId =
        Date.now().toString(36) + Math.random().toString(36).substring(2);
      const audiofile = new File([blob], `${uniqueId}.wav`);
      console.log(audiofile);
      const res = await handleResponse(audiofile);

      setIsRecording(false);
      setBlob(null);
      setMediaBlobUrl("");
      setStop(false);
      if (+id === totalQuestions) {
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

  const handlePrev = () => {
    router.back();
  };

  const removeAudio = () => {
    setError(false);
    setIsRecording(false);
    setBlob(null);
    setMediaBlobUrl("");
    setStop(false);
  };

  const startRecording = () => {
    recorder.start().then(() => {
      setIsRecording(true);
      setStop(false)
    });
  };

  const stopRecording = () => {
    recorder.stop().then(({ blob }) => {
      let url = (window.URL || window.webkitURL).createObjectURL(blob);
      setIsRecording(false);
      setBlob(blob);
      setMediaBlobUrl(url);
      setStop(true);
    });
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
        {mediaBlobUrl && <Waveform audio={mediaBlobUrl} />}
        {isRecording && (
          <Grid container>
            <Grid item xs={12} ref={containerRef}></Grid>
          </Grid>
        )}

        {mediaBlobUrl && (
          <div>
            <FabAudio aria-label="add" sx={{ mt: 2 }} onClick={removeAudio}>
              <DeleteIcon />
            </FabAudio>
          </div>
        )}

        {!isRecording && !mediaBlobUrl && (
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
          </>
        )}
        {isRecording && (
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

        {mediaBlobUrl && !isRecording && (
          <>
            <FabAudio
              color="secondary"
              aria-label="add"
              sx={{ mt: 2 }}
              onClick={() => {
                download();
              }}
            >
              Download
            </FabAudio>
          </>
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
