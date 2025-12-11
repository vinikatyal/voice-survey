import React, { useEffect, useRef, useState } from "react";

import get from "lodash.get";
import { useRouter } from "next/router";
import PropTypes from "prop-types";

import WaveSurfer from "wavesurfer.js";
import RecordPlugin from "wavesurfer.js/dist/plugins/record.esm.js";

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

  const [status, setRecordStatus] = useState("idle"); // idle | recording | stopped

  const router = useRouter();

  const waveSurferRef = useRef(null);
  const recordPluginRef = useRef(null);
  const containerRef = useRef(null);
  const timeoutRef = useRef(null);

  const startRecording = () => {
    if (typeof navigator === "undefined") return;

    // Basic permission check (RecordPlugin will also request mic access)
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      setIsBlocked(true);
      setError(true);
      setErrorMessage("Microphone not supported in this browser.");
      return;
    }

    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then(() => {
        setIsBlocked(false);
        setError(false);
        setErrorMessage("");
        setRecordStatus("recording");
      })
      .catch(() => {
        console.log("Permission denied");
        setIsBlocked(true);
        setError(true);
        setErrorMessage("Microphone permission denied.");
      });
  };

  const stopRecording = () => {
    if (recordPluginRef.current && recordPluginRef.current.isRecording()) {
      recordPluginRef.current.stopRecording();
    }
  };

  // Setup WaveSurfer + RecordPlugin when status changes
  useEffect(() => {
    if (typeof window === "undefined") return;

    if (status === "recording") {
      // 1. Create WaveSurfer instance for live waveform
      waveSurferRef.current = WaveSurfer.create({
        container: containerRef.current,
        responsive: true,
        height: 80,
        waveColor: "#fd0d1b",
        progressColor: "#fd0d1b",
        cursorWidth: 0,
        barWidth: 2,
        barGap: 2,
      });

      // 2. Register Record plugin
      recordPluginRef.current = waveSurferRef.current.registerPlugin(
        RecordPlugin.create({
          // optional configs:
          // scrollingWaveform: true,
          // continuousWaveform: true,
        })
      );

      const record = recordPluginRef.current;

      // 3. Handle record events
      const unsubEnd = record.on("record-end", (blob) => {
        // We get the recorded audio as a Blob
        setBlob(blob);

        const uniqueId =
          Date.now().toString(36) + Math.random().toString(36).substring(2);

        const file = new File([blob], `${uniqueId}.webm`, {
          type: blob.type || "audio/webm",
          lastModified: Date.now(),
        });

        setFile(file);
        const blobURL = URL.createObjectURL(file);
        setMediaFile(blobURL);
        setRecordStatus("stopped");
      });

      const unsubError = record.on("record-start", () => {
        // You can add some UI change here if needed
      });

      // 4. Actually start recording
      record
        .startRecording()
        .then(() => {
          // auto-stop after 60s
          timeoutRef.current = setTimeout(() => {
            stopRecording();
          }, 60000);
        })
        .catch((err) => {
          console.error("RecordPlugin start error:", err);
          setError(true);
          setErrorMessage("Unable to start recording.");
          setRecordStatus("idle");
        });

      // Cleanup function for this effect
      return () => {
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
          timeoutRef.current = null;
        }
        try {
          unsubEnd && unsubEnd();
          unsubError && unsubError();
        } catch (_) {}

        if (recordPluginRef.current) {
          try {
            recordPluginRef.current.stopRecording();
            recordPluginRef.current.destroy();
          } catch (_) {}
          recordPluginRef.current = null;
        }
        if (waveSurferRef.current) {
          try {
            waveSurferRef.current.destroy();
          } catch (_) {}
          waveSurferRef.current = null;
        }
      };
    }

    if (status === "stopped") {
      // stop + cleanup happens via record-end handler / cleanup above
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    }
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

    if (["recording"].includes(status)) {
      setError(true);
      setErrorMessage("Please stop the recording");
      return;
    }

    if (mediaFile && file) {
      const audiofile = file;
      const isLastAnswer = +id === totalQuestions;
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

        {status === "recording" && (
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
