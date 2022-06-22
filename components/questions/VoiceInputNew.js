import React, { useEffect, useRef, useState } from "react";

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
import StopIcon from "@mui/icons-material/Stop";
import DeleteIcon from "@mui/icons-material/Delete";

import MicRecorder from "mic-recorder-to-mp3";

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

const Small = styled("div")`
  font-size: 10px;
`;

function VoiceInputNew({
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
  const [isBlocked, setIsBlocked] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [blob, setBlob] = useState(null);
  const [file, setFile] = useState(null);
  const [mediaFile, setMediaFile] = useState("");

  const [status, setRecordStatus] = useState("idle");

  const router = useRouter();

  const waveSurferRef = useRef();
  const containerRef = useRef();

  const [Mp3Recorder, setMp3Recorder] = useState(
    new MicRecorder({ bitRate: 128 })
  );
  let timeout;

  const startRecording = () => {
    // Start recording. Browser will request permission to use your microphone.

    // Older browsers might not implement mediaDevices at all, so we set an empty object first
    if (navigator.mediaDevices === undefined) {
      navigator.mediaDevices = {};
    }

    // Some browsers partially implement mediaDevices. We can't just assign an object
    // with getUserMedia as it would overwrite existing properties.
    // Here, we will just add the getUserMedia property if it's missing.
    if (navigator.mediaDevices.getUserMedia === undefined) {
      navigator.mediaDevices.getUserMedia = function (constraints) {
        // First get ahold of the legacy getUserMedia, if present
        var getUserMedia =
          navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

        // Some browsers just don't implement it - return a rejected promise with an error
        // to keep a consistent interface
        if (!getUserMedia) {
          console.log("Permission Denied");
          setIsBlocked(true);
          return Promise.reject(
            new Error("getUserMedia is not implemented in this browser")
          );
        }

        // Otherwise, wrap the call to the old navigator.getUserMedia with a Promise
        return new Promise(function (resolve, reject) {
          getUserMedia.call(navigator, constraints, resolve, reject);
        });
      };
    }
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then(function (stream) {
        console.log("Permission Granted");
        setIsBlocked(false);
      })
      .catch(function (err) {
        console.log("Permission Denied");
        setIsBlocked(true);
      });

    if (isBlocked) {
      console.log("Permission Denied");
    } else {
      Mp3Recorder.start()
        .then(() => {
          setRecordStatus("recording");
          // something else
        })
        .catch((e) => {
          console.error(e);
        });
    }
  };

  const stopRecording = () => {
    // Once you are done singing your best song, stop and get the mp3.
    Mp3Recorder.stop()
      .getMp3()
      .then(([buffer, blob]) => {
        setBlob(blob);

        const uniqueId =
          Date.now().toString(36) + Math.random().toString(36).substring(2);

        const file = new File(buffer, `${uniqueId}.mp3`, {
          type: blob.type,
          lastModified: Date.now(),
        });

        setFile(file);

        const blobURL = URL.createObjectURL(file);
        setMediaFile(blobURL);
        setRecordStatus("stopped");
      })
      .catch((e) => {
        alert("We could not retrieve your message");
        console.log(e);
      });
  };

  const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

  useEffect(() => {
    if (status === "recording") {
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
      timeout = setTimeout(() => {
        microphone.stop();
        stopRecording();
        waveSurferRef.current.destroy();
      }, 60000);
      microphone.start();
    }
    if (status === "stopped") {
      const microphone = waveSurferRef.current.microphone;
      microphone.stop();
      waveSurferRef.current.destroy();
      clearTimeout(timeout);
    }

    return () => {
      if (status === "recording") {
        const microphone = waveSurferRef.current.microphone;
        microphone.stop();
        waveSurferRef.current.destroy();
        clearTimeout(timeout);
      }
    };
  }, [status]);

  const handleNext = async () => {
    if (required && !mediaFile) {
      setError(true);
      setErrorMessage("Please record the message");
      return;
    }

    if (get(blob, "size") === 0) {
      setError(true);
      setErrorMessage("Please record the message");
      return;
    }

    if (["recording", "paused"].includes(status)) {
      setError(true);
      setErrorMessage("Please stop the recording");
      return;
    }

    if (mediaFile && file) {
      console.log(mediaFile);
      console.log(blob);
      console.log(file);

      const audiofile = file;
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

  const handlePrev = () => {
    router.back();
  };

  const removeAudio = () => {
    setError(false);
    setRecordStatus("idle");
    setMediaFile("");
    setFile(null);
    setBlob(null);
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
        {mediaFile && <Waveform audio={mediaFile} />}
        {["recording", "paused"].includes(status) && (
          <Grid container>
            <Grid item xs={12} ref={containerRef}></Grid>
          </Grid>
        )}

        {mediaFile && (
          <div>
            <FabAudio aria-label="add" sx={{ mt: 2 }} onClick={removeAudio}>
              <DeleteIcon />
            </FabAudio>
          </div>
        )}

        {["idle", "stopped"].includes(status) && !mediaFile && (
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
        {["recording", "paused"].includes(status) && (
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

VoiceInputNew.propTypes = {
  title: PropTypes.string,
  required: PropTypes.bool,
  id: PropTypes.string,
  totalQuestions: PropTypes.number,
  primaryButtonTitle: PropTypes.string,
  secondaryButtonTitle: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  nextRoute: PropTypes.string,
};

export default VoiceInputNew;
